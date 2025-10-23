import React from "react";
import { midOf, toX } from "../../utils/eraScale";

const TIMELINE_MIN_CE = -4000;
const TIMELINE_MAX_CE = 2100;
const TIMELINE_WIDTH = 8000;

// This component receives the filters and pcms, and is responsible for drawing everything.
export default function Filters({ lookups, filters, pcms }) {
  const yearToPx = (year) =>
    toX(year, TIMELINE_MIN_CE, TIMELINE_MAX_CE, TIMELINE_WIDTH);

  // This logic decides which era backgrounds to draw.
  const visibleEras = lookups.eras.filter((era) => {
    // For F or INTL views, show all eras for context.
    if (filters.regions.has("F") || filters.regions.has("INTL")) {
      return true;
    }
    // For regional views, only show that region's eras.
    const eraSystem = lookups.eraSystems.find(
      (sys) => sys.id === era.system_id
    );
    return eraSystem && filters.regions.has(eraSystem.region_id);
  });

  return (
    <div className="filters-and-timeline">
      {/* FILTER CONTROLS */}
      <div className="filter-bar">
        <div className="chips">
          <strong>Region: </strong>
          {lookups.regions.map((r) => (
            <button
              key={r.id}
              className={filters.regions.has(r.id) ? "chip active" : "chip"}
              onClick={() => filters.api.toggle(filters.setRegions, r.id)}
            >
              {r.label}
            </button>
          ))}
        </div>
        <div className="chips">
          <strong>Family: </strong>
          {lookups.families.map((f) => (
            <button
              key={f.id}
              className={filters.families.has(f.id) ? "chip active" : "chip"}
              onClick={() => filters.api.toggle(filters.setFamilies, f.id)}
              title={f.description}
            >
              {f.label} ({f.id})
            </button>
          ))}
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name, ID, or desc"
            value={filters.search}
            onChange={(e) => filters.setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TIMELINE RENDERING */}
      <div
        className="timeline-container"
        style={{ width: `${TIMELINE_WIDTH}px` }}
      >
        <div className="eras">
          {visibleEras.map((era) => (
            <div
              key={era.id}
              className="era-band"
              style={{
                left: `${yearToPx(era.start_ce)}px`,
                width: `${yearToPx(era.end_ce) - yearToPx(era.start_ce)}px`,
              }}
            >
              <span>{era.label}</span>
            </div>
          ))}
        </div>
        <div className="pcms">
          {pcms.map((p) => (
            <div
              key={p.id}
              className="pcm-dot"
              title={`${p.name} (${p.id})`}
              style={{
                left: `${yearToPx(midOf(p))}px`,
                backgroundColor:
                  lookups.regions.find((r) => r.id === p.region_id)?.color ||
                  "#999",
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
