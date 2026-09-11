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
              <div className="programAvatarSlot">
                {performer ? (
                  <a className="programAvatarLink" href={`/ucinkujici/${performer.id}`} aria-label={`Více o ${performer.name}`}>
                    <img className="programAvatar" src={performer.image} alt="" />
                  </a>
                ) : null}
              </div>
              <div className="programHeading">
                <div className="programMeta">{performer?.category || (item.type === "ceremony" ? "Program" : "Informace")}</div>
                <h3>{item.title}</h3>
              </div>
              {(item.description || performer?.short) ? <p className="programDescription">{item.description || performer.short}</p> : <div className="programDescription" />}
              {performer ? <a className="iconLink" href={`/ucinkujici/${performer.id}`} aria-label={`Více o ${performer.name}`}><ChevronRight size={20}/></a> : null}
            </article>
          );
        })}
      </div>
    </Section>
  );
}
