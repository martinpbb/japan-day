import React, { useEffect } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Program from "./components/Program.jsx";
import Performers from "./components/Performers.jsx";
import PerformerDetail from "./components/PerformerDetail.jsx";
import Gastronomy from "./components/Gastronomy.jsx";
import Children from "./components/Children.jsx";
import Exhibitors from "./components/Exhibitors.jsx";
import VideoSection from "./components/VideoSection.jsx";
import Gallery from "./components/Gallery.jsx";
import PracticalInfo from "./components/PracticalInfo.jsx";
import Contact from "./components/Contact.jsx";
import Partners from "./components/Partners.jsx";
import Footer from "./components/Footer.jsx";
import PageIntro from "./components/PageIntro.jsx";
import Breadcrumbs from "./components/Breadcrumbs.jsx";
import SmartsuppChat from "./components/SmartsuppChat.jsx";
import SEO from "./seo/SEO.jsx";
import { buildPerformerRoute } from "./seo/performerRoute.js";
import { useI18n } from "./lib/i18n.jsx";
import { stripLocalePrefix } from "./lib/i18nPaths.js";

const pageComponents = {
  "/program": Program,
  "/ucinkujici": Performers,
  "/gastronomie": Gastronomy,
  "/pro-deti": Children,
  "/vystavovatele": Exhibitors,
  "/prakticke-informace": PracticalInfo,
  "/galerie": Gallery,
  "/o-akci": About,
  "/kontakt": Contact
};

function normalizePath(pathname) {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}

function getPerformerFromPath(path, performers) {
  const match = path.match(/^\/ucinkujici\/([^/]+)$/);
  if (!match) return null;
  return performers.items.find((item) => item.id === decodeURIComponent(match[1])) || null;
}

function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Program />
      <Children compact />
      <Performers />
      <Gastronomy compact />
      <Exhibitors />
      <VideoSection />
      <Gallery />
      <PracticalInfo />
      <Partners />
    </main>
  );
}

function SubPage({ path, route }) {
  const Content = pageComponents[path];
  if (!Content) return null;
  return (
    <main>
      <Breadcrumbs current={route.breadcrumb || route.h1} />
      <PageIntro title={route.h1} intro={route.intro} />
      <Content />
    </main>
  );
}

function PerformerPage({ performer, route }) {
  return (
    <main>
      <Breadcrumbs current={route.breadcrumb} parent={route.breadcrumbParent} />
      <PageIntro title={route.h1} intro={route.intro} />
      <PerformerDetail performer={performer} />
    </main>
  );
}

export default function App() {
  const { content } = useI18n();
  const { seo, performers } = content;
  const path = normalizePath(stripLocalePrefix(window.location.pathname));
  const performer = getPerformerFromPath(path, performers);
  const performerRoute = performer ? buildPerformerRoute(performer) : null;
  const route = performerRoute || seo.routes[path] || seo.routes["/"];
  const isKnown = Boolean(performerRoute || seo.routes[path]);

  useEffect(() => {
    if (window.location.hash) {
      window.requestAnimationFrame(() => document.querySelector(window.location.hash)?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [path]);

  return (
    <>
      <SmartsuppChat />
      <SEO path={isKnown ? path : "/"} route={route} />
      <Header />
      {performer ? (
        <PerformerPage performer={performer} route={route} />
      ) : path === "/" || !isKnown ? (
        <HomePage />
      ) : (
        <SubPage path={path} route={route} />
      )}
      <Footer />
    </>
  );
}
