import fs from 'fs-extra';

function deleteFolderRecursive(path) {
  if (!fs.existsSync(path)) return console.log(`${path} does not exist!`);
  if (fs.existsSync(path)) {
    if (fs.lstatSync(path).isDirectory()) {
      fs.readdirSync(path).forEach(function (file) {
        const curPath = `${path}/${file}`;

        if (fs.lstatSync(curPath).isDirectory()) {
          deleteFolderRecursive(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });

      console.log(`Deleting directory "${path}"...`);
      fs.rmdirSync(path);
    } else {
      fs.unlinkSync(path);
    }
  }
}

const pathsAll = [
  './public/templates',
  './public/_redirect',
  './src/shared/images',
  './src/shared/components/LiveCode',
  './src/shared/components/Cards',
  './src/shared/components/LasyImage',
  './src/shared/components/DownloadLink',
  './src/shared/components/Editor',
  './src/pages/Demos',
  './features/Demos',
  'renovate.json',
  'netlify.toml',
  'LICENSE',
  './docs/CLEAN.md',
  '.git',
  '.github',
];

console.log('Cleaning working tree...');
pathsAll.forEach(path => deleteFolderRecursive(path));
console.log('Successfully cleaned working tree!');

function replaceContentsSync(file, replacement) {
  const contents = fs.readFileSync(replacement);
  fs.writeFileSync(file, contents);
}

const pathsReplace = [
  'package.json',
  'app.code-workspace',
  'README.md',
  '.env',
  'src/setupTests.tsx',
  'src/shared/constants.ts',
  'src/Layout/Menu/constants.ts',
  'src/Layout/Header/Header.tsx',
  'src/Layout/Header/Header.scss',
  'src/Layout/Header/constants.ts',
  'src/App/Routes/Routes.tsx',
  'src/App/Routes/constants.ts',
  'src/App/Routes/__tests__/Routes.test.tsx',
  'public/favicon.ico',
  'public/environment.development.json',
  'public/manifest.json',
  'public/index.html',
  'public/logo192.png',
  'public/logo512.png',
];

console.log('Cleaning files...');
pathsReplace.forEach(file => replaceContentsSync(`./${file}`, `./scripts/files/${file}`));
console.log('Successfully cleaned files!');

deleteFolderRecursive('./scripts');
