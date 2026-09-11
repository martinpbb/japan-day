import React from "react";
import { ChevronRight } from "lucide-react";
import Section from "./Section.jsx";
import ImageWithFallback from "./ImageWithFallback.jsx";
import performers from "../data/performers.json";

export default function Performers() {
  return (
    <Section id="ucinkujici" kicker="Hosté & vystupující" title="Lidé, kteří vás provedou Japonskem">
      <div className="performerGrid">
        {performers.items.map((item) => (
          <a
            className="performerCard performerCardLink"
            id={`host-${item.id}`}
            href={`/ucinkujici/${item.id}`}
            key={item.id}
            aria-label={`Detail účinkujícího ${item.name}`}
          >
            <ImageWithFallback src={item.image} alt={item.name} className="performerImage" />
            <div className="performerContent">
              <div className="programMeta">{item.category}</div>
              <div className="performerTitleRow">
                <h3>{item.name}</h3>
                <ChevronRight size={20} aria-hidden="true" />
              </div>
              <p className="shortText">{item.short}</p>
              <span className="performerMore">Zobrazit detail</span>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
