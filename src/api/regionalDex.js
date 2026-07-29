import { pokedex } from "./pokeapiClient";
import { getRegion } from "../data/regionConfig";

/**
 * Returns the full regional dex list for the selected region/game,
 * supporting expanded cross-generation regional Pokédexes (such as
 * Platinum's extended-sinnoh vs Diamond/Pearl's original-sinnoh).
 */
export async function getRegionalDexList(regionId, gameId) {
  const region = getRegion(regionId);
  
  // Find the specific game selected (e.g., Platinum) to grab its dex override (e.g., extended-sinnoh)
  const selectedGame = gameId ? region.games?.find((g) => g.id === gameId) : null;
  
  // Fall back to the region's default pokedexSlug if no game override exists
  const dexSlug = selectedGame?.dexId || selectedGame?.pokedexSlug || region.pokedexSlug;

  // Fetch the actual regional Pokédex object directly to include cross-gen species
  const dex = await pokedex.getPokedexByName(dexSlug);

  // Extract species names and map their display entry numbers directly from the dex
  const speciesEntries = dex.pokemon_entries.map((e) => ({
    name: e.pokemon_species.name,
    entryNumber: e.entry_number,
  }));

  const speciesNames = speciesEntries.map((e) => e.name);

  // Use Promise.allSettled to gracefully handle form-variant 404 errors (like Darmanitan)
  const results = await Promise.allSettled(
    speciesNames.map((name) => pokedex.getPokemonByName(name))
  );

  // Create a lookup map for the regional numbers
  const displayIdMap = Object.fromEntries(
    speciesEntries.map((e) => [e.name, e.entryNumber])
  );

  return results
    .filter((res) => res.status === "fulfilled" && res.value)
    .map((res) => {
      const p = res.value;
      return {
        nationalId: p.id,
        displayId: displayIdMap[p.name] ?? null,
        name: p.name,
        types: p.types.map((t) => t.type.name),
        sprite: p.sprites.other?.["official-artwork"]?.front_default || p.sprites.front_default,
      };
    });
}