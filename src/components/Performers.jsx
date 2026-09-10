import React from "react";
import Section from "./Section.jsx";
import ImageWithFallback from "./ImageWithFallback.jsx";
import performers from "../data/performers.json";

export default function Performers() {
  return (
    <Section id="ucinkujici" kicker="Hosté & vystupující" title="Lidé, kteří vás provedou Japonskem">
      <div className="performerGrid">
        {performers.items.map((item) => (
          <article className="performerCard" id={`host-${item.id}`} key={item.id}>
            <ImageWithFallback src={item.image} alt={item.name} className="performerImage" />
            <div className="performerContent">
              <div className="programMeta">{item.category}</div>
              <h3>{item.name}</h3>
              <p className="shortText">{item.short}</p>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
