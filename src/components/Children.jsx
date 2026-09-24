import React from "react";
import { Bird, Brush, Candy, CircleDot, Gamepad2, Palette, Shapes, ToyBrick } from "lucide-react";
import Section from "./Section.jsx";
import { useI18n } from "../lib/i18n.jsx";
import { addLocalePrefix } from "../lib/i18nPaths.js";

const icons = [Palette, SparklesIcon, Bird, Gamepad2, Brush, CircleDot, ToyBrick, Candy];

function SparklesIcon(props) {
  return <Shapes {...props} />;
}

export default function Children({ compact = false }) {
  const { content, locale } = useI18n();
  const data = content.children;
  const route = content.seo.routes["/pro-deti"];
  const detailPath = addLocalePrefix("/pro-deti", locale);

  return (
    <Section id="pro-deti" kicker={route.sectionKicker || route.breadcrumb} title={route.sectionTitle || route.h1} className="childrenSection">
      <p className="childrenIntro">{data.intro}</p>
      <p className="childrenFreeEntry">{data.freeEntry}</p>
      <div className="featureGrid childrenGrid">
        {data.activities.map((activity, index) => {
          const Icon = icons[index % icons.length];
          return (
            <article className="featureCard childrenCard" key={activity.id}>
              <Icon size={28} aria-hidden="true" />
              <h3>{activity.title}</h3>
              <p>{compact ? activity.short : activity.description}</p>
            </article>
          );
        })}
      </div>
      {compact ? (
        <a className="childrenCta" href={detailPath}>{data.cta}</a>
      ) : (
        <div className="childrenSafety">
          <h3>{data.safety.title}</h3>
          <p>{data.safety.text}</p>
        </div>
      )}
    </Section>
  );
}
