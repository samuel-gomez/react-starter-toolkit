/* eslint-disable no-console */
/* eslint-disable no-return-await */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-destructuring */
const cucumber = require('cypress-cucumber-preprocessor').default;
const exec = require('child_process').execSync;
const { pa11y } = require('@cypress-audit/pa11y');
const ecoIndex = require('@cnumr/eco-index-audit/src/main');
const { lighthouse, prepareAudit } = require('@cypress-audit/lighthouse');
const aggregateGreenItReports = require('@cnumr/lighthouse-eco-index-aggregator/src/main');
const { lighthouseCallback } = require('../green-it/lighthouse/lighthouse-callback');
const { buildEcoIndexArgs } = require('../green-it/eco-index/eco-index-args-builder');
const { buildAggregatorArgs, shouldRunAggregator } = require('../green-it/aggregator/aggregator-args-builder');

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);

    const remoteDebuggingPort = launchOptions.args.find((configuration) => configuration.startsWith('--remote-debugging-port'));
    const remoteDebuggingAddress = launchOptions.args.find((configuration) => configuration.startsWith('--remote-debugging-address'));
    if (remoteDebuggingPort) {
      global.remote_debugging_port = remoteDebuggingPort.split('=')[1];
    }
    if (remoteDebuggingAddress) {
      global.remote_debugging_address = remoteDebuggingAddress.split('=')[1];
    }
  });
  on('before:run', async (details) => {
    // await exec('IF EXIST cypress\\screenshots rmdir /Q /S cypress\\screenshots');
    // await exec('IF EXIST cypress\\reports rmdir /Q /S cypress\\reports');
  });
  on('after:run', async () => {
    if (shouldRunAggregator()) {
      await aggregateGreenItReports(buildAggregatorArgs());
    }
    await exec('npx jrm ./cypress/reports/report.xml ./cypress/reports/junit/*.xml');
  });
  on('file:preprocessor', cucumber());
  on('task', {
    pa11y: pa11y(),

    generateLighthouseReport: ({ options, paths }) => {
      console.log('Generating Lighthouse report...');
      const executeLighthouse = lighthouse(lighthouseCallback(options, paths));
      if (!executeLighthouse || executeLighthouse === null) {
        return null;
      }
      return executeLighthouse(options).then((response) => {
        console.log('Lighthouse results :');
        console.log(response);
        console.log('Generating Lighthouse report done.');
        return response;
      });
    },

    generateEcoIndexReport: async ({ options, paths }) => {
      console.log('Generating Eco-index report...');
      return await ecoIndex(buildEcoIndexArgs(options, paths), true).then((response) => {
        console.log('Eco-index results :');
        console.log(response);
        console.log('Generating Eco-index report done.');
        return response;
      });
    },

    log(message) {
      console.log(message);
      return null;
    },
  });
};
