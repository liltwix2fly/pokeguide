import { useState, useEffect } from "react";
import { buildTeamReport } from "../api/partyPlanner";
import { getRegionalDexList } from "../api/regionalDex";

/**
 * Powers the picker/grid screen — the full species list for a region.
 * Fetches once per region and stays cached for the component's lifetime
 * (pokedex-promise-v2 also caches at the HTTP layer for 24h on top of this).
 */
export function useRegionalDexList(regionId) {
  const [state, setState] = useState({ loading: true, error: null, data: null });

  useEffect(() => {
    if (!regionId) {
      setState({ loading: false, error: null, data: null });
      return;
    }
    let cancelled = false;
    setState({ loading: true, error: null, data: null });

    getRegionalDexList(regionId)
      .then((list) => { if (!cancelled) setState({ loading: false, error: null, data: list }); })
      .catch((err) => { if (!cancelled) setState({ loading: false, error: err, data: null }); });

    return () => { cancelled = true; };
  }, [regionId]);

  return state;
}

/**
 * Powers the report screen — resolves the full chronological team report
 * for a chosen party + game. Re-fetches whenever the party or game changes.
 */
export function usePartyReport(speciesNames, regionId, gameId) {
  const [state, setState] = useState({ loading: false, error: null, data: null });
  const key = speciesNames?.join(",") || "";

  useEffect(() => {
    if (!speciesNames || speciesNames.length === 0 || !regionId || !gameId) {
      setState({ loading: false, error: null, data: null });
      return;
    }
    let cancelled = false;
    setState({ loading: true, error: null, data: null });

    buildTeamReport(speciesNames, regionId, gameId)
      .then((report) => { if (!cancelled) setState({ loading: false, error: null, data: report }); })
      .catch((err) => { if (!cancelled) setState({ loading: false, error: err, data: null }); });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, regionId, gameId]);

  return state;
}