import React from "react";
import site from "../data/site.json";
export default function Footer() {
  const footerNavigation = site.navigation.filter((item) => [
    "/program",
    "/ucinkujici",
    "/vystavovatele",
    "/prakticke-informace",
    "/kontakt"
  ].includes(item.path));

  return (
    <footer className="footer">
      <div className="container">
        <div className="footerColumns">
          <div className="footerColumn">
            <h2>Event</h2>
            <strong>{site.brand.name}</strong>
            <span>{site.brand.descriptor}</span>
            <span>{site.event.date}</span>
            <span>{site.event.venue}, {site.event.city}</span>
          </div>
          <nav className="footerColumn" aria-label="Důležité odkazy">
            <h2>Důležité odkazy</h2>
            {footerNavigation.map((item) => <a key={item.path} href={item.path}>{item.label}</a>)}
          </nav>
          <nav className="footerColumn" aria-label="Právní informace">
            <h2>Právní informace</h2>
            {site.footer.legalLinks.map((item) => <a key={item.url} href={item.url} target="_blank" rel="noreferrer">{item.label}</a>)}
          </nav>
        </div>
        <div className="footerBottom">
          <span>© 2026 {site.brand.name}</span>
          <span>{site.footer.note}</span>
          <div className="footerMark" aria-label="Japonsko">日本</div>
        </div>
      </div>
    </footer>
  );
}
