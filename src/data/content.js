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
import deSite from "./locales/de/site.json";
import deSeo from "./locales/de/seo.json";
import deProgram from "./locales/de/program.json";
import dePerformers from "./locales/de/performers.json";
import deGastronomy from "./locales/de/gastronomy.json";
import deExhibitors from "./locales/de/exhibitors.json";
import deGallery from "./locales/de/gallery.json";
import dePartners from "./locales/de/partners.json";
import esSite from "./locales/es/site.json";
import esSeo from "./locales/es/seo.json";
import esProgram from "./locales/es/program.json";
import esPerformers from "./locales/es/performers.json";
import esGastronomy from "./locales/es/gastronomy.json";
import esExhibitors from "./locales/es/exhibitors.json";
import esGallery from "./locales/es/gallery.json";
import esPartners from "./locales/es/partners.json";
import zhSite from "./locales/zh/site.json";
import zhSeo from "./locales/zh/seo.json";
import zhProgram from "./locales/zh/program.json";
import zhPerformers from "./locales/zh/performers.json";
import zhGastronomy from "./locales/zh/gastronomy.json";
import zhExhibitors from "./locales/zh/exhibitors.json";
import zhGallery from "./locales/zh/gallery.json";
import zhPartners from "./locales/zh/partners.json";
import viSite from "./locales/vi/site.json";
import viSeo from "./locales/vi/seo.json";
import viProgram from "./locales/vi/program.json";
import viPerformers from "./locales/vi/performers.json";
import viGastronomy from "./locales/vi/gastronomy.json";
import viExhibitors from "./locales/vi/exhibitors.json";
import viGallery from "./locales/vi/gallery.json";
import viPartners from "./locales/vi/partners.json";

export const defaultLocale = "cs";
export const supportedLocales = ["cs", "en", "ja", "de", "es", "zh", "vi"];

const localeContent = {
  cs: {
    site: csSite,
    seo: csSeo,
    program: csProgram,
    performers: csPerformers,
    gastronomy: csGastronomy,
    exhibitors: csExhibitors,
    gallery: csGallery,
    partners: csPartners,
  },
  en: {
    site: enSite,
    seo: enSeo,
    program: enProgram,
    performers: enPerformers,
    gastronomy: enGastronomy,
    exhibitors: enExhibitors,
    gallery: enGallery,
    partners: enPartners,
  },
  ja: {
    site: jaSite,
    seo: jaSeo,
    program: jaProgram,
    performers: jaPerformers,
    gastronomy: jaGastronomy,
    exhibitors: jaExhibitors,
    gallery: jaGallery,
    partners: jaPartners,
  },
  de: {
    site: deSite,
    seo: deSeo,
    program: deProgram,
    performers: dePerformers,
    gastronomy: deGastronomy,
    exhibitors: deExhibitors,
    gallery: deGallery,
    partners: dePartners,
  },
  es: {
    site: esSite,
    seo: esSeo,
    program: esProgram,
    performers: esPerformers,
    gastronomy: esGastronomy,
    exhibitors: esExhibitors,
    gallery: esGallery,
    partners: esPartners,
  },
  zh: {
    site: zhSite,
    seo: zhSeo,
    program: zhProgram,
    performers: zhPerformers,
    gastronomy: zhGastronomy,
    exhibitors: zhExhibitors,
    gallery: zhGallery,
    partners: zhPartners,
  },
  vi: {
    site: viSite,
    seo: viSeo,
    program: viProgram,
    performers: viPerformers,
    gastronomy: viGastronomy,
    exhibitors: viExhibitors,
    gallery: viGallery,
    partners: viPartners,
  },
};

export function getLocaleContent(locale) {
  return localeContent[locale] || localeContent[defaultLocale];
}

export function getLocaleSite(locale) {
  return getLocaleContent(locale).site;
}
