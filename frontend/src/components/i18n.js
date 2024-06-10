import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        how_to_use: "How to use the translator",
        step1:
          "1. Select the <b>Source</b> and <b>Target Languages and Modalities</b>.",
        step2:
          "2. Enter <b>Text</b> in the box, upload a <b>File</b>, or record a <b>Speech</b> or <b>Signs</b>.",
        step3: "3. Click on <b>Translate</b> to get the translation.",
        step4:
          "4. Click on <b>Reset</b> to clear the current translation and start a new.",
      },
    },
    it: {
      translation: {
        how_to_use: "Come usare il traduttore",
        step1:
          "1. Seleziona le <b>Lingue e Modalità di Origine</b> e <b>Destinazione</b>.",
        step2:
          "2. Inserisci <b>Testo</b> nella casella, carica un <b>File</b>, o registra un <b>Discorso</b> o <b>Segni</b>.",
        step3: "3. Clicca su <b>Traduci</b> per ottenere la traduzione.",
        step4:
          "4. Clicca su <b>Reset</b> per cancellare la traduzione corrente e iniziare una nuova.",
      },
    },
  },
  lng: "en", // Lingua di default
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // importante per prevenire l'escape di caratteri HTML
  },
});

export default i18n;
