import fs from 'fs-extra';
const basePath = '../';

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

const pathsDelete = [
  './public/templates',
  './public/images',
  './public/_redirect',
  './src/components/Home/Galleries',
  './src/shared/images',
  './src/shared/components/LiveCode',
  './src/shared/components/Cards',
  './src/shared/components/LazyImage',
  './src/shared/components/DownloadLink',
  './src/shared/components/Editor',
  './src/shared/testsUtils/clearString.ts',
  './src/components/Demos',
  './src/app/demos',
  './features/Demos',
  'renovate.json',
  'netlify.toml',
  'LICENSE',
  './docs/CLEAN.md',
  '.github',
  'package-lock.json',
];

console.log('Cleaning working tree...');
pathsDelete.forEach(path => deleteFolderRecursive(`${basePath}${path}`));
console.log('Successfully cleaned working tree!');

function replaceContentsSync(file, replacement) {
  const contents = fs.readFileSync(replacement);
  fs.writeFileSync(file, contents);
}

const pathsReplace = [
  'package.json',
  'next.config.js',
  'app.code-workspace',
  'README.md',
  'features/Home/Home.feature',
  'src/jest.setup.js',
  'src/next-app-env.d.ts',
  'src/shared/constants.ts',
  'src/shared/testsUtils/constants.ts',
  'src/shared/testsUtils/msw.ts',
  'src/shared/testsUtils/index.ts',
  'src/components/Home/Home.tsx',
  'src/components/Home/__tests__/Home.spec.tsx',
  'src/shared/components/Layout/Menu/constants.ts',
  'src/shared/components/Layout/Header/Header.tsx',
  'src/shared/components/Layout/Header/Header.scss',
  'src/shared/components/Layout/Header/constants.ts',
  'public/favicon.ico',
  'public/environment.development.json',
  'public/manifest.json',
  'public/logo192.png',
  'public/logo512.png',
];

console.log('Cleaning files...');
pathsReplace.forEach(file => replaceContentsSync(`${basePath}${file}`, `./files/${file}`));
console.log('Successfully cleaned files!');
