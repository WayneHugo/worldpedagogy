// src/components/GlobalTimeline/Card.jsx
import React from "react";

export default function Card({ pcm, onClick }) {
  return (
    <button className="card" onClick={onClick} title={pcm.name}>
      <div className="card-id">{pcm.id}</div>
      <div className="card-name">{pcm.name}</div>
      <div className="card-meta">
        {pcm.family_id} • {pcm.type}
      </div>
    </button>
  );
}
