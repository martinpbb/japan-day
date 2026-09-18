import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { defaultLocale, getLocaleContent, getLocaleSite, supportedLocales } from "../data/content.js";
import { addLocalePrefix, getLocaleFromPath } from "./i18nPaths.js";

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(() => getLocaleFromPath(window.location.pathname));

  useEffect(() => {
    const syncLocaleFromUrl = () => setLocaleState(getLocaleFromPath(window.location.pathname));
    window.addEventListener("popstate", syncLocaleFromUrl);
    return () => window.removeEventListener("popstate", syncLocaleFromUrl);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((nextLocale) => {
    const targetLocale = supportedLocales.includes(nextLocale) ? nextLocale : defaultLocale;
    const nextPath = addLocalePrefix(window.location.pathname, targetLocale);
    const nextUrl = `${nextPath}${window.location.search}${window.location.hash}`;

    if (nextUrl !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
      window.history.pushState({}, "", nextUrl);
    }
    setLocaleState(targetLocale);
  }, []);

  const value = useMemo(() => ({
    locale,
    setLocale,
    site: getLocaleSite(locale),
    content: getLocaleContent(locale),
    locales: supportedLocales
  }), [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within I18nProvider");
  return context;
}
