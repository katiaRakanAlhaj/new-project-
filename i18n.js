import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from "./locale/en.json";
import arJSON from "./locale/ar.json";

const resources = {
  en: {
    translation: enJSON,
  },
  ar: {
    translation: arJSON,
  },
};

const language = localStorage.getItem("language") || "en";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  debug: true,
  resources: { ...resources },
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  lng: language,
});

export default i18n;
