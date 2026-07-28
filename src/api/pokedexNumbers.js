import { pokedex } from "./pokeapiClient";

// One fetch per region gets the ENTIRE regional numbering back at once —
// no need to store this locally at all, unlike national dex order which
// is fixed and doesn't need fetching.
const cache = new Map();

export async function getDisplayIdMap(pokedexSlug) {
  if (cache.has(pokedexSlug)) return cache.get(pokedexSlug);

  const dex = await pokedex.getPokedexByName(pokedexSlug);
  const map = Object.fromEntries(
    dex.pokemon_entries.map((e) => [e.pokemon_species.name, e.entry_number])
  );

  cache.set(pokedexSlug, map);
  return map;
}