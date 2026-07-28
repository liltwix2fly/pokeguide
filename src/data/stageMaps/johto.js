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

// Same caveat as kanto.js: these slugs follow PokeAPI's naming
// convention but aren't verified against a live response in this
// sandbox. Verify against a real fetch before trusting fully.
const LOCATION_STAGE = {
  "new-bark-town-area": 0,
  "route-29-area": 0,
  "route-30-area": 1,
  "route-31-area": 1,
  "violet-city-area": 1,
  "sprout-tower-1f": 1,
  "ruins-of-alph-outside-area": 1,
  "dark-cave-violet-entrance": 1,

  "route-32-area": 2,
  "union-cave-1f": 2,
  "route-33-area": 2,
  "azalea-town-area": 2,
  "slowpoke-well-b1f": 2,
  "ilex-forest-area": 2,

  "route-34-area": 3,
  "goldenrod-city-area": 3,
  "goldenrod-underground-area": 3,

  "route-35-area": 4,
  "route-36-area": 4,
  "route-37-area": 4,
  "national-park-area": 4,

  "ecruteak-city-area": 5,
  "burned-tower-1f": 5,
  "tin-tower-1f": 5,

  "route-40-area": 6,
  "route-41-area": 6,
  "cianwood-city-area": 6,
  "whirl-islands-1f": 6,

  "route-38-area": 7,
  "route-39-area": 7,
  "olivine-city-area": 7,

  "route-42-area": 8,
  "mt-mortar-1f": 8,
  "route-43-area": 8,
  "lake-of-rage-area": 8,
  "mahogany-town-area": 8,
  "team-rockets-den-b1f": 8,

  "route-44-area": 9,
  "ice-path-1f": 9,
  "blackthorn-city-area": 9,

  "dragons-den-1f": 10,

  "route-26-area": 11,
  "route-27-area": 11,
  "route-28-area": 11,
  "victory-road-1f": 11,

  "mt-silver-1f": 12,
};

export default LOCATION_STAGE;