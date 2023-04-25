import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importar los archivos de localización
import esTranslation from "./locale/es.json";

// Configurar i18next
i18n.use(initReactI18next).init({
  resources: {
    es: {
      translation: esTranslation
    }
  },
  lng: "es", // Lenguaje predeterminado
  fallbackLng: "es", // Lenguaje de reserva
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
