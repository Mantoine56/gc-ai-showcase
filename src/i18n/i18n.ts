import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import English translations
import enCommon from './locales/en/common.json';
import enPages from './locales/en/pages.json';
import enForms from './locales/en/forms.json';
import enValidation from './locales/en/validation.json';
import enEnums from './locales/en/enums.json';
import enComponents from './locales/en/components.json';

// Import French translations
import frCommon from './locales/fr/common.json';
import frPages from './locales/fr/pages.json';
import frForms from './locales/fr/forms.json';
import frValidation from './locales/fr/validation.json';
import frEnums from './locales/fr/enums.json';
import frComponents from './locales/fr/components.json';

const resources = {
  en: {
    common: enCommon,
    pages: enPages,
    forms: enForms,
    validation: enValidation,
    enums: enEnums,
    components: enComponents,
  },
  fr: {
    common: frCommon,
    pages: frPages,
    forms: frForms,
    validation: frValidation,
    enums: frEnums,
    components: frComponents,
  },
};

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en', // Default language
    defaultNS: 'common',
    ns: ['common', 'pages', 'forms', 'validation', 'enums', 'components'],

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      // Order of detection methods
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    react: {
      useSuspense: false, // Disable suspense for simplicity
    },
  });

export default i18n;
