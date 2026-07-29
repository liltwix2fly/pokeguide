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

const LOCATION_STAGE = {
  // --- Stage 0: Littleroot Town Era ---
  "route-101": 0,
  "route-102": 0,
  "route-103": 0,

  // --- Stage 1: Rustboro City Era (Gym 1) ---
  "route-104": 1,
  "route-104-north-oras": 1,
  "route-104-south-oras": 1,
  "petalburg-woods": 1,
  "rustboro-city": 1,
  "rusturf-tunnel": 1,

  // --- Stage 2: Dewford Town Era (Gym 2) ---
  "route-105": 2,
  "route-106": 2,
  "route-107": 2,
  "route-108": 2,
  "dewford-town": 2,
  "granite-cave": 2,
  "granite-cave-1fsmall-room": 2,

  // --- Stage 3: Mauville City Era (Gym 3) ---
  "route-109": 3,
  "route-110": 3,
  "route-111": 3,
  "slateport-city": 3,
  "mauville-city": 3,
  "new-mauville": 3,

  // --- Stage 4: Lavaridge Town Era (Gym 4) ---
  "route-112": 4,
  "fiery-path": 4,
  "jagged-pass": 4,
  "lavaridge-town": 4,
  "magma-hideout": 4,
  "mirage-tower": 4,

  // --- Stage 5: Fallarbor Town Era ---
  "route-113": 5,
  "route-114": 5,
  "route-115": 5,
  "fallarbor-town": 5,
  "desert-underpass": 5,
  "meteor-falls": 5,
  "meteor-falls-back": 5,
  "meteor-falls-backsmall-room": 5,

  // --- Stage 6: Petalburg City Era (Gym 5) ---
  "route-116": 6,
  "route-117": 6,
  "petalburg-city": 6,

  // --- Stage 7: Fortree City Era (Gym 6) ---
  "route-120": 7,
  "fortree-city": 7,
  "safari-zone-hoenn": 7,

  // --- Stage 8: Lilycove City Era ---
  "route-121": 8,
  "route-122": 8,
  "lilycove-city": 8,
  "aqua-hideout": 8,
  "mt-pyre": 8,
  "mt-pyre-summit": 8,

  // --- Stage 9: Route 123-124 Era ---
  "route-118": 9,
  "route-119": 9,
  "route-119-weather-institute": 9,
  "route-123": 9,
  "route-124": 9,
  "route-124-underwater": 9,
  "weather-institute": 9,

  // --- Stage 10: Mossdeep City Era (Gym 7) ---
  "route-125": 10,
  "route-126": 10,
  "route-126-underwater": 10,
  "route-127": 10,
  "mossdeep-city": 10,
  "mossdeep-city-stevens-house": 10,
  "mossdeep-space-center": 10,
  "shoal-cave": 10,

  // --- Stage 11: Sootopolis City Era (Gym 8) ---
  "route-128": 11,
  "route-129": 11,
  "route-130": 11,
  "route-131": 11,
  "route-132": 11,
  "route-133": 11,
  "route-134": 11,
  "sootopolis-city": 11,
  "cave-of-origin": 11,
  "pacifidlog-town": 11,
  "seafloor-cavern": 11,

  // --- Stage 12: Victory Road & Elite Four ---
  "ever-grande-city": 12,
  "victory-road-hoenn": 12,
  "pokemon-league-hoenn": 12,

  // --- Stage 13: Post-Game & Legendary Locations ---
  "sky-pillar": 13,
  "sky-pillar-apex": 13,
  "marine-cave": 13,
  "terra-cave": 13,
  "mirage-island": 13,
  "southern-island": 13,
  "birth-island": 13,
  "ancient-tomb": 13,
  "desert-ruins": 13,
  "island-cave": 13
};

export default LOCATION_STAGE;