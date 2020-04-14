/**
 * Created by xiaoxing on 2019-08-15.
 */

// process.cwd 是当前执行node命令时候的文件夹地址

const fs = require('fs');

const imgs = fs.readdirSync(__dirname).filter(name => /jpg|png|jpeg|bmp|gif/i.test(name));

const imgMap = {};

imgs.forEach(name => {
  let validName = name.match(/(.*)\./)[1];
  validName = validName.replace('@2x', '');
  validName = validName.replace('@3x', '');
  const extName = name.match(/\.([a-z]+)$/i)[1];
  const filename = `${validName}.${extName}`;
  if (!imgMap[validName]) {
    imgMap[validName] = `require("./${filename}")`;
  }
});

const str = `export default ${JSON.stringify(imgMap)}`;

const x = str.replace(/"require\((.*?)\)"/g, str => {
  let a = str.substring(1, str.length - 1);
  a = a.replace(/\\/g, '');
  return a;
});

fs.writeFileSync('./index.js', x);
