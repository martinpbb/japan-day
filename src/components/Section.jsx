import React from "react";

export default function Section({ id, kicker, title, children, className = "" }) {
  return (
    <section id={id} className={`section ${className}`.trim()}>
      <div className="container">
        <div className="sectionHead">
          {kicker ? <div className="eyebrow">{kicker}</div> : null}
          {title ? <h2>{title}</h2> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
