const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs")
const multer = require("multer");
const route = require("./dist/routes");
const dataSource = require("./dataSource");
const i18next = require("./i18next.config");
const i18nextHttpMiddleware = require("i18next-http-middleware");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mysql2 = require('mysql2/promise');
const MySQLStore = require('express-mysql-session');

dotenv.config({ path: path.resolve('./.env') });

const app = express();
const PORT = process.env.PORT;

const upload = multer();

app.use(cookieParser());

const connection = mysql2.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

const sessionStore = MySQLStore({}, connection);

app.use(session({ secret: process.env.SESSION_SECRET, name: 'session', store: sessionStore, resave: false, saveUninitialized: false }));

app.use(i18nextHttpMiddleware.handle(i18next, {
    ignoreRoutes: ['/public', '/dist']
}));

global.t = i18next.t;

const locales = {}

fs.readdirSync('./locales').forEach(file => {
    locales[file.replace('.json', '')] = JSON.parse(fs.readFileSync(`./locales/${file}`))
})

app.use((req, res, next) => {
    if (req.session.lng != req.language) {
        req.session.lng = req.language;
        res.locals.locale = req.session.lng;
    }

    res.locals.translations = JSON.stringify(locales[req.language])

    i18next.changeLanguage(req.session.lng);
    next();
});

app.use(express.static(path.resolve('./public')));

const rootPath = path.resolve("./dist");
app.use(express.static(rootPath));

app.set("view engine", "pug");
app.set("views", path.resolve("./views"));

dataSource.default.initialize();

const router = express.Router();
app.use(router);

route.default(router, upload, i18next.t);

router.get('/', upload.none(), (req, res) => res.render("layouts/home", { style: 'home' }));

app.listen(PORT);