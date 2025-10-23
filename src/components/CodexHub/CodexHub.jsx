import React from "react";
import Filters from "./Filters";
// Importing without curly braces because of "export default".
import matchesFilters from "../../state/selectors";

export function CodexHub({ lookups, data, filters, onBack }) {
  const filteredPcMs = data.pcms.filter((p) => matchesFilters(p, filters));

  return (
    <div className="hub">
      <div className="hub-header">
        <h1>World Pedagogy Codex</h1>
        <button onClick={onBack} className="back-button">
          ‹ Back to Gateways
        </button>
      </div>
      <Filters lookups={lookups} filters={filters} pcms={filteredPcMs} />
    </div>
  );
}
