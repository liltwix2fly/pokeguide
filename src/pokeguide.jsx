//importing react packages and our css file
import React, { useState, useMemo, useCallback, useEffect } from "react";
import "./pokeguide.css";
import { getRegionalDexList } from "./api/regionalDex"; 
import { buildTeamReport } from "./api/partyPlanner";

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
const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};


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

const REGIONS = [
  { id: "kanto", roman: "I", region: "Kanto", available: true, games: [
    { id: "red", label: "Red", dexId: "kanto"},
    { id: "blue", label: "Blue" , dexId: "kanto"},
    { id: "yellow", label: "Yellow" , dexId: "kanto"},
  ] },
  { id: "johto", roman: "II", region: "Johto", available: true, games: [
    { id: "gold", label: "Gold" , dexId:"johto"},
    { id: "silver", label: "Silver" , dexId:"johto"},
    { id: "crystal", label: "Crystal" , dexId:"johto"},
  ] },
  { id: "hoenn", roman: "III", region: "Hoenn", available: true, games: [
    { id: "ruby", label: "Ruby" , dexId: "hoenn"},
    { id: "sapphire", label: "Sapphire" , dexId: "hoenn"},
    { id: "emerald", label: "Emerald" , dexId: "hoenn"},
    { id: "firered", label: "Fire Red" , dexId: "kanto"},
    { id: "leafgreen", label: "Leaf Green" , dexId: "kanto"},
  ] },
  { id: "sinnoh", roman: "IV", region: "Sinnoh", available: true, games: [
    { id: "diamond", label: "Diamond" , dexId: "original-sinnoh"},
    { id: "pearl", label: "Pearl" , dexId: "original-sinnoh"},
    { id: "platinum", label: "Platinum" , dexId: "extended-sinnoh"},
    { id: "heartgold", label: "Heart Gold" , dexId: "johto"},
    { id: "soulsilver", label: "Soul Silver" , dexId: "johto"},
  ] },
  { id: "unova", roman: "V", region: "Unova", available: true, games: [
    { id: "black", label: "Black" , dexId: "unova"},
    { id: "white", label: "White" , dexId: "unova"},
    { id: "black2", label: "Black 2" , dexId: "updated-unova"},
    { id: "white2", label: "White 2" , dexId: "updated-unova"},

  ] },
  { id: "kalos", roman: "VI", region: "Kalos", available: false, games: [] },
  { id: "alola", roman: "VII", region: "Alola", available: false, games: [] },
  { id: "galar", roman: "VIII", region: "Galar", available: false, games: [] },
  { id: "paldea", roman: "IX", region: "Paldea", available: false, games: [] },
];

const MAX_TEAM = 6;




const CATEGORY_ORDER = {
  starter: 0, wild: 1, gift: 1, fossil: 1, "trade-only": 1,
  evolve: 2, stone: 2, trade: 2, rare: 3, legendary: 3,
};

function PokemonSprite({ real_id, name, className, animated = false }) {
  const [stage, setStage] = useState(0);

  // If "animated" is false, we skip step 0 (the GIF) and jump straight to step 1
  const currentStep = animated ? stage : stage + 1;

  // Step 3 or higher means all images failed, show initials
  if (currentStep >= 3) {
    return (
      <div className={`pg-sprite-fallback ${className || ""}`}>
        {name ? name.slice(0, 2).toUpperCase() : "?"}
      </div>
    );
  }

  // Determine the image URL based on the current step
  let imageUrl = "";
  if (currentStep === 0) {
    // Step 0: Try the animated GIF
    imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${real_id}.gif`;
  } else if (currentStep === 1) {
    // Step 1: Try Official Art
    imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${real_id}.png`;
  } else {
    // Step 2: Try Default Sprite
    imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${real_id}.png`;
  }

  return (
    <img
      src={imageUrl}
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
const HERO_PREVIEW_IDS = [generateRandom(1,649), generateRandom(1,649), generateRandom(1,649), generateRandom(1,649), generateRandom(1,649)];
 
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
            GEN I-V NOW · SUPPORT FOR GENS VI-IX COMING SOON
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
              <div className="pg-stat-num">649</div>
              <div className="pg-stat-label">Pokémon mapped · Gen I-V</div>
            </div>
            <div className="pg-stat-divider" />
            <div className="pg-stat">
              <div className="pg-stat-num">19</div>
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
                <PokemonSprite real_id={id} name={id} />
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

function GameSelectScreen({ onSelect, onBack }) {
  const [selectedRegionId, setSelectedRegionId] = useState(REGIONS[0].id);
  const region = REGIONS.find((r) => r.id === selectedRegionId) || REGIONS[0];

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
          <label className="pg-gen-tag" htmlFor="pg-region-select">REGION</label>
          <select
            id="pg-region-select"
            className="pg-select"
            value={selectedRegionId}
            onChange={(e) => setSelectedRegionId(e.target.value)}
          >
            {REGIONS.map((r) => (
              <option key={r.id} value={r.id}>
                Gen {r.roman} · {r.region}{!r.available ? " — coming soon" : ""}
              </option>
            ))}
          </select>
          <h2 className="pg-gen-title">{region.region}</h2>
        </div>

        {region.available ? (
          <div className="pg-game-row">
            {region.games.map((game) => (
            <button 
              key={game.id} 
              className="pg-game-btn" 
              onClick={() => onSelect({ 
                id: game.id,             // Must be "platinum" so region.games.find matches it!
                label: game.label,
                regionId: region.id,     // Must be "sinnoh"
                pokedexSlug: game.dexId  // Pass the slug cleanly here
              })}
            >
                <Gamepad2 size={15} className="pg-accent-icon" />
                <span>{game.label}</span>
                <ChevronRight size={14} className="pg-game-btn-chevron" />
              </button>
            ))}
          </div>
        ) : (
          <div className="pg-region-empty">
            <p>
              <b>{region.region}</b> Pokémon data isn't mapped yet.
            </p>
          </div>
        )}
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
      <span className="pg-card-name">{capitalize(mon.name)}</span>
      <div className="pg-card-sprite-wrap">
        <PokemonSprite real_id={mon.nationalId} name={mon.name} className="pg-card-sprite" />
      </div>
      <div className="pg-card-footer">
        {/* Check if displayId exists; if not, show a custom label */}
        <span className="pg-card-num">
          {mon.displayId ? `#${String(mon.displayId).padStart(3, "0")}` : "Nat Dex"}
        </span>
        <div className="pg-card-types">
          {mon.types.map((ty) => <TypeBadge key={ty} type={ty} />)}
        </div>
      </div>
    </button>
  );
}


function GridScreen({game, onBack, team, setTeam, onGenerate}) {
  const [search, setSearch] = useState("");
  const [pokedex, setPokedex] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const regionLabel = game.label || ""; 

  // Fetch API data when the component mounts or the game changes
 // Fetch API data when the component mounts or the game changes
useEffect(() => {
    let isMounted = true;
    setLoading(true);

    // Pass region.id and game.id so regionalDex.js can correctly look up Platinum
    getRegionalDexList(game.regionId, game.id)
      .then((data) => {
        if (isMounted) {
          setPokedex(data || []);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [game.regionId, game.id]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return pokedex;
    return pokedex.filter((m) => m.name.toLowerCase().includes(q) || String(m.displayId).includes(q));
  }, [search, pokedex]);

  const toggle = useCallback((mon) => {
    setTeam((prev) => {
      const exists = prev.find((p) => p.nationalId === mon.nationalId);
      if (exists) return prev.filter((p) => p.nationalId !== mon.nationalId);
      if (prev.length >= 6) return prev; 
      return [...prev, mon];
    });
  }, [setTeam]);

  if (loading) {
    return (
      <div className="pg-container pg-page pg-page-with-tray">
        <div className="pg-page-head">
          <button className="pg-back-link" onClick={onBack}>
            <ArrowLeft size={14} /> Change game
          </button>
          <div className="pg-eyebrow">STEP 02 / 03 — BUILD YOUR PARTY</div>
          <h1 className="pg-page-title">Loading Pokédex...</h1>
          <p className="pg-page-sub">Fetching live {game.label} data from PokéAPI.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pg-container pg-page pg-page-with-tray">
      <div className="pg-page-head">
        <button className="pg-back-link" onClick={onBack}>
          <ArrowLeft size={14} /> Change game
        </button>
        <div className="pg-eyebrow">STEP 02 / 03 — BUILD YOUR PARTY</div>
        <h1 className="pg-page-title">Pick up to 6 Pokémon</h1>
        <p className="pg-page-sub">
          Playing <b>{game.label}</b> — showing the full {regionLabel} Pokédex.
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
              key={mon.nationalId}
              mon={mon}
              selected={!!team.find((p) => p.nationalId === mon.nationalId)}
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
                  {mon && <PokemonSprite real_id={mon.nationalId} name={capitalize(mon.name)} className="pg-tray-sprite" />}
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

function LineageStep({ mon, stages }) {
  const stageInfo = (stages && stages[mon.stage]) || { label: "Base Stage", note: "" };

  return (
    <div className="pg-lineage-step">
      {/* 1. Here is the restored wrapper that shrinks the sprite to 40x40! */}
      <div className="pg-lineage-sprite-box">
        <PokemonSprite 
          real_id={mon.nationalId} 
          name={mon.name} 
          className="pg-lineage-sprite" 
          animated = {true}
        />
      </div>
      
      {/* 2. Using your exact original CSS classes for the text layout */}
      <div className="pg-lineage-body">
        <div className="pg-lineage-name-row">
          <span className="pg-lineage-name">{mon.name ? mon.name.charAt(0).toUpperCase() + mon.name.slice(1) : ""}</span>
          {" "}
          <span className="pg-lineage-stage" title={stageInfo.note}>
            {stageInfo.label}
          </span>
        </div>
        
        {/* 3. The location info text */}
        <p className="pg-lineage-text">
          {mon.detail ? mon.detail : "Location unknown."}
        </p>
      </div>
    </div>
  );
}

function ReportCard({ mon, index, game, stages }) {
  const headline = getHeadline(mon);
  const stageInfo = stages[mon.stage] || { label: "Unknown Stage", note: "" };  

  return (
    
    <div className="pg-report-card">
      <div className="pg-report-left">
        <span className="pg-report-index">{String(index + 1).padStart(2, "0")}</span>
        <div className="pg-report-sprite-box">
          <PokemonSprite real_id={mon.nationalId} name={capitalize(mon.name)} className="pg-report-sprite" animated={true} />
        </div>
        {/* ADD THE NAME HERE */}
        <div className="pg-report-name" style={{ fontSize: "14px", marginTop: "4px", textAlign: "center" }}>
          {capitalize(mon.name)}
        </div>
        <span className="pg-report-stage-pill" title={stageInfo.note}>{stageInfo.label}</span>
      </div>

      <div className="pg-report-body">
        {/* ... Title Row UI remains exactly the same, but use mon.displayId ... */}
        
        <div className="pg-report-detail">
          <div className="pg-report-headline">
            <MapPin size={13} className="pg-good-icon" />
            <span>{headline}</span>
          </div>
          <p className="pg-report-text">{mon.detail}</p>
        </div>

        {/* The API injects lineage directly into the mon object! */}
        {mon.lineage && mon.lineage.length > 0 && (
          <div className="pg-lineage">
            <p className="pg-lineage-title">
              Get there first — full line before {mon.name}:
            </p>
            <div className="pg-lineage-steps">
              {mon.lineage.map((anc) => (
                <LineageStep key={anc.nationalId} mon={anc} stages={stages} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ReportScreen({ team, game, onBack, onRestart }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extract just the names to pass to our API utility
    const speciesNames = team.map(mon => mon.name);
    
    buildTeamReport(speciesNames, game.regionId, game.id)
      .then(data => {
        setReport(data);
        setLoading(false);
      })
      .catch(console.error);
  }, [team, game]);

  if (loading || !report) return <div className="pg-container pg-page">Loading route guide...</div>;

  return (
    <div className="pg-container pg-page pg-page-timeline">
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
      <br/>
      <div className="pg-timeline">
        {/* buildTeamReport already sorts the team for you */}
        {report.team.map((mon, i) => (
          <div key={mon.nationalId} className={`pg-timeline-row ${i % 2 === 0 ? "pg-timeline-left" : "pg-timeline-right"}`}>
            <span className={`pg-timeline-dot ${i === 0 ? "pg-timeline-dot-first" : ""}`} />
            <div className="pg-timeline-card-wrap">
               {/* Pass down the stages object fetched from the API */}
              <ReportCard mon={mon} index={i} game={game} stages={report.stages} />
            </div>
          </div>
        ))}
      </div>
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
            <span className="pg-logo-text">POKÉ&nbsp;GUIDE V2</span>
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