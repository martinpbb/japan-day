import React from "react";
import site from "../data/site.json";
export default function Footer() {
  return <footer className="footer"><div className="container"><div><strong>{site.brand.name}</strong><span>{site.event.date} • {site.event.venue}, {site.event.city}</span></div><div className="footerMark">日本</div></div></footer>;
}
