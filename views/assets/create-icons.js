const fs = require('fs');
const path = require('path');

if (!fs.existsSync(`../../public/icons`)) {
    fs.mkdirSync(`../../public/icons`);
}

const filelist = [];

fs.readdirSync(`./icons`).forEach(file => {
    filelist.push(file.split('.').slice(0, -1).join('.'));
    fs.copyFileSync('./icons/'+file, '../../public/icons/'+file)
});

const iconslist = filelist.map(file => `.icon--${file} { mask: url(../icons/${file}.svg); -webkit-mask: url(../icons/${file}.svg) }`);
if (!fs.existsSync(`../../public/css`)) {
    fs.mkdirSync(`../../public/css`);
}

fs.writeFileSync(`../../public/css/icons.css`, `${iconslist.join(' ')} [class^=icon--],[class*=" icon--"]{width:24px;height:24px;display:block;-webkit-mask-size:cover;mask-size:cover;background-color:#000;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:50% 50%;mask-position:50% 50%;}`);