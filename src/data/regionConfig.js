import kantoOverrides from "./acquisitionOverrides/kanto";
import kantoStageMap, { STAGES_KANTO } from "./stageMaps/kanto";
import johtoOverrides from "./acquisitionOverrides/johto";
import johtoStageMap, { STAGES_JOHTO } from "./stageMaps/johto";

// This is the single place a new generation gets registered. Everything
// else (API client, evolution walker, category inference) is generation-
// agnostic — adding Johto took two small data files and the three lines
// below; adding Hoenn/Sinnoh/etc. later is the same shape.
const regionConfig = {
  kanto: {
    generation: 1,
    pokedexSlug: "kanto", // passed to getPokedexByName() for display_id lookups
    stages: STAGES_KANTO,
    locationStageMap: kantoStageMap,
    overrides: kantoOverrides,
    games: [
      { id: "red", label: "Red", versionGroup: "red-blue", version: "red" },
      { id: "blue", label: "Blue", versionGroup: "red-blue", version: "blue" },
      { id: "yellow", label: "Yellow", versionGroup: "yellow", version: "yellow" },
      { id: "firered", label: "FireRed", versionGroup: "firered-leafgreen", version: "firered" },
      { id: "leafgreen", label: "LeafGreen", versionGroup: "firered-leafgreen", version: "leafgreen" },
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

  // hoenn: { generation: 3, pokedexSlug: "hoenn", ... },
};

export default regionConfig;

export function getRegion(regionId) {
  const region = regionConfig[regionId];
  if (!region) throw new Error(`Unknown region: ${regionId}`);
  return region;
}

export function getGame(regionId, gameId) {
  const region = getRegion(regionId);
  const game = region.games.find((g) => g.id === gameId);
  if (!game) throw new Error(`Unknown game "${gameId}" in region "${regionId}"`);
  return { ...game, regionId };
}