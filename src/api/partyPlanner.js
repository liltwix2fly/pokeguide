import { pokedex } from "./pokeapiClient";
import { getEncounters } from "./pokeapiClient";
import { getEvolutionInfo, describeEvolution } from "./evolutionChain";
import { getRegion } from "../data/regionConfig";
import { getDisplayIdMap } from "./pokedexNumbers";

const CATEGORY_ORDER = {
  starter: 0, wild: 1, gift: 1, fossil: 1, "trade-only": 1,
  evolve: 2, stone: 2, trade: 2, legendary: 3,
};


/**
 * Look up an override entry for a species, applying any game-specific
 * override (e.g. Pikachu is "wild" by default but "starter" in Yellow).
 */
function lookupOverride(overrides, speciesName, game) {
  const base = overrides[speciesName];
  if (!base) return null;
  const versionOverride = base.versions?.[game.id] || base.versions?.[game.versionGroup?.replace(/-/g, "")];
  return versionOverride ? { ...base, ...versionOverride } : base;
}

/**
 * For a root-form species with no override: find its best (highest-chance)
 * wild encounter in this game's version, and map that location to a stage.
 * Returns null if the species has no wild encounters in this version at all
 * (e.g. it's genuinely not obtainable here — trade-only, wrong version, etc).
 */
async function resolveWildEncounter(speciesName, game, region) {
  const raw = await getEncounters(speciesName);
  const matches = [];

  raw.forEach((loc) => {
    const vd = loc.version_details.find((v) => v.version.name === game.version);
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
  const stage = region.locationStageMap[best.locationArea] ?? null;

  return {
    category: "wild",
    detail:
      stage === null
        ? `Found in the wild (location "${best.locationArea}" isn't mapped to a stage yet — check the stage map).`
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
 * Does NOT resolve its lineage — see resolveTeamMember for that.
 */
async function resolveSpecies(speciesName, game, region) {
  const [pokemonData, speciesData, evoInfo] = await Promise.all([
    pokedex.getPokemonByName(speciesName),
    pokedex.getPokemonSpeciesByName(speciesName),
    getEvolutionInfo(speciesName),
  ]);

  const displayIdMap = await getDisplayIdMap(region.pokedexSlug);

  const base = {
    nationalId: pokemonData.id,
    displayId: displayIdMap[speciesName] ?? null,
    name: speciesName,
    types: pokemonData.types.map((t) => t.type.name),
    sprite:
      pokemonData.sprites.other?.["official-artwork"]?.front_default ||
      pokemonData.sprites.front_default,
    evolvesFrom: evoInfo.lineage[evoInfo.lineage.length - 1] || null,
  };

  // 1. Evolved form? Category/detail come from the evolution chain itself.
  //    Stage still needs to come from the ROOT of the chain — handled by
  //    the caller (resolveTeamMember), not here.
  if (!evoInfo.isRoot) {
    return { ...base, category: evoInfo.category, detail: evoInfo.detail, stage: null };
  }

  // 2. Root form with a hand-maintained override (starter/gift/fossil/
  //    legendary/trade-only, or a version-specific special case).
  const override = lookupOverride(region.overrides, speciesName, game);
  if (override) {
    return { ...base, category: override.category, detail: override.detail, stage: override.stage };
  }

  // 3. Root form, no override: must be a plain wild encounter.
  const wild = await resolveWildEncounter(speciesName, game, region);
  if (wild) {
    return { ...base, ...wild };
  }

  // 4. Root form, no override, no encounter data in this version at all.
  //    Don't guess — surface it plainly so it's obvious this needs an
  //    override entry rather than silently showing wrong info.
  return {
    ...base,
    category: speciesData.is_legendary || speciesData.is_mythical ? "legendary" : "wild",
    detail: `No wild encounter data found for ${game.label}. This likely needs an entry in the acquisition overrides file.`,
    stage: null,
  };
}

/**
 * Resolve a team member AND its full lineage back to the root, applying
 * the stage-inheritance rule: every form in a chain shares the ROOT's
 * stage (e.g. Typhlosion inherits Cyndaquil's stage), matching the
 * original hand-built dataset's behavior exactly.
 */
export async function resolveTeamMember(speciesName, game, region) {
  const evoInfo = await getEvolutionInfo(speciesName);
  const chainNames = [...evoInfo.lineage, speciesName]; // root-first, including target

  const resolved = await Promise.all(chainNames.map((name) => resolveSpecies(name, game, region)));

  const root = resolved[0];
  const rootStage = root.stage;

  const withInheritedStage = resolved.map((mon) => ({ ...mon, stage: rootStage }));
  const target = withInheritedStage[withInheritedStage.length - 1];
  const lineage = withInheritedStage.slice(0, -1); // ancestors only, root-first

  return { ...target, lineage };
}

/**
 * Top-level entry point: given a list of species names and a game
 * selection, returns the full team report sorted chronologically by
 * stage — exactly the data a report screen needs to render.
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

  return { game, stages: region.stages, team };
}