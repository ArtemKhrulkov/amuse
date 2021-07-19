import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translateEn from './i18n/en.json';
import translateRu from './i18n/ru.json';

const resources = {
  en: translateEn,
  ru: translateRu
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'en',
});

export default i18n;
