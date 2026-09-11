import React from "react";
import { ArrowLeft, Clock3 } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback.jsx";
import Section from "./Section.jsx";
import program from "../data/program.json";

export default function PerformerDetail({ performer }) {
  const appearances = program.items.filter((item) => item.performerId === performer.id);

  return (
    <Section className="performerDetailSection">
      <a className="backLink" href="/ucinkujici">
        <ArrowLeft size={18} aria-hidden="true" />
        Všichni účinkující
      </a>

      <div className="performerDetailGrid">
        <div className="performerDetailMedia">
          <ImageWithFallback src={performer.image} alt={performer.name} className="performerDetailImage" />
        </div>

        <div className="performerDetailContent">
          <div className="programMeta">{performer.category}</div>
          <p className="performerLead">{performer.short}</p>
          <p>{performer.description}</p>

          {appearances.length > 0 ? (
            <div className="performerSchedule">
              <h2>V programu</h2>
              {appearances.map((item, index) => (
                <a className="performerScheduleItem" href="/program" key={`${item.time}-${index}`}>
                  <Clock3 size={18} aria-hidden="true" />
                  <span>
                    <strong>{item.time}</strong>
                    <span>{item.title}</span>
                  </span>
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
