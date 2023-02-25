const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");
const route = require("./dist/routes");
const dataSource = require("./dataSource");
const i18next = require("i18next");
const i18nextHttpMiddleware = require("i18next-http-middleware");
const i18nBackend = require("i18next-fs-backend");
dotenv.config({ path: path.resolve('./.env') });

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
const router = express.Router();
app.use(router);

const upload = multer();

i18next.use(i18nBackend).use(i18nextHttpMiddleware.LanguageDetector).init({
    backend: {
        loadPath: './locales/{{lng}}.json',
        addPath: './locales/{{lng}}.json'
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'pl'],
});

app.use(i18nextHttpMiddleware.handle(i18next, {
    ignoreRoutes: ['/public', '/disc']
}));

app.use((req, res, next) => {
    if (global.locale != req.language) {
        if (req.language === undefined) req.language = 'en'
        console.log(req.language)
        global.locale = req.language;
        i18next.changeLanguage(req.language);
    }

    next();
});

app.locals.__ = i18next.t;

app.use(express.static(path.resolve('./public')));

const rootPath = path.resolve("./dist");
app.use(express.static(rootPath));

route.default(router, upload);

app.set("view engine", "pug");
app.set("views", path.resolve("./views"));

dataSource.default.initialize();

router.get('/', upload.none(), (req, res) => res.render("pages/home", { style: 'home' }));

app.listen(PORT);