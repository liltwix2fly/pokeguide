import kantoOverrides from "./acquisitionOverrides/kanto";
import kantoStageMap, { STAGES_KANTO } from "./stageMaps/kanto";
import johtoOverrides from "./acquisitionOverrides/johto";
import johtoStageMap, { STAGES_JOHTO } from "./stageMaps/johto";
import hoennOverrides from "./acquisitionOverrides/hoenn";
import hoennStageMap, { STAGES_HOENN } from "./stageMaps/hoenn";
import sinnohOverrides from "./acquisitionOverrides/sinnoh";
import sinnohStageMap, { STAGES_SINNOH } from "./stageMaps/sinnoh";
import unovaOverrides from "./acquisitionOverrides/unova";
import unovaStageMap, { STAGES_UNOVA } from "./stageMaps/unova";

const regionConfig = {
  kanto: {
    generation: 1,
    pokedexSlug: "kanto",
    stages: STAGES_KANTO,
    locationStageMap: kantoStageMap,
    overrides: kantoOverrides,
    games: [
      { id: "red", label: "Red", versionGroup: "red-blue", version: "red" },
      { id: "blue", label: "Blue", versionGroup: "red-blue", version: "blue" },
      { id: "yellow", label: "Yellow", versionGroup: "yellow", version: "yellow" },
      { id: "firered", label: "FireRed", versionGroup: "firered-leafgreen", version: "firered", displayGeneration: 3},
      { id: "leafgreen", label: "LeafGreen", versionGroup: "firered-leafgreen", version: "leafgreen", displayGeneration: 3},
    ],
  },

  johto: {
    generation: 2,
    pokedexSlug: "original-johto",
    stages: STAGES_JOHTO,
    locationStageMap: johtoStageMap,
    overrides: johtoOverrides,
    games: [
      { id: "gold", label: "Gold", versionGroup: "gold-silver", version: "gold" },
      { id: "silver", label: "Silver", versionGroup: "gold-silver", version: "silver" },
      { id: "crystal", label: "Crystal", versionGroup: "crystal", version: "crystal" },
    ],
  },

  hoenn: {
    generation: 3,
    pokedexSlug: "hoenn",
    stages: STAGES_HOENN,
    locationStageMap: hoennStageMap,
    overrides: hoennOverrides,
    games: [
        { id: "ruby", label: "Ruby", versionGroup: "ruby-sapphire", version: "ruby", dexId: "hoenn" },
        { id: "sapphire", label: "Sapphire", versionGroup: "ruby-sapphire", version: "sapphire", dexId: "hoenn" },
        { id: "emerald", label: "Emerald", versionGroup: "emerald", version: "emerald", dexId: "hoenn" },
        { id: "firered", label: "FireRed", versionGroup: "firered-leafgreen", version: "firered", dexId: "kanto" }, // 👈 Use "kanto"
        { id: "leafgreen", label: "LeafGreen", versionGroup: "firered-leafgreen", version: "leafgreen", dexId: "kanto" }, // 👈 Use "kanto"
    ]
  },
  sinnoh: {
    generation: 4,
    pokedexSlug: "original-sinnoh",
    stages: STAGES_SINNOH,
    locationStageMap: sinnohStageMap,
    overrides: sinnohOverrides,
    games: [
        { id: "diamond", label: "Diamond", versionGroup: "diamond-pearl", version: "diamond", dexId: "original-sinnoh" },
        { id: "pearl", label: "Pearl", versionGroup: "diamond-pearl", version: "pearl", dexId: "original-sinnoh" },
        { id: "platinum", label: "Platinum", versionGroup: "platinum", version: "platinum", dexId: "extended-sinnoh" },
        { id: "heartgold", label: "HeartGold", versionGroup: "heartgold-soulsilver", version: "heartgold", dexId: "updated-johto" },
        { id: "soulsilver", label: "SoulSilver", versionGroup: "heartgold-soulsilver", version: "soulsilver", dexId: "updated-johto" },
    ]
  },
  unova: {
    generation: 5,
    pokedexSlug: "original-unova",
    stages: STAGES_UNOVA,
    locationStageMap: unovaStageMap,
    overrides: unovaOverrides,
    games: [
        { id: "black", label: "Black", versionGroup: "black-white", version: "black", dexId: "original-unova" },
        { id: "white", label: "White", versionGroup: "black-white", version: "white", dexId: "original-unova" },
        { id: "black2", label: "Black2", versionGroup: "black2-white2", version: "black2", dexId: "updated-unova" },
        { id: "white2", label: "White2", versionGroup: "black2-white2", version: "white2", dexId: "updated-unova" },
    ]
  }
};

export default regionConfig;

export function getRegion(regionKeyOrSlug) {
  // 1. Check if it matches a direct region key (e.g. "sinnoh")
  if (regionConfig[regionKeyOrSlug]) {
    return regionConfig[regionKeyOrSlug];
  }

  // 2. Fallback: Search by pokedexSlug or individual game slugs if a slug was passed instead
  for (const region of Object.values(regionConfig)) {
    if (region.pokedexSlug === regionKeyOrSlug) {
      return region;
    }
    const matchingGame = region.games.find(g => g.pokedexSlug === regionKeyOrSlug);
    if (matchingGame) {
      return region;
    }
  }

  throw new Error(`Unknown region or slug: ${regionKeyOrSlug}`);
}

export function getGame(regionId, gameId) {
  const region = getRegion(regionId);
  const game = region.games.find((g) => g.id === gameId);
  if (!game) throw new Error(`Unknown game "${gameId}" in region "${regionId}"`);
  return { ...game, regionId };
}

export function getGamesByGeneration() {
  const grouped = {};
  for (const [regionId, region] of Object.entries(regionConfig)) {
    for (const game of region.games) {
      const gen = game.displayGeneration ?? region.generation;
      if (!grouped[gen]) grouped[gen] = [];
      grouped[gen].push({ ...game, regionId });
    }
  }
  return grouped;
}