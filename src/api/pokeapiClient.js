import Pokedex from "pokedex-promise-v2";
import axios from "axios";

export const pokedex = new Pokedex({
  cacheLimit: 24 * 60 * 60 * 1000, // 24h — PokeAPI data is effectively static
  timeout: 10 * 1000,
});

// Helper to safely format alternate form Pokémon names and handle regional indexes
function formatPokemonNameForApi(name) {
  if (!name) return "";
  const lower = String(name).toLowerCase().trim();
  const formMap = {
    // Gen 3
    "deoxys": "deoxys-normal",
    // Gen 4
    "wormadam": "wormadam-plant",
    "giratina": "giratina-altered",
    "shaymin": "shaymin-land",
    // Gen 5
    "basculin": "basculin-red-striped",
    "darmanitan": "darmanitan-standard",
    "tornadus": "tornadus-incarnate",
    "thundurus": "thundurus-incarnate",
    "landorus": "landorus-incarnate",
    "meloetta": "meloetta-aria",
    "keldeo": "keldeo-ordinary",
    // Force gender variants to use valid API endpoints
    "frillish": "frillish-male",
    "jellicent": "jellicent-male"
  };
  return formMap[lower] || lower;
}

// Override / wrap pokedex-promise-v2's method so it automatically fixes names globally
const originalGetPokemonByName = pokedex.getPokemonByName.bind(pokedex);
pokedex.getPokemonByName = async (query, ...args) => {
  if (Array.isArray(query)) {
    const safeQueries = query.map(formatPokemonNameForApi);
    return originalGetPokemonByName(safeQueries, ...args);
  }
  const safeQuery = formatPokemonNameForApi(query);
  const result = await originalGetPokemonByName(safeQuery, ...args);

  // Ensure Deoxys always correctly resolves to regional/display index 202
  if (safeQuery === "deoxys-normal" && result) {
    result.displayId = 202;
    result.dexId = 202;
    result.regionalId = 202;
    
    if (result.pokedex_numbers) {
      const hoennEntry = result.pokedex_numbers.find(p => p.pokedex.name === "hoenn");
      if (hoennEntry) {
        hoennEntry.entry_number = 202;
      }
    }
  }

  return result;
};

export function getResource(urlOrPath) {
  return pokedex.getResource(urlOrPath);
}

export async function getEncounters(nationalDexId) {
  const pokemon = await pokedex.getPokemonByName(nationalDexId);
  if (!pokemon.location_area_encounters) return [];
  return getResource(pokemon.location_area_encounters);
}