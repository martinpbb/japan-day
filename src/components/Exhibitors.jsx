import React from "react";
import Section from "./Section.jsx";
import ImageWithFallback from "./ImageWithFallback.jsx";
import data from "../data/exhibitors.json";

export default function Exhibitors() {
  return (
    <Section id="vystavovatele" kicker="Stánky & prodejci" title="Vystavovatelé a prodejci" className="sectionTint">
      {data.items.length ? (
        <div className="exhibitorGrid">
          {data.items.map((item) => (
            <article className="exhibitorCard" key={item.id || item.name}>
              <ImageWithFallback src={item.image} alt={item.alt || item.name} className="exhibitorImage" />
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                {item.url ? <a className="textLink" href={item.url} target="_blank" rel="noreferrer">Web / sociální sítě</a> : null}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="emptyState">
          <strong>Seznam připravujeme.</strong>
          <p>{data.intro}</p>
        </div>
      )}
    </Section>
  );
}
