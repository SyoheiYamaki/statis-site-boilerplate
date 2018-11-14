const { inlineSource } = require('inline-source');
const fs = require('fs');

const dir_in = './src/';
const dir_out = './public/';

// ファイル名の一覧
const filenames = fs.readdirSync(dir_in);

var fileList = filenames.filter(function (file) {
    return /.*\.html$/.test(file); //絞り込み
});

function setInline(target) {
  inlineSource(dir_in + target, {
    compress: false
  })
  .then(html => {
    fs.writeFileSync(dir_out + target, html);
  });
};

fileList.forEach(function (name) {
  setInline(name);
});