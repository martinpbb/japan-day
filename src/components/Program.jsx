import React from "react";
import { ChevronRight } from "lucide-react";
import Section from "./Section.jsx";
import program from "../data/program.json";
import performers from "../data/performers.json";

const performerMap = new Map(performers.items.map((item) => [item.id, item]));

export default function Program() {
  return (
    <Section id="program" kicker="Program" title="Celý den na jednom místě" className="sectionTint">
      <div className="timeline">
        {program.items.map((item, index) => {
          const performer = item.performerId ? performerMap.get(item.performerId) : null;
          return (
            <article className="programItem" key={`${item.time}-${index}`}>
              <time>{item.time}</time>
              <div className="timelineDot" aria-hidden="true" />
              <div className="programBody">
                <div className="programMeta">{performer?.category || (item.type === "ceremony" ? "Program" : "Informace")}</div>
                <h3>{item.title}</h3>
                {(item.description || performer?.short) ? <p>{item.description || performer.short}</p> : null}
              </div>
              {performer ? <a className="iconLink" href={`/ucinkujici#host-${performer.id}`} aria-label={`Více o ${performer.name}`}><ChevronRight size={20}/></a> : null}
            </article>
          );
        })}
      </div>
    </Section>
  );
}
