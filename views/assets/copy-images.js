const fs = require('fs');
const path = require('path');

if (!fs.existsSync(`../../public/images`)) {
    fs.mkdirSync(`../../public/images`);
}

fs.readdirSync(`./images`).forEach(file => {
    fs.copyFileSync('./images/'+file, '../../public/images/'+file)
});
