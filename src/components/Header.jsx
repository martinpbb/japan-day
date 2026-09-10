import React, { useState } from "react";
import site from "../data/site.json";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="container headerRow">
        <a className="brand" href="/" onClick={() => setOpen(false)} aria-label="Japonský den čaje a kultury — domů">
          <span className="brandSun" aria-hidden="true" />
          <span><strong>{site.brand.name}</strong><small>{site.brand.shortName}</small></span>
        </a>
        <nav className={`nav ${open ? "open" : ""}`} aria-label="Hlavní navigace">
          {site.navigation.map((item) => (
            <a key={item.path} href={item.path} onClick={() => setOpen(false)}>{item.label}</a>
          ))}
        </nav>
        <button className="menuButton" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Otevřít menu">☰</button>
      </div>
    </header>
  );
}
