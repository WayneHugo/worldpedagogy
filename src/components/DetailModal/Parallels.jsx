// src/components/DetailModal/Parallels.jsx
import React from "react";

export default function Parallels({ parallels, onNavigate }) {
  if (!parallels || !parallels.length) return null;
  return (
    <section>
      <h3>Global Parallels</h3>
      <div className="chips">
        {parallels.map((p) => (
          <button
            key={p.id}
            className="chip"
            onClick={() => onNavigate(p.id)}
            title={p.note}
          >
            {p.id} ({p.relation})
          </button>
        ))}
      </div>
    </section>
  );
}
