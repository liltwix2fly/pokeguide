export const STAGES_UNOVA = [
  { id: 0, label: "Nuvema Town", note: "Starting out" },
  { id: 1, label: "Striaton City", note: "Cilan/Chili/Cress (Gym 1)" },
  { id: 2, label: "Nacrene City", note: "Lenora · Normal (Gym 2)" },
  { id: 3, label: "Castelia City", note: "Burgh · Bug (Gym 3)" },
  { id: 4, label: "Nimbasa City", note: "Elesa · Electric (Gym 4)" },
  { id: 5, label: "Driftveil City", note: "Clay · Ground (Gym 5)" },
  { id: 6, label: "Mistralton City", note: "Skyla · Flying (Gym 6)" },
  { id: 7, label: "Icirrus City", note: "Brycen · Ice (Gym 7)" },
  { id: 8, label: "Moor of Icirrus", note: "En route to Opelucid" },
  { id: 9, label: "Opelucid City", note: "Drayden/Iris · Dragon (Gym 8)" },
  { id: 10, label: "Victory Road", note: "Elite Four & Champion" },
  { id: 11, label: "N's Castle", note: "Story climax" },
  { id: 12, label: "Post-Game", note: "Giant Chasm & beyond" },
];

// Same caveat as the other stage maps: slugs follow PokeAPI's naming
// convention but aren't verified against a live response in this sandbox.
const LOCATION_STAGE = {
  "route-1-unova-area": 0,
  "accumula-town-area": 0,

  "route-2-unova-area": 1,
  "striaton-city-area": 1,
  "dreamyard-area": 1,

  "route-3-unova-area": 2,
  "wellspring-cave-area": 2,
  "nacrene-city-area": 2,
  "pinwheel-forest-area": 2,

  "route-4-unova-area": 3,
  "skyarrow-bridge-area": 3,
  "castelia-city-area": 3,
  "desert-resort-area": 3,
  "relic-castle-1f": 3,

  "route-16-area": 4,
  "nimbasa-city-area": 4,

  "route-5-unova-area": 5,
  "driftveil-city-area": 5,
  "cold-storage-area": 5,

  "route-6-unova-area": 6,
  "chargestone-cave-area": 6,
  "mistralton-city-area": 6,
  "celestial-tower-area": 6,

  "route-7-unova-area": 7,
  "twist-mountain-area": 7,
  "icirrus-city-area": 7,

  "moor-of-icirrus-area": 8,
  "route-8-unova-area": 8,
  "tubeline-bridge-area": 8,

  "route-9-unova-area": 9,
  "opelucid-city-area": 9,

  "route-10-unova-area": 10,
  "victory-road-unova-1f": 10,

  "n-s-castle-area": 11,
  "dragonspiral-tower-area": 11,

  "giant-chasm-area": 12,
  "abundant-shrine-area": 12,
  "mistralton-cave-area": 12,
  "route-11-area": 12,
  "route-12-area": 12,
  "route-13-area": 12,
  "route-14-area": 12,
  "route-15-area": 12,
  "route-17-area": 12,
  "route-18-area": 12,
  "undella-town-area": 12,
  "lacunosa-town-area": 12,
  "humilau-city-area": 12,
  "liberty-garden-area": 12,
};

export default LOCATION_STAGE;