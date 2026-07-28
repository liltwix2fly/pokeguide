import { pokedex } from "./pokeapiClient";
import { getDisplayIdMap } from "./pokedexNumbers";
import { getRegion } from "../data/regionConfig";

/**
 * Returns every species newly introduced in this region/generation (not
 * the full regional dex, which includes returning species from earlier
 * generations too) — matching how the original hand-built datasets scoped
 * "Gen 1 Pokémon" to just the 151 species first introduced there.
 *
 * Uses generation.pokemon_species (species first appearing in this gen)
 * rather than the regional pokedex, since the regional pokedex includes
 * returning species from earlier generations that don't belong in "this
 * generation's list" the way the picker screen wants to present it.
 */
export async function getRegionalDexList(regionId) {
  const region = getRegion(regionId);
  const [generationData, displayIdMap] = await Promise.all([
    pokedex.getGenerationByName(region.generation),
    getDisplayIdMap(region.pokedexSlug),
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