/* eslint-disable no-undef */
/// <reference types="Cypress" />
import {
  LIGHTHOUSE_THRESHOLDS,
  LIGHTHOUSE_OPTIONS,
  LIGHTHOUSE_CONFIG,
  LIGHTHOUSE_PATHS,
  LIGHTHOUSE_REPORT_OPTIONS,
} from '../green-it/lighthouse/lighthouse-config';
import { ECOINDEX_OPTIONS, ECOINDEX_PATHS } from '../green-it/eco-index/eco-index-config';

Cypress.Commands.add('configureGreenItReportsGeneration', ({ screen, url }) => {
  const filename = `${screen}`;
  cy.wrap(url).as('green-it-url');
  cy.wrap(filename).as('green-it-rapport');
});

Cypress.Commands.add('executeLighthouseReportGeneration', ({ url, filename, token }) => {
  LIGHTHOUSE_CONFIG.settings.token = token;
  cy.task('generateLighthouseReport', {
    options: {
      url,
      thresholds: LIGHTHOUSE_THRESHOLDS,
      opts: LIGHTHOUSE_OPTIONS,
      config: LIGHTHOUSE_CONFIG,
      filename,
      reportOptions: LIGHTHOUSE_REPORT_OPTIONS,
    },
    paths: LIGHTHOUSE_PATHS,
  });
});

Cypress.Commands.add('generateEcoIndexReport', ({ url, filename, token }) => {
  const generateEcoIndexReportTask = cy.task('generateEcoIndexReport', {
    options: {
      url,
      filename,
      visits: ECOINDEX_OPTIONS.visits,
      token,
      beforeScript: ECOINDEX_OPTIONS.beforeScript,
      afterScript: ECOINDEX_OPTIONS.afterScript,
      globals: ECOINDEX_OPTIONS.globals({ token }),
      output: ECOINDEX_OPTIONS.output,
      waitForSelector: ECOINDEX_OPTIONS.waitForSelector,
    },
    paths: {
      outputPathDir: ECOINDEX_PATHS.reportsPath,
      outputFileName: filename,
    },
  });
  if (ECOINDEX_OPTIONS.checkThresholds) {
    generateEcoIndexReportTask.its('ecoIndex').should('be.greaterThan', ECOINDEX_OPTIONS.ecoIndex);
  }
});

Cypress.Commands.add('checkGreenItReports', ({ filename }) => {
  const lighthouseReportPath = `${LIGHTHOUSE_PATHS.lighthouseReportsPath}${filename}.json`;
  const ecoIndexReportPath = `${ECOINDEX_PATHS.reportsPath}/${filename}.json`;
  cy.readFile(lighthouseReportPath);
  cy.readFile(ecoIndexReportPath);
});
