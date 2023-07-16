/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
/// <reference types="Cypress" />
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given("Je veux mesurer la performance Green IT de la page d'accueil", () => {
  const screen = 'Accueil';
  const url = `${Cypress.config('baseUrl')}`;
  cy.configureGreenItReportsGeneration({ screen, url });
});

When("Je mesure la performance Green IT de l'écran", () => {
  cy.get('@green-it-url').then((url) => {
    cy.get('@green-it-rapport').then((filename) => {
      cy.executeLighthouseReportGeneration({ url, filename, token: 'Mon token' });
      cy.generateEcoIndexReport({ url, filename, token: 'Mon token' });
    });
  });
});

Then("La performance Green IT de l'écran doit être correctement mesurée", () => {
  cy.get('@green-it-rapport').then((filename) => {
    cy.checkGreenItReports({ filename });
  });
});
