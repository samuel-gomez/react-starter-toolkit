const { defineConfig } = require('cypress');

module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
    baseUrl: 'https://react-starter-toolkit.netlify.app',
    specPattern: 'cypress/e2e/**/*.feature',
  },
  video: false,
  numTestsKeptInMemory: 10,
  screenshotsFolder: 'cypress/reports/screenshots',
});
