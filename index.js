const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");
const route = require("./public/routes");
const dataSource = require("./dataSource");

dotenv.config({ path: path.resolve('./.env') });

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
const router = express.Router();
app.use(router);

const upload = multer();

const rootPath = path.resolve("./public");
app.use(express.static(rootPath));

route.default(router, upload);

app.set("view engine", "pug");
app.set("views", path.resolve("./views"));

dataSource.default.initialize()

router.get('/', upload.none(), (req, res) => res.render("pages/home"));

app.listen(PORT);