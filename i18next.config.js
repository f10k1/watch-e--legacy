const i18next = require("i18next");
const i18nextHttpMiddleware = require("i18next-http-middleware");
const i18nBackend = require("i18next-fs-backend");

i18next.use(i18nBackend).use(i18nextHttpMiddleware.LanguageDetector).init({
    backend: {
        loadPath: './locales/{{lng}}.json',
        addPath: './locales/{{lng}}.json'
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'pl'],
});

module.exports = i18next;