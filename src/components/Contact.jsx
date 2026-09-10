import React from "react";
import { Mail, Phone } from "lucide-react";
import Section from "./Section.jsx";
import site from "../data/site.json";

export default function Contact() {
  const { contact } = site;
  return (
    <Section id="kontakt" kicker="Kontakt" title="Spojte se s pořadateli">
      <div className="contactCard">
        <p>{contact.intro}</p>
        <div className="contactLinks">
          {contact.email ? <a href={`mailto:${contact.email}`}><Mail size={18} />{contact.email}</a> : null}
          {contact.phone ? <a href={`tel:${contact.phone.replace(/\s/g, "")}`}><Phone size={18} />{contact.phone}</a> : null}
        </div>
      </div>
    </Section>
  );
}
