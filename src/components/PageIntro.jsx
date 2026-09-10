import React from "react";

export default function PageIntro({ title, intro }) {
  return (
    <section className="pageIntro">
      <div className="container">
        <div className="eyebrow">Japan Day Chýně 2026</div>
        <h1>{title}</h1>
        {intro ? <p>{intro}</p> : null}
      </div>
    </section>
  );
}
