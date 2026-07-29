import { pokedex } from "./pokeapiClient";

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
    if (detail.location) {
      return {
        category: "evolve",
        detail: `Evolves from ${fromName} on level-up near ${humanize(detail.location.name)}.`,
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
    if (detail.trade_species) {
      return {
        category: "trade",
        detail: `Evolves from ${fromName} by trading it specifically for a ${humanize(detail.trade_species.name)}.`,
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

  return {
    category: "evolve",
    detail: `Evolves from ${fromName} (${humanize(trigger || "special condition")}) — check a guide for the exact requirement.`,
  };
}

function humanize(slug) {
  if (!slug) return "";
  return slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
}

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

export async function getEvolutionInfo(speciesName, maxGeneration) {
  const species = await pokedex.getPokemonSpeciesByName(speciesName);
  const chainId = idFromUrl(species.evolution_chain.url);
  const chain = await pokedex.getEvolutionChainById(chainId);

  const found = findInChain(chain.chain, speciesName, []);
  if (!found) {
    throw new Error(`${speciesName} not found in its own evolution chain — API data inconsistency`);
  }

  let lineage = found.lineage;
  if (maxGeneration != null) {
    const filtered = [];
    for (const ancestor of lineage) {
      const ancestorSpecies = await pokedex.getPokemonSpeciesByName(ancestor);
      const genId = Number(idFromUrl(ancestorSpecies.generation.url));
      if (genId <= maxGeneration) {
        filtered.push(ancestor);
      }
    }
    lineage = filtered;
  }

  const isRoot = lineage.length === 0;
  const details = found.node.evolution_details?.[0] || null;
  const fromName = lineage[lineage.length - 1];

  return {
    isRoot,
    lineage,
    ...( isRoot ? { category: null, detail: null } : describeEvolution(details, humanize(fromName)) ),
  };
}

function idFromUrl(url) {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}