// src/components/GlobalTimeline/TimelineLane.jsx
import React from "react";
import { toX, midOf } from "../../utils/eraScale";
import Card from "./Card";

export default function TimelineLane({ label, items, time, onSelect }) {
  const width = 20000; // A very wide container to allow scrolling
  const itemHeight = 60; // Height of each card + margin
  const laneHeight = Math.max(120, 20 + items.length * (itemHeight / 3)); // Approximate height

  // Simple layout algorithm to prevent overlap
  const layoutItems = (items) => {
    const sortedItems = [...items].sort((a, b) => midOf(a) - midOf(b));
    let lastX = -Infinity;
    let yLevel = 0;
    return sortedItems.map((item) => {
      const x = toX(midOf(item), time.start_ce, time.end_ce, width);
      if (x < lastX + 290) {
        // 280 card width + 10 margin
        yLevel++;
      } else {
        yLevel = 0;
      }
      lastX = x;
      const y = yLevel * itemHeight;
      return { ...item, x, y };
    });
  };

  const laidOutItems = layoutItems(items);
  const maxHeight = Math.max(
    120,
    Math.max(...laidOutItems.map((i) => i.y)) + itemHeight
  );

  return (
    <div className="lane" style={{ height: maxHeight }}>
      <div className="lane-label">{label}</div>
      <div className="lane-strip" style={{ width }}>
        {laidOutItems.map((p) => (
          <div key={p.id} style={{ position: "absolute", left: p.x, top: p.y }}>
            <Card pcm={p} onClick={() => onSelect(p)} />
          </div>
        ))}
      </div>
    </div>
  );
}
