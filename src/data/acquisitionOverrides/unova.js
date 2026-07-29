const unovaOverrides = {
  snivy: { 
    category: "starter", 
    detail: "Chosen as your starter from Professor Juniper in Nuvema Town.", 
    stage: 0,
    versions: {
      black2: { detail: "Chosen as your starter from Bianca in Aspertia City." },
      white2: { detail: "Chosen as your starter from Bianca in Aspertia City." }
    }
  },
  tepig: { 
    category: "starter", 
    detail: "Chosen as your starter from Professor Juniper in Nuvema Town.", 
    stage: 0,
    versions: {
      black2: { detail: "Chosen as your starter from Bianca in Aspertia City." },
      white2: { detail: "Chosen as your starter from Bianca in Aspertia City." }
    }
  },
  oshawott: { 
    category: "starter", 
    detail: "Chosen as your starter from Professor Juniper in Nuvema Town.", 
    stage: 0,
    versions: {
      black2: { detail: "Chosen as your starter from Bianca in Aspertia City." },
      white2: { detail: "Chosen as your starter from Bianca in Aspertia City." }
    }
  },

  // Fossils
  tirtouga: { category: "fossil", detail: "Revived from a Cover Fossil at the Nacrene City Museum.", stage: 4 },
  archen: { category: "fossil", detail: "Revived from a Plume Fossil at the Nacrene City Museum.", stage: 4 },

  // Special Gifts & Rare Base Forms
  larvitar: { category: "wild", detail: "Found in the wild in Artisan Cave or Hidden Grottoes.", stage: 8 },
  deino: { category: "wild", detail: "Found in the wild in Victory Road.", stage: 8 },
  larvesta: { category: "gift", detail: "Received as an egg from a worker on Route 18.", stage: 7 },
  beldum: { category: "gift", detail: "Received as a gift from Steven Stone in Driftveil City after defeating him.", stage: 6 },
  zoroark: { category: "gift", detail: "Received as a gift in the Freezing Village.", stage: 7 },

  reshiram: { category: "legendary", detail: "Box legendary encountered at N's Castle (White) or Dragonspiral Tower, during the climactic story battle with N.", stage: 11, versions: { black: { category: "legendary", detail: "Obtainable in Black by trading with a White player, or via a separate late-game story encounter depending on version.", stage: 11 } } },
  zekrom: { category: "legendary", detail: "Box legendary encountered at N's Castle (Black) or Dragonspiral Tower, during the climactic story battle with N.", stage: 11, versions: { white: { category: "legendary", detail: "Obtainable in White by trading with a Black player, or via a separate late-game story encounter depending on version.", stage: 11 } } },
  kyurem: { category: "legendary", detail: "Static legendary encounter in the Giant Chasm — post-game.", stage: 12 },

  cobalion: { category: "legendary", detail: "Static legendary encounter in the Guidance Chamber, inside Mistralton Cave — post-game.", stage: 12 },
  terrakion: { category: "legendary", detail: "Static legendary encounter at the Rumination Field, near Victory Road — post-game.", stage: 12 },
  virizion: { category: "legendary", detail: "Roams Unova after first being encountered at the Pinwheel Forest's Relic area — post-game.", stage: 12 },

  tornadus: { category: "legendary", detail: "Roams Unova's skies after the Elite Four — post-game.", stage: 12 },
  thundurus: { category: "legendary", detail: "Roams Unova's skies after the Elite Four — post-game.", stage: 12 },
  landorus: { category: "legendary", detail: "Encountered at the Abundant Shrine — requires having caught both Tornadus and Thundurus first.", stage: 12 },

  victini: { category: "legendary", detail: "Not obtainable through normal gameplay — historically required the Liberty Pass event item to reach Liberty Garden.", stage: 12 },
  keldeo: { category: "legendary", detail: "Not obtainable through normal gameplay — historically required a special event distribution.", stage: 12 },
  meloetta: { category: "legendary", detail: "Not obtainable through normal gameplay — historically available only through special events.", stage: 12 },
  genesect: { category: "legendary", detail: "Not obtainable through normal gameplay — historically available only through special events.", stage: 12 },
};

export default unovaOverrides;