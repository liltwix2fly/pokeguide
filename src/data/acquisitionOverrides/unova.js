// Scoped to Black/White specifically. Black 2/White 2 rearranges Unova's
// geography enough (Aspertia City, Virbank City, Humilau City, a
// different gym order) that it needs its own stage map, same category of
// problem as FireRed/LeafGreen vs. original Red/Blue — not something that
// can share this file accurately. Treat B2/W2 as a future addition.

const unovaOverrides = {
  snivy: { category: "starter", detail: "Chosen as your starter from Professor Juniper in Nuvema Town.", stage: 0 },
  tepig: { category: "starter", detail: "Chosen as your starter from Professor Juniper in Nuvema Town.", stage: 0 },
  oshawott: { category: "starter", detail: "Chosen as your starter from Professor Juniper in Nuvema Town.", stage: 0 },

  // Karrablast/Shelmet's mutual-trade requirement gets a specific note
  // from evolutionChain.js's trade_species handling automatically, so no
  // override needed for the evolved forms — only the base wild forms are
  // plain "wild" entries with nothing special to say here.

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