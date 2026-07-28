// Thin wrapper around pokedex-promise-v2. Everything else in src/api/
// should import `pokedex` from here rather than constructing its own
// instance, so caching (cacheLimit) is actually shared across the app.
//
// npm install pokedex-promise-v2

import Pokedex from "pokedex-promise-v2";

export const pokedex = new Pokedex({
  cacheLimit: 24 * 60 * 60 * 1000, // 24h — PokeAPI data is effectively static
  timeout: 10 * 1000,
});

/**
 * Fetch a resource by raw URL/path. Used for things pokedex-promise-v2
 * doesn't wrap with a named method — most importantly a Pokémon's
 * `location_area_encounters` URL, which isn't a first-class endpoint.
 */
export function getResource(urlOrPath) {
  return pokedex.getResource(urlOrPath);
}

/**
 * Fetch a Pokémon's wild encounter list for every game it appears in.
 * Returns PokeAPI's raw shape: an array of
 *   { location_area, version_details: [{ version, max_chance, encounter_details }] }
 * Callers should filter version_details down to the version they care about.
 */
export async function getEncounters(nationalDexId) {
  const pokemon = await pokedex.getPokemonByName(nationalDexId);
  if (!pokemon.location_area_encounters) return [];
  return getResource(pokemon.location_area_encounters);
}