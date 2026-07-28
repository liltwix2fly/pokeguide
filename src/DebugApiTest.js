// TEMPORARY debug component — swap this in for <PokeGuide /> in App.js
// to smoke-test the new API layer before the real UI exists. Delete this
// file once the real UI is wired up.
//
// This intentionally renders raw data rather than anything styled — the
// point right now is "does the pipeline work," not "does it look right."

import React, { useState } from "react";
import { useRegionalDexList, usePartyReport } from "./hooks/usePokeData";

export default function DebugApiTest() {
  const [regionId] = useState("kanto");
  const [gameId] = useState("red");
  const [team, setTeam] = useState(["charmander", "gyarados", "beedrill", "mewtwo"]);

  const dexList = useRegionalDexList(regionId);
  const report = usePartyReport(team, regionId, gameId);

  return (
    <div style={{ padding: 24, fontFamily: "monospace", fontSize: 13 }}>
      <h2>API smoke test — {regionId} / {gameId}</h2>

      <section style={{ marginBottom: 32 }}>
        <h3>1. Regional dex list (grid screen data)</h3>
        {dexList.loading && <p>Loading dex list...</p>}
        {dexList.error && <p style={{ color: "red" }}>ERROR: {String(dexList.error)}</p>}
        {dexList.data && (
          <p>
            Loaded {dexList.data.length} species. First 5:{" "}
            {dexList.data.slice(0, 5).map((m) => `${m.name}(#${m.displayId})`).join(", ")}
          </p>
        )}
      </section>

      <section>
        <h3>2. Party report (chronological instructions)</h3>
        <p>
          Team:{" "}
          <input
            value={team.join(",")}
            onChange={(e) => setTeam(e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
            style={{ width: 400 }}
          />
        </p>

        {report.loading && <p>Loading report...</p>}
        {report.error && (
          <pre style={{ color: "red", whiteSpace: "pre-wrap" }}>
            ERROR: {report.error.message}
            {"\n"}
            {report.error.stack}
          </pre>
        )}
        {report.data && (
          <div>
            {report.data.team.map((mon) => (
              <div key={mon.nationalId} style={{ border: "1px solid #ccc", padding: 12, marginBottom: 12 }}>
                <b>
                  {mon.name} (#{mon.displayId} / national #{mon.nationalId}) — stage {mon.stage}{" "}
                  {mon.stage != null && `"${report.data.stages[mon.stage]?.label}"`}
                </b>
                <div>category: {mon.category}</div>
                <div>detail: {mon.detail}</div>
                {mon.lineage?.length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    <i>lineage: {mon.lineage.map((a) => a.name).join(" -> ")}</i>
                  </div>
                )}
                {/* This is the important bit to eyeball: does the location
                    name below look like a real place, or did it fall into
                    the "isn't mapped to a stage yet" fallback message? */}
                {mon.category === "wild" && (
                  <div style={{ marginTop: 8, color: mon.stage == null ? "red" : "green" }}>
                    stage-map check: {mon.stage == null ? "UNMAPPED — check console/stageMaps/kanto.js" : "mapped OK"}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}