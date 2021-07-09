import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'sign-in': 'Sign In',
      'sign-in-with-gmail': 'With Gmail',
      'sign-in-with-vk': 'With VK',
      'sign-in-with-instagram': 'With Instagram',
      'remember-me': 'Remember me',
    },
  },
  ru: {
    translation: {
      'sign-in': 'Войти',
      'sign-in-with-gmail': 'С помощью Gmail',
      'sign-in-with-vk': 'С помощью VK',
      'sign-in-with-instagram': 'С помощью Instagram',
      'remember-me': 'Запомнить',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'en',
});

export default i18n;
