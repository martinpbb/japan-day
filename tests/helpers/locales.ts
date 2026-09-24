export const locales = {
  cs: { prefix: "/", lang: "cs", hreflang: "cs", label: "Čeština" },
  en: { prefix: "/en/", lang: "en", hreflang: "en", label: "English" },
  ja: { prefix: "/ja/", lang: "ja", hreflang: "ja", label: "日本語" },
  de: { prefix: "/de/", lang: "de", hreflang: "de", label: "Deutsch" },
  es: { prefix: "/es/", lang: "es", hreflang: "es", label: "Español" },
  zh: { prefix: "/zh/", lang: "zh-CN", hreflang: "zh-CN", label: "中文" },
  vi: { prefix: "/vi/", lang: "vi", hreflang: "vi", label: "Tiếng Việt" },
} as const;

export type Locale = keyof typeof locales;
export const localeCodes = Object.keys(locales) as Locale[];
export const prefixFor = (locale: Locale, route = "/") => {
  const suffix = route === "/" ? "" : route;
  return locale === "cs" ? `${suffix || "/"}` : `${locales[locale].prefix.slice(0, -1)}${suffix || "/"}`;
};
