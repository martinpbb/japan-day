import React from "react";
import { useI18n } from "../lib/i18n.jsx";
import { addLocalePrefix } from "../lib/i18nPaths.js";

export default function Breadcrumbs({ current, parent = null }) {
  const { locale, site } = useI18n();
  const { ui } = site;
  return (
    <nav className="breadcrumbs container" aria-label={ui.breadcrumbLabel}>
      <a href={addLocalePrefix("/", locale)}>{site.brand.name}</a>
      {parent ? (
        <>
          <span aria-hidden="true">›</span>
          <a href={addLocalePrefix(parent.path, locale)}>{parent.name}</a>
        </>
      ) : null}
      <span aria-hidden="true">›</span>
      <span aria-current="page">{current}</span>
    </nav>
  );
}
