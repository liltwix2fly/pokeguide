/**
 * PokeAPI's location_area slugs are far more granular than a stage map
 * should need to care about. This strips structural noise — regional prefixes,
 * floor markers, side variants, generic "-area" suffixes, and room sub-indices
 * — down to one base identifier per location[cite: 21].
 */
export function normalizeLocationSlug(slug) {
  if (!slug) return "";
  let s = slug.toLowerCase();
  let changed = true;

  // Strip regional prefixes if present (e.g., "sinnoh-", "unova-", etc.)
  s = s.replace(/^(?:kanto|johto|hoenn|sinnoh|unova|kalos|alola|galar|paldea)-/, "");

  const sideWords = "left|right|east|west|north|south|upper|lower|inside|outside|entrance|exit|inner|outer";
  const noiseWords = "room|chamber|section|area";

  while (changed) {
    changed = false;

    // "-room-1", "-chamber-2", "-section-3" — noise word + trailing index, together[cite: 21]
    if (new RegExp(`-(?:${noiseWords})-\\d+$`).test(s)) {
      s = s.replace(new RegExp(`-(?:${noiseWords})-\\d+$`), "");
      changed = true;
      continue;
    }
    // Directional/side sub-areas, peeled one layer at a time[cite: 21]
    if (new RegExp(`-(?:${sideWords})$`).test(s)) {
      s = s.replace(new RegExp(`-(?:${sideWords})$`), "");
      changed = true;
      continue;
    }
    // Floor markers: -1f, -b1f, -2f, -b12f ...[cite: 21]
    if (/-b?\d+f$/.test(s)) {
      s = s.replace(/-b?\d+f$/, "");
      changed = true;
      continue;
    }
    // Generic trailing "-area"[cite: 21]
    if (/-area$/.test(s)) {
      s = s.replace(/-area$/, "");
      changed = true;
      continue;
    }
    // Trailing bare number (a room/section index) — never strip when base is "route"[cite: 21]
    const m = s.match(/^(.*)-(\d+)$/);
    if (m && !/(^|-)route$/.test(m[1])) {
      s = m[1];
      changed = true;
      continue;
    }
  }
  return s;
}