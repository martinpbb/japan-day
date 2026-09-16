import React from "react";
import { ArrowLeft, Clock3 } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback.jsx";
import Section from "./Section.jsx";
import ContentRenderer from "./ContentRenderer.jsx";
import program from "../data/program.json";
import { addLocalePrefix, useI18n } from "../lib/i18n.jsx";

export default function PerformerDetail({ performer }) {
  const { locale } = useI18n();
  const appearances = program.items.filter((item) => item.performerId === performer.id);

  return (
    <Section className="performerDetailSection">
      <a className="backLink" href={addLocalePrefix("/ucinkujici", locale)}>
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
          <ContentRenderer content={performer.content} />

          {appearances.length > 0 ? (
            <div className="performerSchedule">
              <h2>V programu</h2>
              {appearances.map((item, index) => (
                <div className="performerScheduleItem" key={`${item.time}-${index}`}>
                  <a className="performerScheduleLink" href={addLocalePrefix("/program", locale)}>
                    <Clock3 size={18} aria-hidden="true" />
                    <span>
                      <strong>{item.time}</strong>
                      <span>{item.title}</span>
                    </span>
                  </a>
                  {item.description ? <p>{item.description}</p> : null}
                  <ContentRenderer content={item.content} />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
