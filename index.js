const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const passport = require("passport");
const route = require("./dist/routes");
const dataSource = require("./dataSource");
const i18next = require("./i18next.config");
const i18nextHttpMiddleware = require("i18next-http-middleware");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mysql2 = require('mysql2/promise');
const MySQLStore = require('express-mysql-session');
const { randomBytes } = require("crypto");
const ws = require("ws");
const WsRoutes = require('./dist/routes').WsRoutes;

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

const sessionParser = session({
    secret: process.env.SESSION_SECRET,
    name: 'session',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    sameSite: 'lax'
});

app.use(sessionParser);

app.use(passport.authenticate('session'));

app.use(i18nextHttpMiddleware.handle(i18next, {
    ignoreRoutes: ['/public', '/dist']
}));

global.t = i18next.t;

const locales = {};

fs.readdirSync('./locales').forEach(file => {
    locales[file.replace('.json', '')] = JSON.parse(fs.readFileSync(`./locales/${file}`));
});

app.use(express.static(path.resolve('./public')));

app.use(express.static(path.resolve("./dist")));

app.set("view engine", "pug");
app.set("views", path.resolve("./views"));

dataSource.default.initialize();

const router = express.Router();

router.use((req, res, next) => {
    if (req.session.lng != req.language) {
        req.session.lng = req.language;
        res.locals.locale = req.session.lng;
    }

    if (res.locals.pageTitle === undefined) {
        res.locals.pageTitle = 'Watch-e';
    }

    if (res.locals.translations === undefined) {
        res.locals.translations = JSON.stringify(locales[req.language]);
    }

    if (req.session.csrf === undefined) {
        req.session.csrf = randomBytes(100).toString('base64');
    }

    if (res.locals.csrf === undefined) {
        res.locals.csrf = req.session.csrf;
    }

    res.locals.user = req.user;

    i18next.changeLanguage(req.session.lng);
    next();
});

app.use(router);

route.default(router, upload, i18next.t);

router.get('/', upload.none(), (req, res) => res.render("layouts/home", { style: 'home' }));

const UsersMap = new Map();

const server = app.listen(PORT);

const wsServer = new ws.Server({ noServer: true });

server.on('upgrade', (request, socket, head) => {

    socket.on('error', (err) => console.error(err));

    sessionParser(request, {}, () => {

        if (!request.session.passport?.user) {
            socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
            socket.destroy();
            return;
        }

        wsServer.handleUpgrade(request, socket, head, socket => {
            wsServer.emit('connection', socket, request);
        });

    });
});

wsServer.on('connection', (socket, req) => {
    const user = req.session.passport.user;
    const pathname = req.url;
    let message;
    UsersMap.set(user.id, socket);

    if (!WsRoutes.get(pathname)) {
        socket.write('HTTP/1.1 404 Not Found\r\n\r\n');
    }

    socket.on('close', function () {
        cleanup(user);
        UsersMap.delete(user);
    });
});