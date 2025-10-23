// src/components/GlobalTimeline/GlobalTimelineView.jsx
import React from "react";
import TimelineLane from "./TimelineLane";

export default function GlobalTimelineView({ pcms, lookups, time, onSelect }) {
  const lanes = lookups.regions || [];
  const laneData = (id) => pcms.filter((p) => p.region_id === id);

  return (
    <div className="timeline">
      <div className="ruler">
        {tickLabels(time.start_ce, time.end_ce).map((t) => (
          <div key={t} className="tick" style={{ left: pct(t, time) }}>
            {labelCE(t)}
          </div>
        ))}
      </div>
      {lanes.map((l) => (
        <TimelineLane
          key={l.id}
          label={l.label}
          items={laneData(l.id)}
          time={time}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

// Helper functions
function tickLabels(start, end) {
  const range = end - start;
  const step = range > 4000 ? 500 : range > 1000 ? 200 : 100;
  const first = Math.ceil(start / step) * step;
  const arr = [];
  for (let x = first; x <= end; x += step) arr.push(x);
  return arr;
}
function pct(x, time) {
  const { start_ce, end_ce } = time;
  return ((x - start_ce) / (end_ce - start_ce)) * 100 + "%";
}
function labelCE(y) {
  return y < 0 ? `${Math.abs(y)} BCE` : `${y} CE`;
}
