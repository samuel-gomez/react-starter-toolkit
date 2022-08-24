import { screen } from '@testing-library/react';
import { renderWithWrapperStaticRouter, emptyFunction } from 'shared/testsUtils';
import { defineFeature, loadFeature } from 'jest-cucumber';
import Unauthorize from '../Unauthorize';

const feature = loadFeature('src/pages/Unauthorize/Unauthorize.feature');

defineFeature(feature, test => {
  test('Chargement de la page 403', ({ given, when, then, and }) => {
    given('Je suis un utilisateur accédant à une page non autorisée', emptyFunction);

    when('Je suis redirigé sur cette page', () => {
      renderWithWrapperStaticRouter(<Unauthorize />);
    });

    then(/^La page m'affiche un titre "403notauthorized"$/, () => {
      expect(screen.getByText('403 Forbidden')).toBeDefined();
    });

    and(/^La page m'affiche le contenu suivant "The page you are looking for is forbidden !"$/, () => {
      expect(screen.getByText('The page you are looking for is forbidden !')).toBeDefined();
    });
  });
});
