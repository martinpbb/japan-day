import React from "react";
import { CalendarDays, Clock3, MapPin, Ticket } from "lucide-react";
import Section from "./Section.jsx";
import site from "../data/site.json";

const icons = [CalendarDays, Clock3, MapPin, Ticket];
export default function PracticalInfo() {
  const e = site.event;
  return (
    <Section id="informace" kicker={site.practical.kicker} title={site.practical.title}>
      <div className="infoGrid">{site.practical.items.map((item, i) => { const Icon = icons[i]; return <div className="infoCard" key={item.label}><Icon size={24}/><span>{item.label}</span><strong>{item.value}</strong></div>; })}</div>
      <div className="practicalDetails">
        <div><h3>Doprava a parkování</h3><p>{site.practical.transport}</p></div>
        <div><h3>Bezbariérovost</h3><p>{site.practical.accessibility}</p></div>
      </div>
      <div className="mapPlaceholder"><MapPin size={28}/><div><strong>{e.venue}, {e.street}, {e.postalCode} {e.city}</strong><span>{e.area} • {e.region}</span></div></div>
      <div className="faqBlock">
        <h3>Časté otázky</h3>
        {site.practical.faq.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
