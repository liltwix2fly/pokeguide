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

const LOCATION_STAGE = {
  // --- Stage 0: Twinleaf Town Era ---
  "twinleaf-town": 0,
  "sandgem-town": 0,
  "jubilife-city": 0,
  "route-201": 0,
  "route-202": 0,
  "lake-verity": 0,
  "lake-verity-before-galactic-intervention": 0,

  // --- Stage 1: Oreburgh City Era (Gym 1) ---
  "oreburgh-city": 1,
  "oreburgh-city-oreburgh-mining-museum": 1,
  "oreburgh-mine": 1,
  "oreburgh-gate": 1,
  "route-203": 1,
  "route-204": 1,
  "route-204-north-towards-floaroma-town": 1,
  "route-204-south-towards-jubilife-city": 1,
  "ravaged-path": 1,

  // --- Stage 2: Eterna City Era (Gym 2) ---
  "floaroma-town": 2,
  "floaroma-meadow": 2,
  "valley-windworks": 2,
  "eterna-forest": 2,
  "eterna-city": 2,
  "old-chateau": 2,
  "old-chateau-2f-left-room": 2,
  "route-205": 2,
  "route-205-east-towards-eterna-city": 2,
  "route-205-south-towards-floaroma-town": 2,

  // --- Stage 3: Veilstone City Era (Gym 3) ---
  "route-206": 3,
  "route-207": 3,
  "wayward-cave": 3,
  "mt-coronet": 3,
  "mt-coronet-1f-from-exterior": 3,
  "mt-coronet-1f-route-207": 3,
  "hearthome-city": 3,
  "hearthome-city-west-gate": 3,
  "ruin-maniac-cave-0-9-different-unown-caught": 3,
  "ruin-maniac-cave-10-25-different-unown-caught": 3,

  // --- Stage 4: Pastoria City Era (Gym 4) ---
  "route-208": 4,
  "solaceon-town": 4,
  "solaceon-ruins": 4,
  "route-209": 4,
  "lost-tower": 4,
  "veilstone-city": 4,
  "trophy-garden": 4,
  "fuego-ironworks": 4,

  // --- Stage 5: Hearthome City Era (Gym 5) ---
  "route-210": 5,
  "route-210-south-towards-solaceon-town": 5,
  "route-210-west-towards-celestic-town": 5,
  "route-215": 5,
  "pastoria-city": 5,
  "great-marsh": 5,
  "route-213": 5,
  "valor-lakefront": 5,
  "lake-valor": 5,
  "lake-valor-cavern": 5,

  // --- Stage 6: Canalave City Era (Gym 6) ---
  "celestic-town": 6,
  "route-211": 6,
  "route-211-east-towards-celestic-town": 6,
  "route-211-west-towards-eterna-city": 6,
  "route-212": 6,
  "route-212-east-towards-pastoria-city": 6,
  "route-212-north-towards-hearthome-city": 6,
  "route-214": 6,

  // --- Stage 7: Route 216-217 Era ---
  "route-216": 7,
  "route-217": 7,
  "lake-acuity": 7,
  "lake-acuity-cavern": 7,
  "acuity-lakefront": 7,

  // --- Stage 8: Snowpoint City Era (Gym 7) ---
  "snowpoint-city": 8,
  "snowpoint-temple": 8,

  // --- Stage 9: Sunyshore City Era (Gym 8) ---
  "canalave-city": 9,
  "iron-island": 9,
  "route-218": 9,
  "route-219": 9,
  "sea-route-220": 9,
  "route-221": 9,
  "route-222": 9,
  "sunyshore-city": 9,
  "sea-route-223": 9,

  // --- Stage 10: Victory Road & Elite Four ---
  "pokemon-league": 10,
  "victory-road": 10,

  // --- Stage 11: Fight/Survival Area (Post-Game Routes) ---
  "fight-area": 11,
  "survival-area": 11,
  "resort-area": 11,
  "route-224": 11,
  "route-225": 11,
  "sea-route-226": 11,
  "route-227": 11,
  "route-228": 11,
  "route-229": 11,
  "stark-mountain-heatran-chamber": 11,
  "turnback-cave-after-pillar": 11,
  "turnback-cave-before-pillar": 11,
  "turnback-cave-between-pillars-1-and": 11,
  "turnback-cave-between-pillars-2-and": 11,
  "turnback-cave-pillar": 11,
  "sendoff-spring": 11,

  // --- Stage 12: Post-Game & Legendary Locations ---
  "mt-coronet-1f-route-211": 12,
  "mt-coronet-1f-route-216": 12,
  "mt-coronet-4f-small-room": 12,
  "mt-coronet-exterior-blizzard": 12,
  "mt-coronet-exterior-snowfall": 12,
  "spear-pillar": 12,
  "distortion-world": 12,
  "hall-of-origin": 12,
  "newmoon-island": 12,
  "sinnoh-ruins": 12,
  "roaming-sinnoh": 12
};

export default LOCATION_STAGE;