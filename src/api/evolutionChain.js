import { pokedex } from "./pokeapiClient";

/**
 * Turn a single evolution_details entry (from PokeAPI's evolution-chain
 * endpoint) into { category, detail } — the same shape the old hand-typed
 * dataset used, but derived live from the API instead of typed by hand.
 *
 * PokeAPI's evolution_details is occasionally an array with >1 entry when
 * a species can evolve multiple ways (rare) — callers should pass the
 * first entry unless they need to represent branches explicitly.
 */
export function describeEvolution(detail, fromName) {
  if (!detail) return { category: "wild", detail: "" };

  const trigger = detail.trigger?.name;

  if (trigger === "level-up") {
    if (detail.min_happiness != null) {
      const time = detail.time_of_day ? ` during the ${detail.time_of_day}` : "";
      return {
        category: "evolve",
        detail: `Evolves from ${fromName} through high friendship${time}.`,
      };
    }
    if (detail.min_level != null) {
      return {
        category: "evolve",
        detail: `Evolves from ${fromName} at level ${detail.min_level}.`,
      };
    }
    if (detail.known_move) {
      return {
        category: "evolve",
        detail: `Evolves from ${fromName} on level-up once it knows ${humanize(detail.known_move.name)}.`,
      };
    }
    return { category: "evolve", detail: `Evolves from ${fromName} on level-up.` };
  }

  if (trigger === "trade") {
    if (detail.held_item) {
      return {
        category: "trade",
        detail: `Evolves from ${fromName} by trading it while it holds a ${humanize(detail.held_item.name)}.`,
      };
    }
    return {
      category: "trade",
      detail: `Evolves from ${fromName} by trading it to another player.`,
    };
  }

  if (trigger === "use-item") {
    return {
      category: "stone",
      detail: `Evolves from ${fromName} using a ${humanize(detail.item?.name || "special item")}.`,
    };
  }

  if (trigger === "shed") {
    return {
      category: "evolve",
      detail: `Appears alongside ${fromName} at level 20 — needs a free party slot and a spare Poké Ball at the moment it evolves.`,
    };
  }

  // Fallback for triggers this hasn't been taught yet (e.g. Gen5+
  // location-based or "other" triggers). Flag it rather than guess.
  return {
    category: "evolve",
    detail: `Evolves from ${fromName} (${humanize(trigger || "special condition")}) — check a guide for the exact requirement.`,
  };
}

function humanize(slug) {
  if (!slug) return "";
  return slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
}

/**
 * Recursively search an evolution chain tree for `speciesName`, returning
 * { node, lineage } where lineage is the ordered list of ancestor species
 * names from root to (not including) the target — mirroring the old
 * getLineage() helper, but walking a live API tree instead of a local map.
 */
function findInChain(node, speciesName, ancestors) {
  if (node.species.name === speciesName) {
    return { node, lineage: ancestors };
  }
  for (const child of node.evolves_to) {
    const found = findInChain(child, speciesName, [...ancestors, node.species.name]);
    if (found) return found;
  }
  return null;
}

/**
 * Given a species name, fetch its evolution chain and return:
 *   - category/detail for how THIS species is obtained (via its own
 *     evolution_details), unless it's the root (no evolution_details —
 *     caller should treat the root as wild/starter/gift/fossil, since
 *     evolution data can't tell you how the base form is caught)
 *   - lineage: ordered ancestor species names, root first
 *
 * This does NOT decide starter/gift/fossil/legendary — see acquisitionOverrides.js
 * for that, since the API has no concept of those.
 */
export async function getEvolutionInfo(speciesName) {
  const species = await pokedex.getPokemonSpeciesByName(speciesName);
  const chainId = idFromUrl(species.evolution_chain.url);
  const chain = await pokedex.getEvolutionChainById(chainId);

  const found = findInChain(chain.chain, speciesName, []);
  if (!found) {
    throw new Error(`${speciesName} not found in its own evolution chain — API data inconsistency`);
  }

  const isRoot = found.lineage.length === 0;
  const details = found.node.evolution_details?.[0] || null;
  const fromName = found.lineage[found.lineage.length - 1];

  return {
    isRoot,
    lineage: found.lineage, // e.g. ["charmander", "charmeleon"] for charizard
    ...( isRoot ? { category: null, detail: null } : describeEvolution(details, humanize(fromName)) ),
  };
}

function idFromUrl(url) {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}