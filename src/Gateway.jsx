import React from "react";

// This is the data for our five cards.
const gateways = [
  {
    id: "F",
    header: "I. The Foundations of Pedagogy",
    title: "Foundational Mechanisms",
    description:
      "The universal building blocks of pedagogy. Explore the causal mechanisms common to all humanity—from joint attention to apprenticeship—that enable learning across every culture and historical era.",
    isSingle: true,
  },
  {
    id: "W",
    header: "II. The Great Regional Traditions",
    title: "The West",
    description:
      "Mechanisms of proof, debate, and scale. Trace the evolution from Greco-Roman rhetoric and scholastic disputation through the university, mass schooling, and the evidence-based turn of cognitive science.",
  },
  {
    id: "EA",
    title: "East Asia",
    description:
      "Mechanisms of discipline, succession, and insight. Discover the enduring power of Confucian recitation, examination systems, Zen paradoxes, and the master-disciple models that ensure high-fidelity transmission.",
  },
  {
    id: "IN",
    title: "Indian Subcontinent",
    description:
      "Mechanisms of orality, exegesis, and lineage. Delve into the ancient memory systems of the Vedas, the logical rigor of Nyāya philosophy, and the immersive Guru-śiṣya system that binds knowledge to a living tradition.",
  },
  {
    id: "INTL",
    header: "III. The International Toolkit",
    title: "International Mechanisms",
    description:
      "The globalized present. Investigate the modern causal mechanisms—from Lesson Study to AI Tutors—that originated in one tradition but have now spread across the world, forming a shared toolkit for 21st-century education.",
    isSingle: true,
  },
];

// This is our new Gateway component.
export function Gateway({ onSelectGateway }) {
  const handleCardClick = (regionId) => {
    // When a card is clicked, we call the function passed down from App.jsx
    onSelectGateway(regionId);
  };

  return (
    <div className="gateway-container">
      <div className="gateway-header">
        <h1>The World Pedagogy Codex</h1>
        <p className="subtitle">
          An interactive atlas of pedagogic causal mechanisms.
        </p>
        <p>
          The Codex is a visual database of the core causal mechanisms that
          structure how teaching causes learning. Each entry is a technology
          designed to transmit knowledge, from a grandparent's story to an AI
          tutor. Explore the universal foundations of learning, dive into the
          great regional traditions, or trace the spread of modern,
          international practices.
        </p>
      </div>

      {gateways.map((card, index) => (
        <React.Fragment key={card.id}>
          {card.header && (
            <h2 className="gateway-section-header">{card.header}</h2>
          )}
          <div
            className={`gateway-card ${card.isSingle ? "single-card" : ""} ${
              !gateways[index - 1]?.header && index > 0 && !card.header
                ? "no-header"
                : ""
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
