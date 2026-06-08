import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import ko from './locales/ko.json';

const resources = {
  en: {
    translation: en,
  },
  ko: {
    translation: ko,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ko', // 기본 언어를 한국어로 설정 (필요시 'en'으로 변경)
    interpolation: {
      escapeValue: false, // React는 이미 XSS 공격을 방지하므로 false로 설정
    },
  });

const updateDocumentLanguage = (language: string) => {
  document.documentElement.lang = language.startsWith('ko') ? 'ko' : 'en';
};

updateDocumentLanguage(i18n.resolvedLanguage ?? i18n.language);
i18n.on('languageChanged', updateDocumentLanguage);

export default i18n;
