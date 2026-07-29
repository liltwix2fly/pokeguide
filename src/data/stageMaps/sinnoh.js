export const STAGES_SINNOH = [
  { id: 0, label: "Twinleaf Town", note: "Starting out" },
  { id: 1, label: "Oreburgh City", note: "Roark · Rock (Gym 1)" },
  { id: 2, label: "Eterna City", note: "Gardenia · Grass (Gym 2)" },
  { id: 3, label: "Veilstone City", note: "Maylene · Fighting (Gym 3)" },
  { id: 4, label: "Pastoria City", note: "Crasher Wake · Water (Gym 4)" },
  { id: 5, label: "Hearthome City", note: "Fantina · Ghost (Gym 5)" },
  { id: 6, label: "Canalave City", note: "Byron · Steel (Gym 6)" },
  { id: 7, label: "Route 216-217", note: "En route to Snowpoint" },
  { id: 8, label: "Snowpoint City", note: "Candice · Ice (Gym 7)" },
  { id: 9, label: "Sunyshore City", note: "Volkner · Electric (Gym 8)" },
  { id: 10, label: "Victory Road", note: "Elite Four & Champion" },
  { id: 11, label: "Fight/Survival Area", note: "Post-game routes" },
  { id: 12, label: "Post-Game", note: "Mt. Coronet summit & beyond" },
];

// Same caveat as the other stage maps: slugs follow PokeAPI's naming
// convention but aren't verified against a live response in this sandbox.
const LOCATION_STAGE = {
  "twinleaf-town-area": 0,
  "route-201-area": 0,
  "sandgem-town-area": 0,

  "route-202-area": 1,
  "jubilife-city-area": 1,
  "route-203-area": 1,
  "oreburgh-gate-1f": 1,
  "oreburgh-city-area": 1,
  "oreburgh-mine-area": 1,

  "route-204-area": 2,
  "floaroma-town-area": 2,
  "valley-windworks-area": 2,
  "eterna-forest-area": 2,
  "old-chateau-area": 2,
  "eterna-city-area": 2,

  "route-205-area": 3,
  "route-206-area": 3,
  "route-207-area": 3,
  "route-208-area": 3,
  "solaceon-town-area": 3,
  "route-209-area": 3,
  "route-210-area": 3,
  "veilstone-city-area": 3,

  "route-211-area": 4,
  "route-212-area": 4,
  "great-marsh-area": 4,
  "pastoria-city-area": 4,

  "route-213-area": 5,
  "route-214-area": 5,
  "route-215-area": 5,
  "amity-square-area": 5,
  "hearthome-city-area": 5,

  "route-218-area": 6,
  "iron-island-1f": 6,
  "canalave-city-area": 6,

  "route-216-area": 7,
  "route-217-area": 7,

  "lake-acuity-area": 8,
  "snowpoint-city-area": 8,
  "snowpoint-temple-1f": 8,

  "route-222-area": 9,
  "sunyshore-city-area": 9,

  "route-221-area": 10,
  "route-223-area": 10,
  "victory-road-1f": 10,
  "pokemon-league-area": 10,

  "fight-area-area": 11,
  "survival-area-area": 11,
  "route-225-area": 11,
  "route-226-area": 11,

  "resort-area-area": 12,
  "spear-pillar-area": 12,
  "distortion-world-area": 12,
  "stark-mountain-1f": 12,
  "fullmoon-island-area": 12,
  "newmoon-island-area": 12,
  "turnback-cave-area": 12,
  "route-227-area": 12,
  "route-228-area": 12,
  "route-229-area": 12,
  "route-230-area": 12,
};

export default LOCATION_STAGE;