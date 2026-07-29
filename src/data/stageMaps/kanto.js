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
  // --- Stage 0 / Stage 1: Starting Area & Pewter Route ---
  "pallet-town": 1,
  "route-1": 1,
  "viridian-city": 1,
  "route-2": 2,
  "route-2-main": 2,
  "route-2-north-towards-pewter-city": 2,
  "route-2-south-towards-viridian-city": 2,
  "viridian-forest": 2,
  "pewter-city": 2,
  "pewter-city-pewter-museum-of-science": 2,

  // --- Stage 2: Cerulean City Area ---
  "route-3": 3,
  "route-3-main": 3,
  "route-3-pokemon-center": 3,
  "mt-moon": 3,
  "mt-moon-mt-moon-square": 3,
  "route-4": 3,
  "route-4-pokemon-center": 3,
  "cerulean-city": 3,
  "route-24": 3,
  "route-25": 3,

  // --- Stage 3: Vermilion City Area ---
  "route-5": 4,
  "route-6": 4,
  "vermilion-city": 4,
  "vermilion-city-ss-anne-dock": 4,
  "ss-anne": 4,
  "digletts-cave": 4,
  "underground-path": 4,

  // --- Stage 4: Rock Tunnel & Lavender Town ---
  "route-7": 5,
  "route-8": 5,
  "route-8-main": 5,
  "route-9": 5,
  "route-9-main": 5,
  "route-10": 5,
  "rock-tunnel": 5,
  "lavender-town": 5,

  // --- Stage 5: Celadon City ---
  "celadon-city": 6,
  "celadon-city-celadon-mansion": 6,
  "celadon-city-prize-corner": 6,
  "route-16": 6,
  "route-16-main": 6,
  "route-17": 6,
  "route-18": 6,

  // --- Stage 6: Pokémon Tower ---
  "pokemon-tower": 6,

  // --- Stage 7: Fuchsia City & Safari Zone ---
  "fuchsia-city": 7,
  "safari-zone": 7,
  "route-12": 7,
  "route-13": 7,
  "route-14": 7,
  "route-15": 7,

  // --- Stage 8: Saffron City & Silph Co ---
  "saffron-city": 8,
  "saffron-city-fighting-dojo": 8,
  "saffron-city-silph-co": 8,
  "silph-co": 8,

  // --- Stage 9: Cinnabar Island & Mansion ---
  "route-19": 9,
  "sea-route-19": 9,
  "route-20": 9,
  "sea-route-20": 9,
  "cinnabar-island": 9,
  "cinnabar-island-cinnabar-lab": 9,
  "pokemon-mansion": 9,

  // --- Stage 10: Seafoam Islands & Viridian Gym Era ---
  "route-21": 10,
  "route-21-main": 10,
  "sea-route-21": 10,
  "seafoam-islands": 10,

  // --- Stage 11: Route 22, Victory Road & League ---
  "route-22": 11,
  "route-23": 11,
  "victory-road": 11,
  "victory-road-kanto": 11,
  "indigo-plateau": 11,
  "pokemon-league": 11,

  // --- Stage 12: Post-Game Kanto & Power Plant ---
  "cerulean-cave": 12,
  "unknown-dungeon": 12,
  "power-plant": 12,

  // --- Sevii Islands (Post-Game / FireRed & LeafGreen) ---
  "one-island": 12,
  "kindle-road": 12,
  "mt-ember": 12,
  "mt-ember-1f-cave-behind-team-rocket": 12,
  "mt-ember-cave": 12,
  "mt-ember-summit": 12,
  "treasure-beach": 12,
  "two-island": 12,
  "cape-brink": 12,
  "three-island": 12,
  "bond-bridge": 12,
  "berry-forest": 12,
  "four-island": 12,
  "icefall-cave": 12,
  "icefall-cave-waterfall": 12,
  "five-island": 12,
  "five-isle-meadow": 12,
  "memorial-pillar": 12,
  "lost-cave": 12,
  "lost-cave-item-rooms": 12,
  "resort-gorgeous": 12,
  "water-labyrinth": 12,
  "six-island": 12,
  "water-path": 12,
  "ruin-valley": 12,
  "dotted-hole": 12,
  "green-path": 12,
  "pattern-bush": 12,
  "outcast-island": 12,
  "altering-cave": 12,
  "altering-cave-a": 12,
  "seven-island": 12,
  "trainer-tower": 12,
  "canyon-entrance": 12,
  "sevault-canyon": 12,
  "tanoby-ruins": 12
};

export default LOCATION_STAGE;