This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation 🚀

```
git clone my-repository-url.git
```

After that, you can run :

```
npm i
```

## Available Scripts

In the project directory, you can run:

### `npm start` 🏁

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test` or `npm t` 🔬

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run cover:local`

Launches the test runner with coverage and all warnings.

### `npm run cover` ☂

Launches the test runner with coverage and no warning (silent mode).

### `npm run test:sonar` 🗼

Launches the test runner for sonar report.

### `npm run build` 📦

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `npm run cz` ⛩

If you want a helper to respect the conventional commits naming, Commitizen give a cli interface.

![commitizen](./docs/images/commitizen.png)

### `npm run lint` 👮‍♂️

Script to launch eslint analyse.

With these plugins :

```json
"extends": [
    "react-app",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "plugins": [
    "prettier",
    "@typescript-eslint"
  ],
```

### `npm run lint:fix` 👮‍♂️⛑

Script to launch eslint analyse with auto fix.

### `npm run prettier` 🎩

Script to launch prettier analyse.

### `npm run prettier:fix` 🎩⛑

Script to launch prettier analyse with auto fix.

### `npm run check` 👍

Script to launch eslint analyse and prettier analyse with auto fix.

### `npm run prepare` 🐶

Script to launch husky installation, it's launched during the global installation.
