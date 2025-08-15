import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
import enTranslations from './locales/en.json';
import zhTranslations from './locales/zh-TW.json';
import frTranslations from './locales/fr.json';

const resources = {
  en: {
    translation: enTranslations
  },
  'zh-TW': {
    translation: zhTranslations
  },
  fr: {
    translation: frTranslations
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false // react already does escaping
    }
  });

export default i18n;