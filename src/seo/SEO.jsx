import React, { useEffect } from "react";
import { useI18n } from "../lib/i18n.jsx";
import { absoluteUrl, buildSchemas } from "./schema.js";

function ensureMeta(selector, attributeName, attributeValue) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  return element;
}

function ensureLink(rel) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }
  return element;
}

export default function SEO({ path, route }) {
  const { site, content } = useI18n();
  const { seo } = content;
  useEffect(() => {
    document.title = route.title;
    ensureMeta('meta[name="description"]', "name", "description").content = route.description;
    ensureMeta('meta[property="og:title"]', "property", "og:title").content = route.title;
    ensureMeta('meta[property="og:description"]', "property", "og:description").content = route.description;
    ensureMeta('meta[property="og:url"]', "property", "og:url").content = absoluteUrl(seo.baseUrl, path);
    ensureMeta('meta[property="og:type"]', "property", "og:type").content = "website";
    ensureMeta('meta[property="og:site_name"]', "property", "og:site_name").content = seo.siteName;
    ensureMeta('meta[property="og:locale"]', "property", "og:locale").content = seo.locale;
    ensureMeta('meta[name="twitter:card"]', "name", "twitter:card").content = "summary_large_image";

    if (seo.defaultImage) {
      const image = absoluteUrl(seo.baseUrl, seo.defaultImage);
      ensureMeta('meta[property="og:image"]', "property", "og:image").content = image;
      ensureMeta('meta[name="twitter:image"]', "name", "twitter:image").content = image;
    }

    ensureLink("canonical").href = absoluteUrl(seo.baseUrl, path);

    document.head.querySelectorAll('script[data-japanday-schema="true"]').forEach((node) => node.remove());
    buildSchemas({ seo, site, path, route }).forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.japandaySchema = "true";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }, [path, route]);

  return null;
}
