import React from "react";
import Section from "./Section.jsx";
import ImageWithFallback from "./ImageWithFallback.jsx";
import data from "../data/partners.json";

function PartnerList({ items }) {
  return <div className="partnerGrid">{items.map((item) => <article className="partnerCard" key={item.name}><ImageWithFallback src={item.image} alt={item.name} className="partnerLogo"/><strong>{item.name}</strong>{item.note ? <span>{item.note}</span> : null}</article>)}</div>;
}
export default function Partners() {
  return <Section id="partneri" kicker="Pořadatelé & partneři" title="Společně pro Japonský den"><h3 className="subheading">Pořadatelé</h3><PartnerList items={data.organizers}/><h3 className="subheading">Partneři a záštita</h3><PartnerList items={data.partners}/></Section>;
}
