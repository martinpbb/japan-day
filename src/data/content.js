import csSite from "./locales/cs/site.json";
import csSeo from "./locales/cs/seo.json";
import csProgram from "./locales/cs/program.json";
import csPerformers from "./locales/cs/performers.json";
import csGastronomy from "./locales/cs/gastronomy.json";
import csExhibitors from "./locales/cs/exhibitors.json";
import csGallery from "./locales/cs/gallery.json";
import csPartners from "./locales/cs/partners.json";
import enSite from "./locales/en/site.json";
import enSeo from "./locales/en/seo.json";
import enProgram from "./locales/en/program.json";
import enPerformers from "./locales/en/performers.json";
import enGastronomy from "./locales/en/gastronomy.json";
import enExhibitors from "./locales/en/exhibitors.json";
import enGallery from "./locales/en/gallery.json";
import enPartners from "./locales/en/partners.json";
import jaSite from "./locales/ja/site.json";
import jaSeo from "./locales/ja/seo.json";
import jaProgram from "./locales/ja/program.json";
import jaPerformers from "./locales/ja/performers.json";
import jaGastronomy from "./locales/ja/gastronomy.json";
import jaExhibitors from "./locales/ja/exhibitors.json";
import jaGallery from "./locales/ja/gallery.json";
import jaPartners from "./locales/ja/partners.json";

export const defaultLocale = "cs";
export const supportedLocales = ["cs", "en", "ja"];

const localeContent = {
  cs: {
    site: csSite,
    seo: csSeo,
    program: csProgram,
    performers: csPerformers,
    gastronomy: csGastronomy,
    exhibitors: csExhibitors,
    gallery: csGallery,
    partners: csPartners
  },
  en: {
    site: enSite,
    seo: enSeo,
    program: enProgram,
    performers: enPerformers,
    gastronomy: enGastronomy,
    exhibitors: enExhibitors,
    gallery: enGallery,
    partners: enPartners
  },
  ja: {
    site: jaSite,
    seo: jaSeo,
    program: jaProgram,
    performers: jaPerformers,
    gastronomy: jaGastronomy,
    exhibitors: jaExhibitors,
    gallery: jaGallery,
    partners: jaPartners
  }
};

export function getLocaleContent(locale) {
  return localeContent[locale] || localeContent[defaultLocale];
}

export function getLocaleSite(locale) {
  return getLocaleContent(locale).site;
}
