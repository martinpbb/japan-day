import React from "react";

export default function Breadcrumbs({ current }) {
  return (
    <nav className="breadcrumbs container" aria-label="Drobečková navigace">
      <a href="/">Japonský den čaje a kultury</a>
      <span aria-hidden="true">›</span>
      <span aria-current="page">{current}</span>
    </nav>
  );
}
