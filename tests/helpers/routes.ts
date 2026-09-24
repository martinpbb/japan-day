import { localeCodes, prefixFor, type Locale } from "./locales";

export const routes = ["/", "/program", "/ucinkujici", "/gastronomie", "/pro-deti", "/vystavovatele", "/prakticke-informace", "/galerie", "/o-akci", "/kontakt"] as const;
export const headerRoutes = ["/o-akci", "/program", "/ucinkujici", "/gastronomie", "/vystavovatele", "/galerie", "/kontakt"] as const;
export type Route = typeof routes[number];
export const localizedRoutes = (locale: Locale) => routes.map((route) => prefixFor(locale, route));
export const routeFor = (locale: Locale, route: string) => prefixFor(locale, route as Route);
