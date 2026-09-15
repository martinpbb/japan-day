import { useEffect } from "react";
import seo from "../data/seo.json";

let smartsuppInitialized = false;
const SMARTSUPP_KEY = "bc955f82abb1e2ce11cf5a729c9461f0324d7534";

function getSmartsuppLanguage() {
  return seo.language === "en-GB" ? "en" : "cs";
}

export default function SmartsuppChat() {
  useEffect(() => {
    if (smartsuppInitialized || window.smartsupp) return;

    smartsuppInitialized = true;

    try {
      window._smartsupp = window._smartsupp || {};
      window._smartsupp.key = SMARTSUPP_KEY;
      window.smartsupp = window.smartsupp || function (...args) {
        window.smartsupp._.push(args);
      };
      window.smartsupp._ = window.smartsupp._ || [];
      window.smartsupp("language", getSmartsuppLanguage());

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.charset = "utf-8";
      script.async = true;
      script.src = "https://www.smartsuppchat.com/loader.js?";

      const firstScript = document.getElementsByTagName("script")[0];
      if (firstScript?.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.head.appendChild(script);
      }
    } catch {
      // A chat failure must not affect the rest of the application.
    }
  }, []);

  return null;
}
