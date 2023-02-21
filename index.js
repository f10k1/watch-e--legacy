const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const path = require("path");

const router = express.Router();
app.use(router);

const rootPath = path.resolve("./public");
app.use(express.static(rootPath));

route = require("./app/routes");
route.appRoute(router);

app.set("view engine", "pug");
app.set("views", path.resolve("./app/views"));

router.get('/', (req, res) => res.render("layouts/home"))

app.listen(PORT, console.log("Server don start for port: " + PORT))