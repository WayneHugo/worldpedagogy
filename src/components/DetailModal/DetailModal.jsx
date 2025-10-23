// src/components/DetailModal/DetailModal.jsx
import React from "react";
import Parallels from "./Parallels";

export default function DetailModal({ pcm, lookups, onClose, onNavigate }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>
            {pcm.id}: {pcm.name}
          </h2>
          <button onClick={onClose}>×</button>
        </div>
        <div className="grid">
          <div>
            <p>
              <strong>Region:</strong> {label(lookups.regions, pcm.region_id)}
            </p>
            {pcm.stream_id && (
              <p>
                <strong>Stream:</strong> {label(lookups.streams, pcm.stream_id)}
              </p>
            )}
            <p>
              <strong>Family:</strong> {pcm.family_id}
            </p>
            <p>
              <strong>Type:</strong> {pcm.type}
            </p>
            <p>
              <strong>Loci:</strong> {(pcm.loci || []).join(", ")}
            </p>
          </div>
          <div>
            <p>
              <strong>Era:</strong> {pcm.era_ref?.era_id} (
              {pcm.era_ref?.start_ce} to {pcm.era_ref?.end_ce})
            </p>
            <p>
              <strong>Anchors:</strong>{" "}
              {(pcm.anchors || []).map((a) => a.label).join(" • ")}
            </p>
          </div>
        </div>
        <section>
          <h3>Mechanism</h3>
          <p>{pcm.description}</p>
        </section>
        {pcm.artifact && (
          <section>
            <h3>Artifact</h3>
            <p>{pcm.artifact}</p>
          </section>
        )}
        {pcm.error_surface && (
          <section>
            <h3>Error Surface</h3>
            <p>{pcm.error_surface}</p>
          </section>
        )}
        {pcm.failure_mode && (
          <section>
            <h3>Failure Mode</h3>
            <p>{pcm.failure_mode}</p>
          </section>
        )}
        <Parallels parallels={pcm.parallels || []} onNavigate={onNavigate} />
      </div>
    </div>
  );
}
function label(list, id) {
  const item = list.find((x) => x.id === id);
  return item ? item.label : id;
}
