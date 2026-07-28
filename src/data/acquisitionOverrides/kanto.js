// Species in Kanto (Red/Blue/Yellow/FireRed/LeafGreen) whose root acquisition
// isn't "wild encounter" and isn't inferable from the API. Anything NOT
// listed here defaults to category "wild" if it has encounter data, or gets
// flagged for review if it has neither encounter data nor an override.
//
// `category` is optional for legendary/mythical species — if omitted,
// partyPlanner falls back to the species.is_legendary / is_mythical flags.
// It's still required here when the auto-detected category would be wrong
// (e.g. Farfetch'd isn't legendary, it's trade-only) or when the detail
// text needs a specific category label attached to it.
//
// NOTE: FireRed/LeafGreen redesigned several Kanto locations and added the
// Sevii Islands post-game area. Where a detail differs between the original
// R/B/Y games and the FR/LG remake, use `versions: { fireredleafgreen: {...} }`
// to override just that game pair. This file's base entries reflect
// R/B/Y; FR/LG overrides below are best-effort and worth spot-checking
// once this is wired up and testable against the live API.

const kantoOverrides = {
  bulbasaur: { category: "starter", detail: "Chosen as your starter from Professor Oak in Pallet Town.", stage: 0 },
  charmander: { category: "starter", detail: "Chosen as your starter from Professor Oak in Pallet Town.", stage: 0 },
  squirtle: { category: "starter", detail: "Chosen as your starter from Professor Oak in Pallet Town.", stage: 0 },

  pikachu: {
    category: "wild",
    detail: "Rare in Viridian Forest.",
    // stage omitted: derived from location_area_encounters like any wild mon
    versions: {
      yellow: { category: "starter", detail: "Given directly by Professor Oak as your starter in Pallet Town.", stage: 0 },
    },
  },

  eevee: {
    category: "gift",
    detail: "One-time gift inside a mansion on Route 25, near Cerulean City.",
    stage: 3,
    versions: {
      fireredleafgreen: { category: "gift", detail: "One-time gift from a Celadon Mansion resident in Celadon City.", stage: 5 },
    },
  },
  lapras: { category: "gift", detail: "One-time gift from a scientist inside the Silph Co. building in Saffron City.", stage: 8 },
  porygon: { category: "gift", detail: "Purchased with coins won at the Celadon City Game Corner.", stage: 5 },
  omanyte: { category: "fossil", detail: "Revive the Helix Fossil at the lab on Cinnabar Island (a choice between this and the Dome Fossil).", stage: 9 },
  kabuto: { category: "fossil", detail: "Revive the Dome Fossil at the lab on Cinnabar Island (a choice between this and the Helix Fossil).", stage: 9 },
  aerodactyl: { category: "fossil", detail: "Revive the Old Amber found in Mt. Moon at the lab on Cinnabar Island.", stage: 9 },
  "hitmonlee": { category: "gift", detail: "One-time gift from the Fighting Dojo in Saffron City (a choice between this and Hitmonchan).", stage: 8 },
  "hitmonchan": { category: "gift", detail: "One-time gift from the Fighting Dojo in Saffron City (a choice between this and Hitmonlee).", stage: 8 },
  "farfetchd": { category: "trade-only", detail: "Only obtainable through an in-game trade in Vermilion City (offer up a Spearow).", stage: 3 },
  "mr-mime": { category: "trade-only", detail: "Only obtainable through an in-game trade (offer up a Jynx).", stage: 10 },

  snorlax: { category: "legendary", detail: "One-time encounter blocking the road on Route 12 (and Route 16) — use the Poké Flute to wake it.", stage: 6 },
  articuno: { category: "legendary", detail: "One-time legendary encounter deep inside the Seafoam Islands.", stage: 9 },
  zapdos: { category: "legendary", detail: "One-time legendary encounter inside the Power Plant.", stage: 7 },
  moltres: { category: "legendary", detail: "One-time legendary encounter — exact chamber varies; check a full walkthrough for your version.", stage: 9 },
  mewtwo: { category: "legendary", detail: "One-time legendary encounter deep inside Cerulean Cave — only accessible after becoming Champion.", stage: 12 },
  mew: { category: "legendary", detail: "Not obtainable through normal gameplay — historically available only through special events.", stage: 12 },
};

export default kantoOverrides;