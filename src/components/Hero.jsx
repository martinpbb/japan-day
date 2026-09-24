import React from "react";
import { CalendarDays, Clock3, MapPin, Ticket } from "lucide-react";
import { useI18n } from "../lib/useI18n.js";
import { addLocalePrefix } from "../lib/i18nPaths.js";

export default function Hero() {
  const { locale, site } = useI18n();
  const { ui } = site;
  const e = site.event;
  const openingFrom = ui?.openingFrom ?? "Open from {time}";
  return (
    <section id="top" className="hero">
      <div className="heroPattern" aria-hidden="true" />
      <div className="container heroGrid">
        <div className="heroCopy">
          <div className="eyebrow">{site.hero.kicker}</div>
          <h1>{site.hero.title}</h1>
          <div className="heroShortName">{site.hero.shortName}</div>
          <div className="heroDescriptor">{site.hero.descriptor}</div>
          <p>{site.hero.subtitle}</p>
          <div className="heroActions">
            <a className="button primary" href={addLocalePrefix("/program", locale)}>{site.hero.ctaPrimary}</a>
            <a className="button ghost" href={addLocalePrefix("/prakticke-informace", locale)}>{site.hero.ctaSecondary}</a>
          </div>
          <div className="facts">
            <span><CalendarDays size={18} />{e.date}</span>
            <span><Clock3 size={18} />{openingFrom.replace("{time}", e.openingTime)}</span>
            <span><MapPin size={18} />{e.venue}, {e.locationLabel}</span>
            <span><Ticket size={18} />{e.admission}</span>
          </div>
        </div>
        <aside className="heroCard" aria-label="Japonský den čaje a kultury 2026">
          <div className="sunDisc" aria-hidden="true" />
          <div className="verticalText">日本の茶と文化</div>
          <div className="heroCardText">
            <small>10 • 10 • 2026</small>
            <strong>CHÝNĚ</strong>
            <span>kultura • gastronomie • tradice</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
/**
 * Copyright © 2026 Martin Labudík
 * All rights reserved.
 *
 * Unauthorized copying, modification, redistribution or reuse
 * of this source code, in whole or in part, is prohibited
 * without prior written permission from the copyright holder.
 */
