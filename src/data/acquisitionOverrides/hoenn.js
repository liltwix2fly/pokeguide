// Same shape as kanto.js/johto.js: only the species whose acquisition
// the API can't derive on its own. Everything else in Hoenn's 135 new
// species is a plain wild encounter, handled automatically.

const hoennOverrides = {
  treecko: { category: "starter", detail: "Chosen as your starter from Professor Birch's bag on Route 101.", stage: 0 },
  torchic: { category: "starter", detail: "Chosen as your starter from Professor Birch's bag on Route 101.", stage: 0 },
  mudkip: { category: "starter", detail: "Chosen as your starter from Professor Birch's bag on Route 101.", stage: 0 },

  // Root vs Claw Fossil: one-time choice from Mr. Stone at Devon Corp in
  // Rustboro, after recovering the stolen Devon Goods from Rusturf Tunnel.
  lileep: { category: "fossil", detail: "Choice of fossil from Mr. Stone at Devon Corp in Rustboro City, after retrieving the Devon Goods from Rusturf Tunnel (a choice between this and Anorith).", stage: 1 },
  anorith: { category: "fossil", detail: "Choice of fossil from Mr. Stone at Devon Corp in Rustboro City, after retrieving the Devon Goods from Rusturf Tunnel (a choice between this and Lileep).", stage: 1 },

  beldum: { category: "gift", detail: "One-time gift from Steven Stone, after helping with the Mossdeep Space Center.", stage: 10 },
  castform: { category: "gift", detail: "One-time gift from the scientists at the Weather Institute on Route 119, after Team Aqua/Magma's takeover is resolved.", stage: 9 },

  azurill: { category: "breed", detail: "Not caught wild in the original games — hatch an Egg by leaving a Marill at the Day Care.", stage: 3 },
  wynaut: { category: "breed", detail: "Not caught wild in the original games — hatch an Egg by leaving a Wobbuffet at the Day Care.", stage: 3 },

  regirock: { category: "legendary", detail: "Static legendary encounter in the Desert Ruins — requires solving a Braille puzzle to unlock the chamber.", stage: 13 },
  regice: { category: "legendary", detail: "Static legendary encounter in the Island Cave — requires solving a Braille puzzle to unlock the chamber.", stage: 13 },
  registeel: { category: "legendary", detail: "Static legendary encounter in the Ancient Tomb — requires solving a Braille puzzle to unlock the chamber.", stage: 13 },
  latias: { category: "legendary", detail: "Roaming legendary released partway through the story (version-dependent) — wanders Hoenn's routes at random once freed.", stage: 9 },
  latios: { category: "legendary", detail: "Roaming legendary released partway through the story (version-dependent) — wanders Hoenn's routes at random once freed.", stage: 9 },
  kyogre: { category: "legendary", detail: "Box legendary encountered at the story's climax in the Cave of Origin, Sootopolis City.", stage: 11 },
  groudon: { category: "legendary", detail: "Box legendary encountered at the story's climax in the Cave of Origin, Sootopolis City.", stage: 11 },
  rayquaza: {
    category: "legendary",
    detail: "One-time legendary encounter atop the Sky Pillar — accessible after becoming Champion in Ruby/Sapphire.",
    stage: 13,
    versions: {
      emerald: { category: "legendary", detail: "Encountered mid-story atop the Sky Pillar to stop the Kyogre/Groudon clash — earlier than in Ruby/Sapphire.", stage: 11 },
    },
  },
  jirachi: { category: "legendary", detail: "Not obtainable through normal gameplay — historically available only through special events.", stage: 13 },
  deoxys: { category: "legendary", detail: "Not obtainable through normal gameplay without a special event item (Aurora Ticket) to reach Birth Island.", stage: 13 },

  // Confirmed Ruby/Sapphire version exclusives among Hoenn's new species.
  zangoose: { category: "wild", detail: "Found in the grass on Route 114.", stage: 5, versions: { sapphire: { category: "trade-only", detail: "Not wild in Sapphire — trade with a Ruby player, or use the in-game trade if available.", stage: 5 } } },
  seviper: { category: "wild", detail: "Found in the grass on Route 114.", stage: 5, versions: { ruby: { category: "trade-only", detail: "Not wild in Ruby — trade with a Sapphire player, or use the in-game trade if available.", stage: 5 } } },
  solrock: { category: "wild", detail: "Found in Meteor Falls and on Route 113 (Ruby).", stage: 5, versions: { sapphire: { category: "trade-only", detail: "Not wild in Sapphire — trade with a Ruby player.", stage: 5 } } },
  lunatone: { category: "wild", detail: "Found in Meteor Falls and on Route 113 (Sapphire).", stage: 5, versions: { ruby: { category: "trade-only", detail: "Not wild in Ruby — trade with a Sapphire player.", stage: 5 } } },
  volbeat: { category: "wild", detail: "Found in the grass on Route 117 (Ruby).", stage: 6, versions: { sapphire: { category: "trade-only", detail: "Not wild in Sapphire — trade with a Ruby player.", stage: 6 } } },
  illumise: { category: "wild", detail: "Found in the grass on Route 117 (Sapphire).", stage: 6, versions: { ruby: { category: "trade-only", detail: "Not wild in Ruby — trade with a Sapphire player.", stage: 6 } } },
};

export default hoennOverrides;