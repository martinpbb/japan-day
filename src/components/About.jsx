import React from "react";
import Section from "./Section.jsx";
import site from "../data/site.json";

export default function About() {
  return (
    <Section id="o-akci" kicker={site.about.kicker} title={site.about.title}>
      <div className="aboutGrid">
        <div className="prose">{site.about.paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
        <div className="callout"><span>後援名義</span><strong>{site.event.patronage}</strong></div>
      </div>
    </Section>
  );
}
