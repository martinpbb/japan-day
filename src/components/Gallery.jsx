import React, { useMemo, useState } from "react";
import Section from "./Section.jsx";
import ImageWithFallback from "./ImageWithFallback.jsx";
import data from "../data/gallery.json";

export default function Gallery() {
  const categories = useMemo(() => ["Vše", ...new Set(data.items.map((x) => x.category))], []);
  const [active, setActive] = useState("Vše");
  const visible = active === "Vše" ? data.items : data.items.filter((x) => x.category === active);
  return (
    <Section id="fotky" kicker="Minulý ročník" title="Atmosféra Japonského dne 2025" className="sectionTint">
      <div className="filters">{categories.map((c) => <button className={active === c ? "active" : ""} key={c} onClick={() => setActive(c)}>{c}</button>)}</div>
      <div className="galleryGrid">{visible.map((item) => <ImageWithFallback key={item.id} src={item.src} alt={item.alt} className="galleryImage" />)}</div>
    </Section>
  );
}
