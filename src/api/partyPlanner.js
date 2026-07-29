import { pokedex } from "./pokeapiClient";
import { getEncounters } from "./pokeapiClient";
import { getEvolutionInfo, describeEvolution } from "./evolutionChain";
import { getRegion } from "../data/regionConfig";
import { getDisplayIdMap } from "./pokedexNumbers";
import { normalizeLocationSlug } from "./locationUtils";
import kantoStageMap, { STAGES_KANTO } from "../data/stageMaps/kanto";
import kantoOverrides from "../data/acquisitionOverrides/kanto";
import johtoStageMap, { STAGES_JOHTO } from "../data/stageMaps/johto";
import johtoOverrides from "../data/acquisitionOverrides/johto";

const CATEGORY_ORDER = {
  starter: 0, wild: 1, gift: 1, fossil: 1, "trade-only": 1,
  evolve: 2, stone: 2, trade: 2, legendary: 3,
};

/**
 * Helper to strip form suffixes (e.g., landorus-incarnate -> landorus)
 * for PokéAPI species and evolution endpoints.
 */
function getBaseSpeciesName(name) {
  const formSuffixes = ['incarnate', 'therian', 'altered', 'origin', 'galar', 'alola', 'hisui', 'paldea'];
  const parts = name.toLowerCase().split('-');
  if (parts.length > 1 && formSuffixes.includes(parts[parts.length - 1])) {
    return parts.slice(0, -1).join('-');
  }
  return name;
}

/**
 * Look up an override entry for a species, applying any game-specific
 * override. Routes FireRed/LeafGreen to Kanto and HeartGold/SoulSilver to Johto.
 */
function lookupOverride(speciesName, game, region) {
  let overrides = region.overrides;
  if (game.id === "firered" || game.id === "leafgreen") {
    overrides = kantoOverrides;
  } else if (game.id === "heartgold" || game.id === "soulsilver") {
    overrides = johtoOverrides;
  }

  const base = overrides[speciesName];
  if (!base) return null;
  const versionOverride = base.versions?.[game.id] || base.versions?.[game.versionGroup?.replace(/-/g, "")];
  return versionOverride ? { ...base, ...versionOverride } : base;
}

/**
 * For a root-form species with no override: find its best (highest-chance)
 * wild encounter in this game's version, and map that location to a stage.
 */
async function resolveWildEncounter(speciesName, game, region) {
  const raw = await getEncounters(speciesName);
  const matches = [];

  // Normalize game version for robust matching against PokéAPI version names (e.g., "black2" vs "black-2")
  const targetVersion = game.version?.toLowerCase() || '';
  const normalizedTarget = targetVersion.replace(/-/g, '');

  raw.forEach((loc) => {
    const vd = loc.version_details.find((v) => {
      const apiVersion = v.version.name.toLowerCase();
      return (
        apiVersion === targetVersion ||
        apiVersion.replace(/-/g, '') === normalizedTarget ||
        apiVersion === game.versionGroup?.toLowerCase()
      );
    });

    if (vd && vd.encounter_details?.length) {
      const minLevel = Math.min(...vd.encounter_details.map((e) => e.min_level));
      const maxLevel = Math.max(...vd.encounter_details.map((e) => e.max_level));
      const methods = [...new Set(vd.encounter_details.map((e) => e.method.name))];
      matches.push({
        locationArea: loc.location_area.name,
        minLevel,
        maxLevel,
        methods,
        chance: vd.max_chance,
      });
    }
  });

  if (matches.length === 0) return null;

  matches.sort((a, b) => b.chance - a.chance);
  const best = matches[0];
  const normalizedSlug = normalizeLocationSlug(best.locationArea);
  
  // Use appropriate stage map based on game version
  let stageMap = region.locationStageMap;
  if (game.id === "firered" || game.id === "leafgreen") {
    stageMap = kantoStageMap;
  } else if (game.id === "heartgold" || game.id === "soulsilver") {
    stageMap = johtoStageMap;
  }
  const stage = stageMap[normalizedSlug] ?? null;

  return {
    category: "wild",
    detail:
      stage === null
        ? `Found in the wild (location "${best.locationArea}" [normalized to "${normalizedSlug}"] isn't mapped to a stage yet — check the stage map).`
        : `Found around ${humanizeLocation(best.locationArea)}, level ${best.minLevel}${best.maxLevel !== best.minLevel ? `-${best.maxLevel}` : ""}.`,
    stage,
    allEncounters: matches,
  };
}

function humanizeLocation(slug) {
  return slug
    .replace(/-area$/, "")
    .split("-")
    .map((w) => (/^\d/.test(w) ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1)))
    .join(" ");
}

/**
 * Fully resolve a single species: base data + how it's obtained + stage.
 */
async function resolveSpecies(speciesName, game, region) {
  const baseSpeciesName = getBaseSpeciesName(speciesName);

  const [pokemonData, speciesData, evoInfo] = await Promise.all([
    pokedex.getPokemonByName(speciesName),
    pokedex.getPokemonSpeciesByName(baseSpeciesName),
    getEvolutionInfo(baseSpeciesName, region.generation),
  ]);

  const displayIdMap = await getDisplayIdMap(region.pokedexSlug);

  const base = {
    nationalId: pokemonData.id,
    displayId: displayIdMap[speciesName] ?? displayIdMap[baseSpeciesName] ?? null,
    name: speciesName,
    types: pokemonData.types.map((t) => t.type.name),
    sprite:
      pokemonData.sprites.other?.["official-artwork"]?.front_default ||
      pokemonData.sprites.front_default,
    evolvesFrom: evoInfo.lineage[evoInfo.lineage.length - 1] || null,
  };

  if (!evoInfo.isRoot) {
    return { ...base, category: evoInfo.category, detail: evoInfo.detail, stage: null };
  }

  const override = lookupOverride(speciesName, game, region) || lookupOverride(baseSpeciesName, game, region);
  if (override) {
    return { ...base, category: override.category, detail: override.detail, stage: override.stage };
  }

  const wild = await resolveWildEncounter(speciesName, game, region);
  if (wild) {
    return { ...base, ...wild };
  }

  return {
    ...base,
    category: speciesData.is_legendary || speciesData.is_mythical ? "legendary" : "wild",
    detail: `No wild encounter data found for ${game.label}. This likely needs an entry in the acquisition overrides file.`,
    stage: null,
  };
}

/**
 * Resolve a team member AND its full lineage back to the root.
 */
export async function resolveTeamMember(speciesName, game, region) {
  const baseSpeciesName = getBaseSpeciesName(speciesName);
  const evoInfo = await getEvolutionInfo(baseSpeciesName, region.generation);
  const chainNames = [...evoInfo.lineage, speciesName];

  const resolved = await Promise.all(chainNames.map((name) => resolveSpecies(name, game, region)));

  const root = resolved[0];
  const rootStage = root.stage;

  const withInheritedStage = resolved.map((mon) => ({ ...mon, stage: rootStage }));
  const target = withInheritedStage[withInheritedStage.length - 1];
  const lineage = withInheritedStage.slice(0, -1);

  return { ...target, lineage };
}

/**
 * Top-level entry point: given a list of species names and a game
 * selection, returns the full team report sorted chronologically by stage.
 */
export async function buildTeamReport(speciesNames, regionId, gameId) {
  const region = getRegion(regionId);
  const game = region.games.find((g) => g.id === gameId);
  if (!game) throw new Error(`Unknown game "${gameId}" in region "${regionId}"`);

  const team = await Promise.all(
    speciesNames.map((name) => resolveTeamMember(name, { ...game, regionId }, region))
  );

  team.sort((a, b) => {
    const stageA = a.stage ?? 99;
    const stageB = b.stage ?? 99;
    if (stageA !== stageB) return stageA - stageB;
    const catA = CATEGORY_ORDER[a.category] ?? 9;
    const catB = CATEGORY_ORDER[b.category] ?? 9;
    if (catA !== catB) return catA - catB;
    return a.nationalId - b.nationalId;
  });

  let stages = region.stages;
  if (game.id === "firered" || game.id === "leafgreen") {
    stages = STAGES_KANTO;
  } else if (game.id === "heartgold" || game.id === "soulsilver") {
    stages = STAGES_JOHTO;
  }

  return { game, stages, team };
}