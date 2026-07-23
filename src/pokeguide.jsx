//importing react packages and our css file
import React, { useState, useMemo, useCallback } from "react";
import "./pokeguide.css";

//directly implementing icons through svg --> ran into lotta issues w using lucide

function IconBase({ size = 16, color, strokeWidth = 2, className, children }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

const Search = (p) => (
  <IconBase {...p}>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.2" y2="16.2" />
  </IconBase>
);
const Sun = (p) => (
  <IconBase {...p}>
    <circle cx="12" cy="12" r="4.5" />
    <line x1="12" y1="1.5" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="22.5" />
    <line x1="4" y1="4" x2="5.8" y2="5.8" />
    <line x1="18.2" y1="18.2" x2="20" y2="20" />
    <line x1="1.5" y1="12" x2="4" y2="12" />
    <line x1="20" y1="12" x2="22.5" y2="12" />
    <line x1="4" y1="20" x2="5.8" y2="18.2" />
    <line x1="18.2" y1="5.8" x2="20" y2="4" />
  </IconBase>
);
const Moon = (p) => (
  <IconBase {...p}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </IconBase>
);
const ArrowLeft = (p) => (
  <IconBase {...p}>
    <line x1="20" y1="12" x2="4" y2="12" />
    <polyline points="10,6 4,12 10,18" />
  </IconBase>
);
const ArrowRight = (p) => (
  <IconBase {...p}>
    <line x1="4" y1="12" x2="20" y2="12" />
    <polyline points="14,6 20,12 14,18" />
  </IconBase>
);
const Check = (p) => (
  <IconBase {...p}>
    <polyline points="20,6 9,17 4,12" />
  </IconBase>
);
const MapPin = (p) => (
  <IconBase {...p}>
    <path d="M12 22s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12z" />
    <circle cx="12" cy="10" r="2.4" />
  </IconBase>
);
const Sparkles = (p) => (
  <IconBase {...p}>
    <path d="M11 2l1.6 4.7L17 8l-4.4 1.6L11 14l-1.6-4.4L5 8l4.4-1.3z" />
    <path d="M19 14l0.8 2.3L22 17l-2.2 0.8L19 20l-0.8-2.2L16 17l2.2-0.7z" />
  </IconBase>
);
const RotateCcw = (p) => (
  <IconBase {...p}>
    <path d="M3 12a9 9 0 1 0 3-6.7" />
    <polyline points="3,3 3,7.5 7.5,7.5" />
  </IconBase>
);
const Gamepad2 = (p) => (
  <IconBase {...p}>
    <rect x="2" y="7" width="20" height="11" rx="4" />
    <line x1="7" y1="10.5" x2="7" y2="14.5" />
    <line x1="5" y1="12.5" x2="9" y2="12.5" />
    <circle cx="15" cy="11.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="18" cy="14" r="1" fill="currentColor" stroke="none" />
  </IconBase>
);
const ChevronRight = (p) => (
  <IconBase {...p}>
    <polyline points="9,5 16,12 9,19" />
  </IconBase>
);
const Info = (p) => (
  <IconBase {...p}>
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="11" x2="12" y2="16.5" />
    <circle cx="12" cy="7.5" r="0.9" fill="currentColor" stroke="none" />
  </IconBase>
);


//static data with colors, abbreviations, game names, etc.

const TYPE_COLORS = {
  normal: "#A7A67C", fire: "#EE8130", water: "#6493EE", electric: "#F4D23C",
  grass: "#6BC259", ice: "#8FD5D8", fighting: "#C2402F", poison: "#A2439B",
  ground: "#D9BE6C", flying: "#9C90ED", psychic: "#F65C88", bug: "#A2B62A",
  rock: "#B8A038", ghost: "#6C5A96", dragon: "#6E43F0", dark: "#6F5D50",
  steel: "#B8B8CE", fairy: "#EE97E1",
};

const TYPE_ABBR = {
  normal: "NRM", fire: "FIR", water: "WTR", electric: "ELC", grass: "GRS",
  ice: "ICE", fighting: "FGT", poison: "PSN", ground: "GRD", flying: "FLY",
  psychic: "PSY", bug: "BUG", rock: "RCK", ghost: "GHO", dragon: "DRG",
  dark: "DRK", steel: "STL", fairy: "FAI",
};

const GAMES = [
  { id: "red", label: "Red" },
  { id: "blue", label: "Blue" },
  { id: "yellow", label: "Yellow" },
];

const UPCOMING_GENS = [
  { roman: "II", region: "Johto" }, { roman: "III", region: "Hoenn" },
  { roman: "IV", region: "Sinnoh" }, { roman: "V", region: "Unova" },
  { roman: "VI", region: "Kalos" }, { roman: "VII", region: "Alola" },
  { roman: "VIII", region: "Galar" }, { roman: "IX", region: "Paldea" },
];

const MAX_TEAM = 6;

//Changed system to determine ordering through an arbitrary stage system, need to 

const STAGES = [
  { id: 0, label: "Pallet Town", note: "Starting out" },
  { id: 1, label: "Pewter City", note: "Brock · Rock (Gym 1)" },
  { id: 2, label: "Cerulean City", note: "Misty · Water (Gym 2)" },
  { id: 3, label: "Vermilion City", note: "Lt. Surge · Electric (Gym 3)" },
  { id: 4, label: "Rock Tunnel", note: "En route to Lavender Town" },
  { id: 5, label: "Celadon City", note: "Erika · Grass (Gym 4)" },
  { id: 6, label: "Pokémon Tower", note: "Poké Flute obtained" },
  { id: 7, label: "Fuchsia City", note: "Koga · Poison (Gym 5)" },
  { id: 8, label: "Saffron City", note: "Sabrina · Psychic (Gym 6)" },
  { id: 9, label: "Cinnabar Island", note: "Blaine · Fire (Gym 7)" },
  { id: 10, label: "Viridian City", note: "Giovanni · Ground (Gym 8)" },
  { id: 11, label: "Victory Road", note: "Elite Four & Champion" },
  { id: 12, label: "Post-Game", note: "Cerulean Cave & beyond" },
];

const P = (id, name, types, category, detail, evolvesFrom, exclusiveTo, stage) => ({
  id, name, types, category, detail, evolvesFrom: evolvesFrom || null, exclusiveTo: exclusiveTo || null, stage,
});

const POKEDEX_GEN1 = [
  P(1, "Bulbasaur", ["grass", "poison"], "starter", "Chosen as your starter from Professor Oak in Pallet Town.", null, null, 0),
  P(2, "Ivysaur", ["grass", "poison"], "evolve", "Evolves from Bulbasaur at level 16.", "Bulbasaur", null, 0),
  P(3, "Venusaur", ["grass", "poison"], "evolve", "Evolves from Ivysaur at level 32.", "Ivysaur", null, 0),
  P(4, "Charmander", ["fire"], "starter", "Chosen as your starter from Professor Oak in Pallet Town.", null, null, 0),
  P(5, "Charmeleon", ["fire"], "evolve", "Evolves from Charmander at level 16.", "Charmander", null, 0),
  P(6, "Charizard", ["fire", "flying"], "evolve", "Evolves from Charmeleon at level 36.", "Charmeleon", null, 0),
  P(7, "Squirtle", ["water"], "starter", "Chosen as your starter from Professor Oak in Pallet Town.", null, null, 0),
  P(8, "Wartortle", ["water"], "evolve", "Evolves from Squirtle at level 16.", "Squirtle", null, 0),
  P(9, "Blastoise", ["water"], "evolve", "Evolves from Wartortle at level 36.", "Wartortle", null, 0),
  P(10, "Caterpie", ["bug"], "wild", "Common in Viridian Forest and the grass on Route 2 and Route 24.", null, null, 1),
  P(11, "Metapod", ["bug"], "evolve", "Evolves from Caterpie at level 7 (occasionally found wild too).", "Caterpie", null, 1),
  P(12, "Butterfree", ["bug", "flying"], "evolve", "Evolves from Metapod at level 10.", "Metapod", null, 1),
  P(13, "Weedle", ["bug", "poison"], "wild", "Common in Viridian Forest and the grass on Routes 24-25.", null, null, 1),
  P(14, "Kakuna", ["bug", "poison"], "evolve", "Evolves from Weedle at level 7 (occasionally found wild too).", "Weedle", null, 1),
  P(15, "Beedrill", ["bug", "poison"], "evolve", "Evolves from Kakuna at level 10.", "Kakuna", null, 1),
  P(16, "Pidgey", ["normal", "flying"], "wild", "Extremely common on almost every early grass route, starting with Route 1.", null, null, 0),
  P(17, "Pidgeotto", ["normal", "flying"], "evolve", "Evolves from Pidgey at level 18 (occasionally found wild).", "Pidgey", null, 0),
  P(18, "Pidgeot", ["normal", "flying"], "evolve", "Evolves from Pidgeotto at level 36.", "Pidgeotto", null, 0),
  P(19, "Rattata", ["normal"], "wild", "Very common on Route 1 and most early grass routes.", null, null, 0),
  P(20, "Raticate", ["normal"], "evolve", "Evolves from Rattata at level 20.", "Rattata", null, 0),
  P(21, "Spearow", ["normal", "flying"], "wild", "Common around Route 9-10 and near Mt. Moon.", null, null, 2),
  P(22, "Fearow", ["normal", "flying"], "evolve", "Evolves from Spearow at level 20.", "Spearow", null, 2),
  P(23, "Ekans", ["poison"], "wild", "Found in the grass on Routes 22-23.", null, "red", 2),
  P(24, "Arbok", ["poison"], "evolve", "Evolves from Ekans at level 22.", "Ekans", null, 2),
  P(25, "Pikachu", ["electric"], "wild", "Rare in Viridian Forest. In Pokémon Yellow, you're given one directly by Professor Oak as your starter instead.", null, null, 1),
  P(26, "Raichu", ["electric"], "stone", "Evolves from Pikachu using a Thunder Stone.", "Pikachu", null, 1),
  P(27, "Sandshrew", ["ground"], "wild", "Found around Route 3-4 and Digletts Cave.", null, "blue", 2),
  P(28, "Sandslash", ["ground"], "evolve", "Evolves from Sandshrew at level 22.", "Sandshrew", null, 2),
  P(29, "Nidoran♀", ["poison"], "wild", "Common in the grass on Routes 3 through 5.", null, null, 2),
  P(30, "Nidorina", ["poison"], "evolve", "Evolves from Nidoran♀ at level 16.", "Nidoran♀", null, 2),
  P(31, "Nidoqueen", ["poison", "ground"], "stone", "Evolves from Nidorina using a Moon Stone.", "Nidorina", null, 2),
  P(32, "Nidoran♂", ["poison"], "wild", "Common in the grass on Routes 3 through 5.", null, null, 2),
  P(33, "Nidorino", ["poison"], "evolve", "Evolves from Nidoran♂ at level 16.", "Nidoran♂", null, 2),
  P(34, "Nidoking", ["poison", "ground"], "stone", "Evolves from Nidorino using a Moon Stone.", "Nidorino", null, 2),
  P(35, "Clefairy", ["normal"], "wild", "Found in the caves of Mt. Moon.", null, null, 2),
  P(36, "Clefable", ["normal"], "stone", "Evolves from Clefairy using a Moon Stone.", "Clefairy", null, 2),
  P(37, "Vulpix", ["fire"], "wild", "Found around Route 7-8, near Celadon City.", null, "blue", 5),
  P(38, "Ninetales", ["fire"], "stone", "Evolves from Vulpix using a Fire Stone.", "Vulpix", null, 5),
  P(39, "Jigglypuff", ["normal"], "wild", "Found in the grass around Route 3-4, near Mt. Moon.", null, null, 2),
  P(40, "Wigglytuff", ["normal"], "stone", "Evolves from Jigglypuff using a Moon Stone.", "Jigglypuff", null, 2),
  P(41, "Zubat", ["poison", "flying"], "wild", "Common throughout Mt. Moon and Rock Tunnel.", null, null, 2),
  P(42, "Golbat", ["poison", "flying"], "evolve", "Evolves from Zubat at level 22.", "Zubat", null, 2),
  P(43, "Oddish", ["grass", "poison"], "wild", "Found in the grass on Routes 5, 6, 24 and 25.", null, "red", 3),
  P(44, "Gloom", ["grass", "poison"], "evolve", "Evolves from Oddish at level 21.", "Oddish", null, 3),
  P(45, "Vileplume", ["grass", "poison"], "stone", "Evolves from Gloom using a Leaf Stone.", "Gloom", null, 3),
  P(46, "Paras", ["bug", "grass"], "wild", "Found in Mt. Moon and Digletts Cave.", null, null, 2),
  P(47, "Parasect", ["bug", "grass"], "evolve", "Evolves from Paras at level 24.", "Paras", null, 2),
  P(48, "Venonat", ["bug", "poison"], "wild", "Found in the grass on Routes 24-25 and in Digletts Cave.", null, null, 3),
  P(49, "Venomoth", ["bug", "poison"], "evolve", "Evolves from Venonat at level 31.", "Venonat", null, 3),
  P(50, "Diglett", ["ground"], "wild", "Found throughout Digletts Cave and on Route 2.", null, null, 1),
  P(51, "Dugtrio", ["ground"], "evolve", "Evolves from Diglett at level 26.", "Diglett", null, 1),
  P(52, "Meowth", ["normal"], "wild", "Found in the grass around Routes 24-25.", null, "blue", 3),
  P(53, "Persian", ["normal"], "evolve", "Evolves from Meowth at level 28.", "Meowth", null, 3),
  P(54, "Psyduck", ["water"], "wild", "Found near the water on Route 6, and by surfing.", null, null, 3),
  P(55, "Golduck", ["water"], "evolve", "Evolves from Psyduck at level 33.", "Psyduck", null, 3),
  P(56, "Mankey", ["fighting"], "wild", "Found in the grass around Route 22, near Victory Road.", null, "red", 1),
  P(57, "Primeape", ["fighting"], "evolve", "Evolves from Mankey at level 28.", "Mankey", null, 1),
  P(58, "Growlithe", ["fire"], "wild", "Found around Route 7-8, near Celadon City.", null, "red", 5),
  P(59, "Arcanine", ["fire"], "stone", "Evolves from Growlithe using a Fire Stone.", "Growlithe", null, 5),
  P(60, "Poliwag", ["water"], "wild", "Found near water on Routes 6 and 22, and by surfing.", null, null, 3),
  P(61, "Poliwhirl", ["water"], "evolve", "Evolves from Poliwag at level 25.", "Poliwag", null, 3),
  P(62, "Poliwrath", ["water", "fighting"], "stone", "Evolves from Poliwhirl using a Water Stone.", "Poliwhirl", null, 3),
  P(63, "Abra", ["psychic"], "wild", "Found on Routes 24-25. It teleports away almost immediately, so a paralyzing move or Sleep Powder helps.", null, null, 3),
  P(64, "Kadabra", ["psychic"], "evolve", "Evolves from Abra at level 16.", "Abra", null, 3),
  P(65, "Alakazam", ["psychic"], "trade", "Evolves from Kadabra by trading it to another player.", "Kadabra", null, 3),
  P(66, "Machop", ["fighting"], "wild", "Found in Rock Tunnel and on Victory Road.", null, null, 4),
  P(67, "Machoke", ["fighting"], "evolve", "Evolves from Machop at level 28.", "Machop", null, 4),
  P(68, "Machamp", ["fighting"], "trade", "Evolves from Machoke by trading it to another player.", "Machoke", null, 4),
  P(69, "Bellsprout", ["grass", "poison"], "wild", "Found in the grass on Routes 24-25.", null, "blue", 3),
  P(70, "Weepinbell", ["grass", "poison"], "evolve", "Evolves from Bellsprout at level 21.", "Bellsprout", null, 3),
  P(71, "Victreebel", ["grass", "poison"], "stone", "Evolves from Weepinbell using a Leaf Stone.", "Weepinbell", null, 3),
  P(72, "Tentacool", ["water", "poison"], "wild", "Found by surfing or fishing in most coastal water.", null, null, 5),
  P(73, "Tentacruel", ["water", "poison"], "evolve", "Evolves from Tentacool at level 30.", "Tentacool", null, 5),
  P(74, "Geodude", ["rock", "ground"], "wild", "Common in Mt. Moon, Rock Tunnel, and Victory Road.", null, null, 2),
  P(75, "Graveler", ["rock", "ground"], "evolve", "Evolves from Geodude at level 25.", "Geodude", null, 2),
  P(76, "Golem", ["rock", "ground"], "trade", "Evolves from Graveler by trading it to another player.", "Graveler", null, 2),
  P(77, "Ponyta", ["fire"], "wild", "Found in the grass on Route 17.", null, null, 7),
  P(78, "Rapidash", ["fire"], "evolve", "Evolves from Ponyta at level 40.", "Ponyta", null, 7),
  P(79, "Slowpoke", ["water", "psychic"], "wild", "Found near water around Route 6 and the Cerulean City area.", null, null, 2),
  P(80, "Slowbro", ["water", "psychic"], "evolve", "Evolves from Slowpoke at level 37.", "Slowpoke", null, 2),
  P(81, "Magnemite", ["electric"], "wild", "Found in Rock Tunnel and the Power Plant.", null, null, 6),
  P(82, "Magneton", ["electric"], "evolve", "Evolves from Magnemite at level 30.", "Magnemite", null, 6),
  P(83, "Farfetch'd", ["normal", "flying"], "trade-only", "Only obtainable through an in-game trade in Vermilion City (offer up a Spearow).", null, null, 3),
  P(84, "Doduo", ["normal", "flying"], "wild", "Found in the grass on Routes 16 through 18.", null, null, 6),
  P(85, "Dodrio", ["normal", "flying"], "evolve", "Evolves from Doduo at level 31.", "Doduo", null, 6),
  P(86, "Seel", ["water"], "wild", "Found in the Seafoam Islands.", null, null, 9),
  P(87, "Dewgong", ["water", "ice"], "evolve", "Evolves from Seel at level 34.", "Seel", null, 9),
  P(88, "Grimer", ["poison"], "wild", "Found around Route 11 and the Power Plant.", null, null, 6),
  P(89, "Muk", ["poison"], "evolve", "Evolves from Grimer at level 38.", "Grimer", null, 6),
  P(90, "Shellder", ["water"], "wild", "Found by fishing with a Good Rod in most coastal water, especially near Seafoam Islands.", null, null, 7),
  P(91, "Cloyster", ["water", "ice"], "stone", "Evolves from Shellder using a Water Stone.", "Shellder", null, 7),
  P(92, "Gastly", ["ghost", "poison"], "wild", "Found throughout Pokémon Tower in Lavender Town.", null, null, 6),
  P(93, "Haunter", ["ghost", "poison"], "evolve", "Evolves from Gastly at level 25.", "Gastly", null, 6),
  P(94, "Gengar", ["ghost", "poison"], "trade", "Evolves from Haunter by trading it to another player.", "Haunter", null, 6),
  P(95, "Onix", ["rock", "ground"], "wild", "Found in Rock Tunnel and on Victory Road.", null, null, 4),
  P(96, "Drowzee", ["psychic"], "wild", "Found around Routes 11-12, between Vermilion and Lavender Town.", null, null, 5),
  P(97, "Hypno", ["psychic"], "evolve", "Evolves from Drowzee at level 26.", "Drowzee", null, 5),
  P(98, "Krabby", ["water"], "wild", "Found near beaches and water on Routes 24-25 and around Seafoam Islands.", null, null, 3),
  P(99, "Kingler", ["water"], "evolve", "Evolves from Krabby at level 28.", "Krabby", null, 3),
  P(100, "Voltorb", ["electric"], "wild", "Found in the Power Plant.", null, null, 7),
  P(101, "Electrode", ["electric"], "evolve", "Evolves from Voltorb at level 30.", "Voltorb", null, 7),
  P(102, "Exeggcute", ["grass", "psychic"], "wild", "Found in the Safari Zone.", null, null, 7),
  P(103, "Exeggutor", ["grass", "psychic"], "stone", "Evolves from Exeggcute using a Leaf Stone.", "Exeggcute", null, 7),
  P(104, "Cubone", ["ground"], "wild", "Found in Pokémon Tower and Rock Tunnel.", null, null, 4),
  P(105, "Marowak", ["ground"], "evolve", "Evolves from Cubone at level 28.", "Cubone", null, 4),
  P(106, "Hitmonlee", ["fighting"], "gift", "One-time gift from the Fighting Dojo in Saffron City (a choice between this and Hitmonchan).", null, null, 8),
  P(107, "Hitmonchan", ["fighting"], "gift", "One-time gift from the Fighting Dojo in Saffron City (a choice between this and Hitmonlee).", null, null, 8),
  P(108, "Lickitung", ["normal"], "wild", "Found in the Safari Zone.", null, null, 7),
  P(109, "Koffing", ["poison"], "wild", "Found around the Team Rocket Hideout in Celadon City and Route 8-9.", null, null, 5),
  P(110, "Weezing", ["poison"], "evolve", "Evolves from Koffing at level 35.", "Koffing", null, 5),
  P(111, "Rhyhorn", ["ground", "rock"], "wild", "Found on Route 23 and in the Safari Zone.", null, null, 7),
  P(112, "Rhydon", ["ground", "rock"], "evolve", "Evolves from Rhyhorn at level 42.", "Rhyhorn", null, 7),
  P(113, "Chansey", ["normal"], "wild", "Rare find in the Safari Zone.", null, null, 7),
  P(114, "Tangela", ["grass"], "wild", "Found in the Safari Zone.", null, null, 7),
  P(115, "Kangaskhan", ["normal"], "wild", "Rare find in the Safari Zone.", null, null, 8),
  P(116, "Horsea", ["water"], "wild", "Found by fishing or surfing near Fuchsia City and Cinnabar Island.", null, null, 8),
  P(117, "Seadra", ["water"], "evolve", "Evolves from Horsea at level 32.", "Horsea", null, 8),
  P(118, "Goldeen", ["water"], "wild", "Found near water on Route 6, Route 22, and by fishing.", null, null, 3),
  P(119, "Seaking", ["water"], "evolve", "Evolves from Goldeen at level 33.", "Goldeen", null, 3),
  P(120, "Staryu", ["water"], "wild", "Found near water and by fishing along most coastal routes.", null, null, 3),
  P(121, "Starmie", ["water", "psychic"], "stone", "Evolves from Staryu using a Water Stone.", "Staryu", null, 3),
  P(122, "Mr. Mime", ["psychic"], "trade-only", "Only obtainable through an in-game trade (offer up a Jynx).", null, null, 10),
  P(123, "Scyther", ["bug", "flying"], "wild", "Rare find in the Safari Zone.", null, "red", 7),
  P(124, "Jynx", ["ice", "psychic"], "wild", "Rare find near Cinnabar Island and the Seafoam Islands.", null, null, 9),
  P(125, "Electabuzz", ["electric"], "wild", "Found in the Power Plant.", null, "red", 7),
  P(126, "Magmar", ["fire"], "wild", "Found in the Pokémon Mansion on Cinnabar Island.", null, "blue", 9),
  P(127, "Pinsir", ["bug"], "wild", "Rare find in the Safari Zone.", null, "blue", 7),
  P(128, "Tauros", ["normal"], "wild", "Rare find in the Safari Zone.", null, null, 7),
  P(129, "Magikarp", ["water"], "wild", "Fished up almost anywhere with an Old Rod, or bought from a vendor near Mt. Moon.", null, null, 2),
  P(130, "Gyarados", ["water", "flying"], "evolve", "Evolves from Magikarp at level 20.", "Magikarp", null, 2),
  P(131, "Lapras", ["water", "ice"], "gift", "One-time gift from a scientist inside the Silph Co. building in Saffron City.", null, null, 8),
  P(132, "Ditto", ["normal"], "wild", "Found on Routes 24-25 and in the Pokémon Mansion.", null, null, 8),
  P(133, "Eevee", ["normal"], "gift", "One-time gift inside a mansion on Route 25, near Cerulean City.", null, null, 7),
  P(134, "Vaporeon", ["water"], "stone", "Evolves from Eevee using a Water Stone.", "Eevee", null, 7),
  P(135, "Jolteon", ["electric"], "stone", "Evolves from Eevee using a Thunder Stone.", "Eevee", null, 7),
  P(136, "Flareon", ["fire"], "stone", "Evolves from Eevee using a Fire Stone.", "Eevee", null, 7),
  P(137, "Porygon", ["normal"], "gift", "Purchased with coins won at the Celadon City Game Corner.", null, null, 5),
  P(138, "Omanyte", ["rock", "water"], "fossil", "Revive the Helix Fossil at the lab on Cinnabar Island (a choice between this and the Dome Fossil).", null, null, 9),
  P(139, "Omastar", ["rock", "water"], "evolve", "Evolves from Omanyte at level 40.", "Omanyte", null, 9),
  P(140, "Kabuto", ["rock", "water"], "fossil", "Revive the Dome Fossil at the lab on Cinnabar Island (a choice between this and the Helix Fossil).", null, null, 9),
  P(141, "Kabutops", ["rock", "water"], "evolve", "Evolves from Kabuto at level 40.", "Kabuto", null, 9),
  P(142, "Aerodactyl", ["rock", "flying"], "fossil", "Revive the Old Amber found in Mt. Moon at the lab on Cinnabar Island.", null, null, 9),
  P(143, "Snorlax", ["normal"], "rare", "One-time encounter blocking the road on Route 12 (and Route 16) — use the Poké Flute to wake it.", null, null, 6),
  P(144, "Articuno", ["ice", "flying"], "legendary", "One-time legendary encounter deep inside the Seafoam Islands.", null, null, 8),
  P(145, "Zapdos", ["electric", "flying"], "legendary", "One-time legendary encounter inside the Power Plant.", null, null, 8),
  P(146, "Moltres", ["fire", "flying"], "legendary", "One-time legendary encounter, tucked in a hard-to-reach spot — worth checking a full walkthrough for the exact room.", null, null, 9),
  P(147, "Dratini", ["dragon"], "wild", "Found in the Safari Zone, or by fishing with a Super Rod.", null, null, 7),
  P(148, "Dragonair", ["dragon"], "evolve", "Evolves from Dratini at level 30.", "Dratini", null, 7),
  P(149, "Dragonite", ["dragon", "flying"], "evolve", "Evolves from Dragonair at level 55.", "Dragonair", null, 7),
  P(150, "Mewtwo", ["psychic"], "legendary", "One-time legendary encounter deep inside Cerulean Cave — only accessible after becoming Champion.", null, null, 12),
  P(151, "Mew", ["psychic"], "legendary", "Not obtainable through normal gameplay — historically available only through special events.", null, null, 12),
];

const CATEGORY_ORDER = {
  starter: 0, wild: 1, gift: 1, fossil: 1, "trade-only": 1,
  evolve: 2, stone: 2, trade: 2, rare: 3, legendary: 3,
};

const BY_NAME = Object.fromEntries(POKEDEX_GEN1.map((m) => [m.name, m]));

//gets data of entire pokemon evo

function getLineage(mon) {
  const chain = [];
  let current = mon;
  let guard = 0;
  while (current.evolvesFrom && guard < 5) {
    const prev = BY_NAME[current.evolvesFrom];
    if (!prev) break;
    chain.unshift(prev);
    current = prev;
    guard += 1;
  }
  return chain;
}

//handles sprite and type icon rendering

function officialArt(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
function defaultSprite(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

function PokemonSprite({ id, name, className }) {
  const [stage, setStage] = useState(0);
  if (stage >= 2) {
    return (
      <div className={`pg-sprite-fallback ${className || ""}`}>
        {name ? name.slice(0, 2).toUpperCase() : "?"}
      </div>
    );
  }
  return (
    <img
      src={stage === 0 ? officialArt(id) : defaultSprite(id)}
      alt={name}
      draggable={false}
      className={`pg-sprite-img ${className || ""}`}
      onError={() => setStage((s) => s + 1)}
    />
  );
}

function typeIconUrl(type) {
  return `https://raw.githubusercontent.com/msikma/pokeresources/master/resources/type-icons/gen8/${type}.svg`;
}

function TypeBadge({ type }) {
  const [failed, setFailed] = useState(false);
  const color = TYPE_COLORS[type] || "#888";

  if (failed) {
    return (
      <span className="pg-type-badge" style={{ background: color }}>
        <span className="pg-type-dot" />
        {TYPE_ABBR[type] || type.slice(0, 3).toUpperCase()}
      </span>
    );
  }

  return (
    <span className="pg-type-icon-wrap" title={titleCase(type)}>
      <img
        src={typeIconUrl(type)}
        alt={type}
        className="pg-type-icon"
        draggable={false}
        onError={() => setFailed(true)}
      />
    </span>
  );
}

function titleCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//home screen
 

//helper function to gen random number (later used to generate random pokemon cards)
const generateRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

//random pokemon generated per web refresh
const HERO_PREVIEW_IDS = [generateRandom(1,151), generateRandom(1,151), generateRandom(1,151), generateRandom(1,151), generateRandom(1,151)];
 
function HomeScreen({onStart}) {
  const [rotation, setRotation] = useState(0);
 
  //pokemon sample cards
  const previewCards = useMemo(() => {
    const n = HERO_PREVIEW_IDS.length;
    const half = Math.floor(n / 2);
    return HERO_PREVIEW_IDS.map((id, idx) => ({
      id,
      offset: ((idx - rotation + n) % n) - half,
    }));
  }, [rotation]);
 
  //left button functionality, allows us to shift between cards and move leftward, wraps around
  const onLeft = useCallback(() => {
    setRotation((r) => (r - 1 + HERO_PREVIEW_IDS.length) % HERO_PREVIEW_IDS.length);
  }, []);
 
  //right button functionality, allows us to shift between cards and move rightward, wraps around
  const onRight = useCallback(() => {
    setRotation((r) => (r + 1) % HERO_PREVIEW_IDS.length);
  }, []);
 
  return (
    <div className="pg-container pg-hero-wrap">
      <div className="pg-hero">
        <div className="pg-hero-copy">
          <div className="pg-eyebrow">
            <span className="pg-eyebrow-dot" />
            GEN I NOW · SUPPORT FOR GENS II-IX COMING SOON
          </div>
          <h1 className="pg-hero-title">
            The only database
            <br />
            you'll ever need.
          </h1>
          <p className="pg-hero-sub">
            Pick your game.
            <br/>
            Build your party.
            <br/>
            Find your Pokémon. 
          </p>
          <button className="pg-btn pg-btn-primary pg-btn-lg" onClick={onStart}>
            Get started
            <ArrowRight size={16} />
          </button>
 
          <div className="pg-stat-row">
            <div className="pg-stat">
              <div className="pg-stat-num">151</div>
              <div className="pg-stat-label">Pokémon mapped · Gen 1</div>
            </div>
            <div className="pg-stat-divider" />
            <div className="pg-stat">
              <div className="pg-stat-num">3</div>
              <div className="pg-stat-label">Versions supported</div>
            </div>
            <div className="pg-stat-divider" />
            <div className="pg-stat">
              <div className="pg-stat-num">6</div>
              <div className="pg-stat-label">Pokémon per party</div>
            </div>
          </div>
        </div>
 
        <div className="pg-hero-cards">
          {previewCards.map(({ id, offset }) => (
            <div
              key={id}
              className="pg-preview-card"
              style={{ transform: `rotate(${offset * 7}deg) translateX(${offset * 40}px)`, zIndex: HERO_PREVIEW_IDS.length - Math.abs(offset) }}
            >
                
              <div className="pg-preview-sprite">
                <button className="pg-back-link" onClick={onLeft}>
                <ArrowLeft size={10} />
                </button>
                <PokemonSprite id={id} name={id} />
                <button className="pg-back-link" onClick={onRight}>
                <ArrowRight size={10} />
                </button>
              </div>
              <div className="pg-preview-num">#{String(id).padStart(3, "0")}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

//game selection screen

function GameSelectScreen({ onSelect, onBack}) {
  return (
    <div className="pg-container pg-page">
      <div className="pg-page-head">
        <button className="pg-back-link" onClick={onBack}>
          <ArrowLeft size={14} /> Home
        </button>
        <div className="pg-eyebrow">STEP 01 / 03 — SELECT CARTRIDGE</div>
        <h1 className="pg-page-title">Which game are you playing?</h1>
        <p className="pg-page-sub">
          Pick your version: location, requirements, and methods adjust to your selection.
        </p>
      </div>

      <div className="pg-gen-block">
        <div className="pg-gen-head">
          <span className="pg-gen-tag">GEN I</span>
          <h2 className="pg-gen-title">Kanto</h2>
        </div>
        <div className="pg-game-row">
          {GAMES.map((game) => (
            <button key={game.id} className="pg-game-btn" onClick={() => onSelect(game)}>
              <Gamepad2 size={15} className="pg-accent-icon" />
              <span>{game.label}</span>
              <ChevronRight size={14} className="pg-game-btn-chevron" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="pg-upcoming-label">MORE REGIONS — COMING SOON</p>
        <div className="pg-upcoming-row">
          {UPCOMING_GENS.map((g) => (
            <div key={g.roman} className="pg-upcoming-chip">
              Gen {g.roman} · {g.region}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

//pokemon selection grid

function PokemonCard({mon, selected, onToggle, disabled}) {
  return (
    <button
      className={`pg-card ${selected ? "pg-card-selected" : ""} ${disabled && !selected ? "pg-card-disabled" : ""}`}
      onClick={() => onToggle(mon)}
      disabled={disabled && !selected}
    >
      {selected && (
        <span className="pg-card-check">
          <Check size={12} color="#fff" strokeWidth={3} />
        </span>
      )}
      <span className="pg-card-name">{mon.name}</span>
      <div className="pg-card-sprite-wrap">
        <PokemonSprite id={mon.id} name={mon.name} className="pg-card-sprite" />
      </div>
      <div className="pg-card-footer">
        <span className="pg-card-num">#{String(mon.id).padStart(3, "0")}</span>
        <div className="pg-card-types">
          {mon.types.map((ty) => <TypeBadge key={ty} type={ty} />)}
        </div>
      </div>
    </button>
  );
}

function GridScreen({game, onBack, team, setTeam, onGenerate}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return POKEDEX_GEN1;
    return POKEDEX_GEN1.filter((m) => m.name.toLowerCase().includes(q) || String(m.id).includes(q));
  }, [search]);

  const toggle = useCallback((mon) => {
    setTeam((prev) => {
      const exists = prev.find((p) => p.id === mon.id);
      if (exists) return prev.filter((p) => p.id !== mon.id);
      if (prev.length >= MAX_TEAM) return prev;
      return [...prev, mon];
    });
  }, [setTeam]);

  return (
    <div className="pg-container pg-page pg-page-with-tray">
      <div className="pg-page-head">
        <button className="pg-back-link" onClick={onBack}>
          <ArrowLeft size={14} /> Change game
        </button>
        <div className="pg-eyebrow">STEP 02 / 03 — BUILD YOUR PARTY</div>
        <h1 className="pg-page-title">Pick up to 6 Pokémon</h1>
        <p className="pg-page-sub">
          Playing <b>{game.label}</b> — showing the full Kanto Pokédex.
        </p>
      </div>

      <div className="pg-search-wrap">
        <Search size={16} className="pg-search-icon" />
        <input
          className="pg-search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or Pokédex number..."
        />
      </div>

      {filtered.length === 0 ? (
        <div className="pg-empty">No Pokémon match "{search}".</div>
      ) : (
        <div className="pg-grid">
          {filtered.map((mon) => (
            <PokemonCard
              key={mon.id}
              mon={mon}
              selected={!!team.find((p) => p.id === mon.id)}
              onToggle={toggle}
              disabled={team.length >= MAX_TEAM}
            />
          ))}
        </div>
      )}

      <div className="pg-tray">
        <div className="pg-container pg-tray-inner">
          <div className="pg-tray-slots">
            {Array.from({ length: MAX_TEAM }).map((_, i) => {
              const mon = team[i];
              return (
                <div key={i} className={`pg-tray-slot ${mon ? "pg-tray-slot-filled" : ""}`}>
                  {mon && <PokemonSprite id={mon.id} name={mon.name} className="pg-tray-sprite" />}
                </div>
              );
            })}
            <span className="pg-tray-count">{team.length}/{MAX_TEAM} selected</span>
          </div>
          <button className="pg-btn pg-btn-primary" disabled={team.length === 0} onClick={onGenerate}>
            <Sparkles size={15} />
            Generate route guide
          </button>
        </div>
      </div>
    </div>
  );
}

//instructions screen

function getHeadline(mon) {
  if (mon.category === "evolve" || mon.category === "stone" || mon.category === "trade") {
    return `Evolve from ${mon.evolvesFrom}`;
  }
  if (mon.category === "starter") return "Starter Pokémon";
  if (mon.category === "legendary") return "Legendary encounter";
  if (mon.category === "fossil") return "Fossil revival";
  if (mon.category === "gift") return "Gift Pokémon";
  if (mon.category === "trade-only") return "Trade only";
  if (mon.category === "rare") return "Extremely Rare - Mythical"
  return "Wild encounter";
}

function LineageStep({ mon }) {
  return (
    <div className="pg-lineage-step">
      <div className="pg-lineage-sprite-box">
        <PokemonSprite id={mon.id} name={mon.name} className="pg-lineage-sprite" />
      </div>
      <div className="pg-lineage-body">
        <div className="pg-lineage-name-row">
          <span className="pg-lineage-name">{mon.name}</span>
          <span className="pg-lineage-stage">{STAGES[mon.stage].label}</span>
        </div>
        <p className="pg-lineage-text">
          <b>{getHeadline(mon)}.</b> {mon.detail}
          {mon.exclusiveTo && ` (${titleCase(mon.exclusiveTo)}-version wild encounter.)`}
        </p>
      </div>
    </div>
  );
}

function ReportCard({ mon, index, game }) {
  const exclusiveWarning = mon.exclusiveTo && mon.exclusiveTo !== game.id && game.id !== "yellow";
  const exclusiveOk = mon.exclusiveTo && game.id === "yellow";
  const headline = getHeadline(mon);
  const lineage = useMemo(() => getLineage(mon), [mon]);
  const stageInfo = STAGES[mon.stage];

  return (
    <div className="pg-report-card">
      <div className="pg-report-left">
        <span className="pg-report-index">{String(index + 1).padStart(2, "0")}</span>
        <div className="pg-report-sprite-box">
          <PokemonSprite id={mon.id} name={mon.name} className="pg-report-sprite" />
        </div>
        <span className="pg-report-stage-pill" title={stageInfo.note}>{stageInfo.label}</span>
      </div>

      <div className="pg-report-body">
        <div className="pg-report-title-row">
          <h3 className="pg-report-name">{mon.name}</h3>
          <span className="pg-report-num">#{String(mon.id).padStart(3, "0")}</span>
          <div className="pg-card-types">
            {mon.types.map((ty) => <TypeBadge key={ty} type={ty} />)}
          </div>
        </div>

        <div className="pg-report-detail">
          <div className="pg-report-headline">
            <MapPin size={13} className="pg-good-icon" />
            <span>{headline}</span>
          </div>
          <p className="pg-report-text">{mon.detail}</p>
        </div>

        {exclusiveWarning && (
          <div className="pg-note pg-note-warning">
            <Info size={13} />
            <p>
              This one's exclusive to <b>{titleCase(mon.exclusiveTo)}</b> version in the wild.
              On {game.label}, you'll need to trade with someone playing {titleCase(mon.exclusiveTo)}.
            </p>
          </div>
        )}
        {exclusiveOk && (
          <div className="pg-note">
            <Info size={13} />
            <p>Version-exclusive in Red/Blue, but obtainable directly in Yellow.</p>
          </div>
        )}

        {lineage.length > 0 && (
          <div className="pg-lineage">
            <p className="pg-lineage-title">
              Get there first — full line before {mon.name}:
            </p>
            <div className="pg-lineage-steps">
              {lineage.map((anc) => (
                <LineageStep key={anc.id} mon={anc} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ReportScreen({ team, game, onBack, onRestart }) {
  const ordered = useMemo(() => {
    return [...team].sort((a, b) => {
      if (a.stage !== b.stage) return a.stage - b.stage;
      const ca = CATEGORY_ORDER[a.category] ?? 9;
      const cb = CATEGORY_ORDER[b.category] ?? 9;
      if (ca !== cb) return ca - cb;
      return a.id - b.id;
    });
  }, [team]);

  return (
    <div className="pg-container pg-page pg-page-narrow">
      <div className="pg-page-head">
        <button className="pg-back-link" onClick={onBack}>
          <ArrowLeft size={14} /> Edit team
        </button>
        <div className="pg-eyebrow">STEP 03 / 03 — YOUR ROUTE</div>
        <h1 className="pg-page-title">Team guide for {game.label}</h1>
        <p className="pg-page-sub">
          Ordered chronologically by estimated in-game stage — roughly one
          stage per gym or major story beat, based on typical encounter
          levels and route order. Evolutions show their full pre-evolution
          line so you know what to catch first. Compiled from general game
          knowledge; treat rare or obscure spawns as approximate.
        </p>
      </div>

      <div className="pg-report-list">
        {ordered.map((mon, i) => (
          <ReportCard key={mon.id} mon={mon} index={i} game={game} />
        ))}
      </div>
        <br/>
      <button className="pg-btn pg-btn-secondary" onClick={onRestart}>
        <RotateCcw size={14} /> Start a new team
      </button>
    </div>
  );
}

//functions

export default function PokeGuide() {
  const [dark, setDark] = useState(true);
  const [screen, setScreen] = useState("home");
  const [selectedGame, setSelectedGame] = useState(null);
  const [team, setTeam] = useState([]);

  const handleSelectGame = (game) => {
    setSelectedGame(game);
    setTeam([]);
    setScreen("grid");
  };

  const handleRestart = () => {
    setSelectedGame(null);
    setTeam([]);
    setScreen("game");
  };

  const goHome = () => {
    setSelectedGame(null);
    setTeam([]);
    setScreen("home");
  };

  return (
    <div className="pg-root" data-theme={dark ? "dark" : "light"}>
      <header className="pg-header">
        <div className="pg-container pg-header-inner">
          <button className="pg-logo" onClick={goHome}>
            <span className="pg-logo-dot" />
            <span className="pg-logo-text">POKÉ&nbsp;GUIDE</span>
            <span className="pg-logo-sub">team builder</span>
          </button>
          <button className="pg-icon-btn" onClick={() => setDark((d) => !d)} title="Toggle theme">
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </header>

      {screen === "home" && <HomeScreen onStart={() => setScreen("game")} />}

      {screen === "game" && <GameSelectScreen onBack={() => setScreen("home")}onSelect={handleSelectGame} />}

      {screen === "grid" && selectedGame && (
        <GridScreen game={selectedGame} team={team} setTeam={setTeam} onBack={handleRestart} onGenerate={() => setScreen("report")} />
      )}

      {screen === "report" && selectedGame && (
        <ReportScreen team={team} game={selectedGame} onBack={() => setScreen("grid")} onRestart={handleRestart} />
      )}
    </div>
  );
}