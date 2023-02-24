const fs = require('fs');
const path = require('path');

if (!fs.existsSync(`../../public/fonts`)) {
    fs.mkdirSync(`../../public/fonts`);
}

fs.readdirSync(`./fonts`).forEach(file => {
    fs.copyFileSync('./fonts/'+file, '../../public/fonts/'+file)
});
