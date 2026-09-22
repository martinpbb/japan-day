import React from "react";
import Section from "./Section.jsx";
import { useI18n } from "../lib/i18n.jsx";
export default function About() { const { site } = useI18n(); return <Section id="o-akci" kicker={site.about.kicker} title={site.about.title}><div className="aboutGrid"><div className="prose">{site.about.paragraphs.map((p) => <p key={p}>{p}</p>)}</div><div className="callout"><span>{site.ui.patronage}</span>{site.event.patronage.map((line) => <strong key={line}>{line}</strong>)}</div></div></Section>; }
