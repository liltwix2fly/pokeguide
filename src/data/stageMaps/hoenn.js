export const STAGES_HOENN = [
  { id: 0, label: "Littleroot Town", note: "Starting out" },
  { id: 1, label: "Rustboro City", note: "Roxanne · Rock (Gym 1)" },
  { id: 2, label: "Dewford Town", note: "Brawly · Fighting (Gym 2)" },
  { id: 3, label: "Mauville City", note: "Wattson · Electric (Gym 3)" },
  { id: 4, label: "Lavaridge Town", note: "Flannery · Fire (Gym 4)" },
  { id: 5, label: "Fallarbor Town", note: "Meteor Falls & Route 113-115" },
  { id: 6, label: "Petalburg City", note: "Norman · Normal (Gym 5)" },
  { id: 7, label: "Fortree City", note: "Winona · Flying (Gym 6)" },
  { id: 8, label: "Lilycove City", note: "Mt. Pyre & Route 121-122" },
  { id: 9, label: "Route 123-124", note: "Team Aqua/Magma & Weather Institute" },
  { id: 10, label: "Mossdeep City", note: "Tate & Liza · Psychic (Gym 7)" },
  { id: 11, label: "Sootopolis City", note: "Wallace/Juan · Water (Gym 8)" },
  { id: 12, label: "Victory Road", note: "Elite Four & Champion" },
  { id: 13, label: "Post-Game", note: "Sky Pillar, Regis & beyond" },
];

// Same caveat as kanto.js/johto.js: these slugs follow PokeAPI's naming
// convention but aren't verified against a live response in this sandbox.
const LOCATION_STAGE = {
  "littleroot-town-area": 0,
  "route-101-area": 0,
  "oldale-town-area": 0,
  "route-102-area": 0,
  "route-103-area": 0,

  "route-104-area": 1,
  "petalburg-woods-area": 1,
  "rustboro-city-area": 1,

  "route-116-area": 2,
  "rusturf-tunnel-area": 2,
  "route-109-area": 2,
  "dewford-town-area": 2,
  "granite-cave-1f": 2,
  "granite-cave-b1f": 2,

  "route-107-area": 3,
  "route-108-area": 3,
  "slateport-city-area": 3,
  "route-110-area": 3,
  "mauville-city-area": 3,

  "route-111-area": 4,
  "route-112-area": 4,
  "fiery-path-area": 4,
  "lavaridge-town-area": 4,

  "route-113-area": 5,
  "route-114-area": 5,
  "fallarbor-town-area": 5,
  "meteor-falls-1f": 5,
  "meteor-falls-b1f": 5,
  "route-115-area": 5,

  "route-117-area": 6,
  "verdanturf-town-area": 6,
  "petalburg-city-area": 6,

  "route-118-area": 7,
  "route-119-area": 7,
  "fortree-city-area": 7,

  "route-120-area": 8,
  "route-121-area": 8,
  "lilycove-city-area": 8,
  "route-122-area": 8,
  "mt-pyre-1f": 8,
  "mt-pyre-summit-area": 8,

  "route-123-area": 9,
  "route-124-area": 9,
  "weather-institute-area": 9,
  "seafloor-cavern-area": 9,

  "mossdeep-city-area": 10,
  "shoal-cave-low-tide-1f": 10,

  "route-125-area": 11,
  "route-126-area": 11,
  "route-127-area": 11,
  "sootopolis-city-area": 11,
  "cave-of-origin-1f": 11,
  "seafloor-cavern-room-1": 11,

  "route-128-area": 12,
  "route-129-area": 12,
  "ever-grande-city-area": 12,
  "victory-road-1f": 12,
  "victory-road-2f": 12,

  "sky-pillar-1f": 13,
  "sky-pillar-top-area": 13,
  "southern-island-area": 13,
  "desert-ruins-area": 13,
  "island-cave-area": 13,
  "ancient-tomb-area": 13,
  "birth-island-area": 13,
  "faraway-island-area": 13,
  "battle-frontier-area": 13,
};

export default LOCATION_STAGE;