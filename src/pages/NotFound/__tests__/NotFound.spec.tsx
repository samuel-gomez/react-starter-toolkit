import { screen } from '@testing-library/react';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { renderWithWrapperStaticRouter, emptyFunction } from 'shared/testsUtils';
import NotFound from '../NotFound';

const feature = loadFeature('src/pages/NotFound/NotFound.feature');

defineFeature(feature, test => {
  test('Chargement de la page 404', ({ given, when, then, and }) => {
    given('Je suis un utilisateur accédant à une page inconnue', emptyFunction);

    when('Je suis redirigé sur cette page', () => {
      renderWithWrapperStaticRouter(<NotFound />);
    });

    then('La page m\'affiche un titre "404notfound"', () => {
      expect(screen.getByText('404 Page Not Found')).toBeDefined();
    });

    and('La page m\'affiche le contenu suivant "The page you are looking for is not here!"', () => {
      expect(screen.getByText('The page you are looking for is not here!')).toBeDefined();
    });
  });
});
