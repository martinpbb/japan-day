import React from "react";
import { Mail, Phone } from "lucide-react";
import Section from "./Section.jsx";
import { useI18n } from "../lib/i18n.jsx";
export default function Contact() { const { site, content } = useI18n(); const { contact } = site; const route = content.seo.routes["/kontakt"]; return <Section id="kontakt" kicker={route.breadcrumb} title={route.h1}><div className="contactCard"><p>{contact.intro}</p><div className="contactLinks">{contact.email ? <a href={`mailto:${contact.email}`}><Mail size={18} />{contact.email}</a> : null}{contact.phone ? <a href={`tel:${contact.phone.replace(/\s/g, "")}`}><Phone size={18} />{contact.phone}</a> : null}</div></div></Section>; }
