import React from "react";
import { Fish, Flame, Leaf, Wine } from "lucide-react";
import Section from "./Section.jsx";
import { useI18n } from "../lib/i18n.jsx";
const icons = [Fish, Flame, Leaf, Wine];
export default function Gastronomy() { const { content } = useI18n(); const route = content.seo.routes["/gastronomie"]; return <Section id="gastronomie" kicker={route.breadcrumb} title={route.h1} className="sectionDark"><div className="featureGrid">{content.gastronomy.items.map((item, index) => { const Icon = icons[index % icons.length]; return <article className="featureCard" key={item.title}><Icon size={28}/><h3>{item.title}</h3><p>{item.text}</p></article>; })}</div></Section>; }
