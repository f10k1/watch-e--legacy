"use strict";

require("dotenv").config('./.env');
const fs = require('fs');
const path = require('path');

const entities_files = fs.readdirSync(path.resolve(__dirname, './dist/database/')).filter((f) => {
    return f.endsWith('.js');
});
const migrations_files = fs.readdirSync(path.resolve(__dirname, './migrations/compiled/')).filter((f) => {
    return f.endsWith('.js');
});

const entities = []
const migrations = []

function importSth(js_files, array, path) {
    for (const f of js_files) {
        const imported = require(path+f)
        array.push(imported[Object.keys(imported)[0]])
    }
}
importSth(entities_files, entities, './dist/database/')
importSth(migrations_files, migrations, './migrations/compiled/')

Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
exports.default = new typeorm_1.DataSource({
    "type": "mysql",
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "entities": entities,
    "migrations": migrations,
});
