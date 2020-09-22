import React from 'react';
import { render } from '@testing-library/react';
import { StaticRouter } from 'react-router-dom';
import { defineFeature, loadFeature } from 'jest-cucumber';
import NotFound from './NotFound';

const wrapper = ({ children }) => <StaticRouter context={{}}>{children}</StaticRouter>;

const feature = loadFeature('src/NotFound/NotFound.feature');

defineFeature(feature, test => {
  test('Chargement de la page 404', ({ given, when, then }) => {
    let $;

    given('Je suis un utilisateur accédant à une page inconnue', () => {});

    when('Je suis redirigé sur cette page', () => {
      $ = render(<NotFound />, { wrapper });
    });

    then('La page m\'affiche un titre "404notfound"', () => {
      expect($.getByText('404 Page Not Found')).toBeDefined();
    });

    then('La page m\'affiche le contenu suivant "The page you are looking for is not here!"', () => {
      expect($.getByText('The page you are looking for is not here!')).toBeDefined();
    });
  });
});
