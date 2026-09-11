import React from "react";

export default function Breadcrumbs({ current, parent = null }) {
  return (
    <nav className="breadcrumbs container" aria-label="Drobečková navigace">
      <a href="/">Japonský den čaje a kultury</a>
      {parent ? (
        <>
          <span aria-hidden="true">›</span>
          <a href={parent.path}>{parent.name}</a>
        </>
      ) : null}
      <span aria-hidden="true">›</span>
      <span aria-current="page">{current}</span>
    </nav>
  );
}
