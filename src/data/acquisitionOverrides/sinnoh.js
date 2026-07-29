// Same shape as kanto/johto/hoenn.js. Turtwig is deliberately its own
// "starter" entry here, not folded into "gift" — this is the exact bug
// you flagged from that other UI reference (it showed Starly before
// Turtwig because it classified starters as gifts).

const sinnohOverrides = {
  turtwig: { category: "starter", detail: "Chosen as your starter from Professor Rowan's briefcase near Route 201.", stage: 0 },
  chimchar: { category: "starter", detail: "Chosen as your starter from Professor Rowan's briefcase near Route 201.", stage: 0 },
  piplup: { category: "starter", detail: "Chosen as your starter from Professor Rowan's briefcase near Route 201.", stage: 0 },

  rotom: { category: "legendary", detail: "Unique wild encounter inside the Old Chateau, in Eterna Forest.", stage: 2 },

  // Lake guardian trio — technically encounterable early but flee
  // immediately; only properly catchable once Team Galactic's plot
  // advances (post-Spear Pillar in Diamond/Pearl, paced differently in
  // Platinum). Stage reflects "realistically catchable," not "first seen."
  uxie: { category: "legendary", detail: "Static legendary encounter at Lake Acuity, once it stops fleeing after the Team Galactic story event.", stage: 9 },
  mesprit: { category: "legendary", detail: "Roams Sinnoh after the Team Galactic story event triggers it at Lake Verity.", stage: 9 },
  azelf: { category: "legendary", detail: "Static legendary encounter at Lake Valor, once it stops fleeing after the Team Galactic story event.", stage: 9 },

  dialga: { category: "legendary", detail: "Box legendary encountered at Spear Pillar, atop Mt. Coronet.", stage: 10 },
  palkia: { category: "legendary", detail: "Box legendary encountered at Spear Pillar, atop Mt. Coronet.", stage: 10 },
  giratina: {
    category: "legendary",
    detail: "Encountered in the Distortion World, reached via Turnback Cave near Lake Valor — post-Elite Four in Diamond/Pearl.",
    stage: 12,
    versions: {
      platinum: { category: "legendary", detail: "Platinum's box legendary — encountered in the Distortion World as part of the main story, earlier than in Diamond/Pearl.", stage: 10 },
    },
  },
  heatran: { category: "legendary", detail: "Static legendary encounter deep inside Stark Mountain, past Route 227.", stage: 12 },
  cresselia: { category: "legendary", detail: "Roams Sinnoh after being encountered on Fullmoon Island.", stage: 9 },
  darkrai: {
    category: "legendary",
    detail: "Not obtainable through normal gameplay in Diamond/Pearl without the Member's Card distribution item to access Newmoon Island.",
    stage: 12,
    versions: {
      platinum: { category: "legendary", detail: "Directly accessible on Newmoon Island in Platinum, no event item required.", stage: 12 },
    },
  },
  regigigas: { category: "legendary", detail: "Static legendary encounter in Snowpoint Temple — requires having Regirock, Regice, and Registeel already in your party (transferred from a Gen III game via Pal Park).", stage: 12 },
  shaymin: { category: "legendary", detail: "Not obtainable through normal gameplay — historically required a special event item (Oak's Letter) to reach the Flower Paradise.", stage: 12 },
  arceus: { category: "legendary", detail: "Not obtainable through normal gameplay — requires the Azure Flute, never officially distributed in-game.", stage: 12 },
  manaphy: { category: "legendary", detail: "Not obtainable directly — the Manaphy Egg came from a Pokémon Ranger crossover event, then hatches in-game.", stage: 12 },
  phione: { category: "breed", detail: "Not caught wild — hatch an Egg by breeding a Manaphy at the Day Care (Manaphy itself is an event-only Pokémon).", stage: 12 },

  // Confirmed Diamond/Pearl version exclusives among Sinnoh's new species.
  glameow: { category: "wild", detail: "Found in the grass on Route 208 (Diamond).", stage: 3, versions: { pearl: { category: "trade-only", detail: "Not wild in Pearl — trade with a Diamond player.", stage: 3 } } },
  stunky: { category: "wild", detail: "Found in the grass on Route 214 (Pearl).", stage: 5, versions: { diamond: { category: "trade-only", detail: "Not wild in Diamond — trade with a Pearl player.", stage: 5 } } },
};

export default sinnohOverrides;