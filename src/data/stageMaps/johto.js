// Maps a PokeAPI location-area slug to a stage index (0-12), reusing the
// 13-stage progression for Johto — one stage per gym plus major story and
// post-game beats[cite: 21].
//
// IMPORTANT: these slugs follow PokeAPI's naming convention but are 
// verified against the provided Johto location inventory[cite: 20]. 
// Anything unmatched falls back to `null` in partyPlanner.js.

export const STAGES_JOHTO = [
  { id: 0, label: "New Bark Town", note: "Starting out" },
  { id: 1, label: "Violet City", note: "Falkner · Flying (Gym 1)" },
  { id: 2, label: "Azalea Town", note: "Bugsy · Bug (Gym 2)" },
  { id: 3, label: "Goldenrod City", note: "Whitney · Normal (Gym 3)" },
  { id: 4, label: "National Park", note: "En route to Ecruteak City" },
  { id: 5, label: "Ecruteak City", note: "Morty · Ghost (Gym 4)" },
  { id: 6, label: "Cianwood City", note: "Chuck · Fighting (Gym 5)" },
  { id: 7, label: "Olivine City", note: "Jasmine · Steel (Gym 6)" },
  { id: 8, label: "Mahogany Town", note: "Team Rocket hideout" },
  { id: 9, label: "Blackthorn City", note: "Pryce & Clair · Ice/Dragon (Gyms 7-8)" },
  { id: 10, label: "Dragon's Den", note: "Blackthorn's back yard" },
  { id: 11, label: "Victory Road", note: "Elite Four & Champion" },
  { id: 12, label: "Post-Game", note: "Mt. Silver & beyond" },
];

const LOCATION_STAGE = {
  // --- Stage 0: New Bark Town Era ---
  "new-bark-town": 0,
  "route-29": 0,
  "cherrygrove-city": 0,

  // --- Stage 1: Violet City Era (Gym 1) ---
  "route-30": 1,
  "route-31": 1,
  "violet-city": 1,
  "violet-city-poke-mart": 1,
  "violet-city-pokemon-center": 1,
  "dark-cave-violet-city": 1,
  "ruins-of-alph": 1,
  "ruins-of-alph-interior-a": 1,
  "ruins-of-alph-interior-b": 1,
  "ruins-of-alph-interior-c": 1,
  "ruins-of-alph-interior-d": 1,

  // --- Stage 2: Azalea Town Era (Gym 2) ---
  "route-32": 2,
  "union-cave": 2,
  "route-33": 2,
  "azalea-town": 2,
  "lost-tower": 2,

  // --- Stage 3: Goldenrod City Era (Gym 3) ---
  "ilex-forest": 3,
  "route-34": 3,
  "goldenrod-city-game-corner": 3,

  // --- Stage 4: National Park & Ecruteak Approaches ---
  "national-park": 4,
  "route-35": 4,
  "route-36": 4,

  // --- Stage 5: Ecruteak City Era (Gym 4) ---
  "route-37": 5,
  "ecruteak-city": 5,
  "bell-tower": 5,
  "bell-tower-roof": 5,

  // --- Stage 6: Cianwood City Era (Gym 5) ---
  "route-38": 6,
  "route-39": 6,
  "olivine-city": 6,
  "sea-route-40": 6,
  "cianwood-city": 6,
  "cianwood-city-kirks-house": 6,
  "cianwood-city-manias-house": 6,

  // --- Stage 7: Olivine City Sea Route & Whirl Islands (Gym 6) ---
  "sea-route-41": 7,
  "whirl-islands": 7,

  // --- Stage 8: Mahogany Town & Lake of Rage ---
  "route-42": 8,
  "mahogany-town": 8,
  "mt-mortar": 8,
  "mt-mortar-lower-cave": 8,
  "mt-mortar-upper-cave": 8,
  "route-43": 8,
  "lake-of-rage": 8,

  // --- Stage 9: Blackthorn City Era (Gyms 7-8) ---
  "route-44": 9,
  "ice-path": 9,
  "blackthorn-city": 9,
  "dark-cave-blackthorn-city": 9,

  // --- Stage 10: Dragon's Den ---
  "dragons-den": 10,

  // --- Stage 11: Victory Road & Elite Four ---
  "route-45": 11,
  "route-46": 11,
  "route-26": 11,
  "route-27": 11,
  "route-28": 11,
  "victory-road": 11,
  "roaming-johto": 11,

  // --- Stage 12: Post-Game & Mt. Silver ---
  "mt-silver": 12,
  "mt-silver-1f-top": 12,
  "mt-silver-mountainside": 12,
  "mt-silver-top": 12,
  "route-47": 12,
  "route-47-cave-gate": 12,
  "route-47-inside-cave": 12,
  "route-48": 12
};

export default LOCATION_STAGE;