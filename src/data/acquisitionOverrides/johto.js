// Compare this file's size to kanto.js's — that difference IS the pitch
// for this architecture. Most of Johto's 100 species need zero entries
// here at all, since "wild encounter" is derived automatically from the
// API's encounter data + the stage map. Only the genuinely special cases
// (starters, breeding-only babies, gifts, legendaries) need hand-written
// text, because those are the only things the API has no concept of.

const johtoOverrides = {
  chikorita: { category: "starter", detail: "Chosen as your starter from Professor Elm in New Bark Town.", stage: 0 },
  cyndaquil: { category: "starter", detail: "Chosen as your starter from Professor Elm in New Bark Town.", stage: 0 },
  totodile: { category: "starter", detail: "Chosen as your starter from Professor Elm in New Bark Town.", stage: 0 },

  // Breeding-only babies — original G/S/C mechanic had no incense item
  // requirement (that was added in later generations' remakes).
  pichu: { category: "breed", detail: "Not caught wild — hatch an Egg by leaving a Pikachu at the Day Care on Route 34.", stage: 3 },
  cleffa: { category: "breed", detail: "Not caught wild — hatch an Egg by leaving a Clefairy at the Day Care on Route 34.", stage: 3 },
  igglybuff: { category: "breed", detail: "Not caught wild — hatch an Egg by leaving a Jigglypuff at the Day Care on Route 34.", stage: 3 },
  smoochum: { category: "breed", detail: "Not caught wild — hatch an Egg by leaving a Jynx at the Day Care on Route 34.", stage: 3 },
  elekid: { category: "breed", detail: "Not caught wild — hatch an Egg by leaving an Electabuzz at the Day Care on Route 34.", stage: 3 },
  magby: { category: "breed", detail: "Not caught wild — hatch an Egg by leaving a Magmar at the Day Care on Route 34.", stage: 3 },

  togepi: { category: "gift", detail: "One-time gift: an Egg from Mr. Pokémon near New Bark Town, hatches after your first badge.", stage: 0 },
  tyrogue: { category: "gift", detail: "One-time gift from the Karate Master's family inside Mt. Mortar.", stage: 8 },

  raikou: { category: "legendary", detail: "One of three roaming legendary beasts released from the Burned Tower — wanders Johto's routes at random once freed.", stage: 6 },
  entei: { category: "legendary", detail: "One of three roaming legendary beasts released from the Burned Tower — wanders Johto's routes at random once freed.", stage: 6 },
  suicune: { category: "legendary", detail: "One of three roaming legendary beasts released from the Burned Tower — wanders Johto's routes at random once freed.", stage: 6 },
  lugia: { category: "legendary", detail: "One-time legendary encounter deep in the Whirl Islands, reached with the Silver Wing — a late-game quest.", stage: 12 },
  "ho-oh": { category: "legendary", detail: "One-time legendary encounter atop the Tin Tower, reached with the Rainbow Wing — a late-game quest.", stage: 12 },
  celebi: { category: "legendary", detail: "Not obtainable through normal gameplay — historically available only through special events.", stage: 12 },
};

export default johtoOverrides;