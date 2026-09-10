import React from "react";
import { Fish, Flame, Leaf, Wine } from "lucide-react";
import Section from "./Section.jsx";
import data from "../data/gastronomy.json";

const icons = [Fish, Flame, Leaf, Wine];
export default function Gastronomy() {
  return (
    <Section id="gastronomie" kicker="Jídlo & pití" title="Japonsko se ochutnává všemi smysly" className="sectionDark">
      <div className="featureGrid">
        {data.items.map((item, index) => {
          const Icon = icons[index % icons.length];
          return <article className="featureCard" key={item.title}><Icon size={28}/><h3>{item.title}</h3><p>{item.text}</p></article>;
        })}
      </div>
    </Section>
  );
}
