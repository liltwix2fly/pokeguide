import { pokedex } from "./pokeapiClient";
import { getRegion } from "../data/regionConfig";

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

/**
 * Returns every species newly introduced in this region/generation (not
 * the full regional dex, which includes returning species from earlier
 * generations too) — matching how the original hand-built datasets scoped
 * "Gen 1 Pokémon" to just the 151 species first introduced there.
 */
export async function getRegionalDexList(regionId, gameId) {
  const region = getRegion(regionId);
  
  // Check if a specific game version overrides the pokedexSlug (like Platinum using "extended-sinnoh")
  const selectedGame = gameId ? region.games.find(g => g.id === gameId) : null;
  const dexSlug = selectedGame?.pokedexSlug || region.pokedexSlug;

  const [generationData, displayIdMap] = await Promise.all([
    pokedex.getGenerationByName(region.generation),
    getDisplayIdMap(dexSlug),
  ]);

  const speciesNames = generationData.pokemon_species
    .map((s) => s.name)
    .sort((a, b) => (displayIdMap[a] ?? 9999) - (displayIdMap[b] ?? 9999));

  // pokedex-promise-v2 fetches array input in parallel, so this is one
  // batched round-trip rather than N sequential ones.
  const pokemonData = await pokedex.getPokemonByName(speciesNames);

  return pokemonData.map((p) => ({
    nationalId: p.id,
    displayId: displayIdMap[p.name] ?? null,
    name: p.name,
    types: p.types.map((t) => t.type.name),
    sprite: p.sprites.other?.["official-artwork"]?.front_default || p.sprites.front_default,
  }));
}