import React from "react";
import Section from "./Section.jsx";
import ImageWithFallback from "./ImageWithFallback.jsx";
import { useI18n } from "../lib/i18n.jsx";
function PartnerList({ items }) { return <div className="partnerGrid">{items.map((item) => <article className="partnerCard" key={item.name}><ImageWithFallback src={item.image} alt={item.name} className="partnerLogo"/><strong>{item.name}</strong>{item.note ? <span>{item.note}</span> : null}</article>)}</div>; }
export default function Partners() { const { site, content } = useI18n(); return <Section id="partneri" className="contactPartners" kicker={site.ui.organizersKicker} title={site.ui.organizersTitle}><h3 className="subheading">{site.ui.organizers}</h3><PartnerList items={content.partners.organizers}/><h3 className="subheading">{site.ui.partners}</h3><PartnerList items={content.partners.partners}/></Section>; }
