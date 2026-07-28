// Maps a PokeAPI location-area slug to a stage index (0-12), reusing the
// same 13-stage progression from the original hand-built Kanto dataset —
// one stage per gym plus a couple of major story beats.
//
// IMPORTANT: these slugs are written from PokeAPI's typical naming
// convention (kebab-case, often split by floor for multi-level areas) but
// are NOT verified against a live response, since this environment can't
// make outbound network calls. This file is the first thing to sanity
// check once it's wired up — fetch a known Pokémon's encounters (e.g.
// Zubat) and confirm the location_area names returned actually match keys
// here. Anything unmatched falls back to `null` (see partyPlanner.js),
// which is a visible "unmapped location" rather than a silent wrong stage.

export const STAGES_KANTO = [
  { id: 0, label: "Pallet Town", note: "Starting out" },
  { id: 1, label: "Pewter City", note: "Brock · Rock (Gym 1)" },
  { id: 2, label: "Cerulean City", note: "Misty · Water (Gym 2)" },
  { id: 3, label: "Vermilion City", note: "Lt. Surge · Electric (Gym 3)" },
  { id: 4, label: "Rock Tunnel", note: "En route to Lavender Town" },
  { id: 5, label: "Celadon City", note: "Erika · Grass (Gym 4)" },
  { id: 6, label: "Pokémon Tower", note: "Poké Flute obtained" },
  { id: 7, label: "Fuchsia City", note: "Koga · Poison (Gym 5)" },
  { id: 8, label: "Saffron City", note: "Sabrina · Psychic (Gym 6)" },
  { id: 9, label: "Cinnabar Island", note: "Blaine · Fire (Gym 7)" },
  { id: 10, label: "Viridian City", note: "Giovanni · Ground (Gym 8)" },
  { id: 11, label: "Victory Road", note: "Elite Four & Champion" },
  { id: 12, label: "Post-Game", note: "Cerulean Cave & beyond" },
];

const LOCATION_STAGE = {
  "pallet-town-area": 0,
  "route-1-area": 0,

  "route-2-area": 1,
  "viridian-forest-area": 1,
  "pewter-city-area": 1,

  "route-3-area": 2,
  "mt-moon-1f": 2,
  "mt-moon-b1f": 2,
  "mt-moon-b2f": 2,
  "route-4-area": 2,
  "cerulean-city-area": 2,

  "route-24-area": 3,
  "route-25-area": 3,
  "route-5-area": 3,
  "route-6-area": 3,
  "vermilion-city-area": 3,
  "ss-anne-area": 3,

  "route-9-area": 4,
  "route-10-area": 4,
  "rock-tunnel-1f": 4,
  "rock-tunnel-b1f": 4,
  "lavender-town-area": 4,
  "route-11-area": 4,
  "route-12-area": 4,
  "digletts-cave-area": 4,

  "route-7-area": 5,
  "route-8-area": 5,
  "celadon-city-area": 5,
  "rocket-hideout-b1f": 5,
  "rocket-hideout-b2f": 5,
  "rocket-hideout-b3f": 5,
  "rocket-hideout-b4f": 5,

  "pokemon-tower-1f": 6,
  "pokemon-tower-2f": 6,
  "pokemon-tower-3f": 6,
  "pokemon-tower-4f": 6,
  "pokemon-tower-5f": 6,
  "pokemon-tower-6f": 6,
  "pokemon-tower-7f": 6,

  "route-13-area": 7,
  "route-14-area": 7,
  "route-15-area": 7,
  "route-16-area": 7,
  "route-17-area": 7,
  "route-18-area": 7,
  "fuchsia-city-area": 7,
  "safari-zone-area": 7,
  "safari-zone-center-area": 7,
  "power-plant-area": 7,

  "saffron-city-area": 8,
  "silph-co-1f": 8,

  "route-19-area": 9,
  "route-20-area": 9,
  "route-21-area": 9,
  "cinnabar-island-area": 9,
  "pokemon-mansion-1f": 9,
  "seafoam-islands-1f": 9,
  "seafoam-islands-b1f": 9,
  "seafoam-islands-b2f": 9,
  "seafoam-islands-b3f": 9,
  "seafoam-islands-b4f": 9,

  "viridian-city-area": 10,
  "viridian-gym-area": 10,

  "route-22-area": 11,
  "route-23-area": 11,
  "victory-road-1f": 11,
  "victory-road-2f": 11,
  "victory-road-3f": 11,
  "indigo-plateau-area": 11,

  "cerulean-cave-1f": 12,
  "cerulean-cave-2f": 12,
  "cerulean-cave-b1f": 12,
};

export default LOCATION_STAGE;