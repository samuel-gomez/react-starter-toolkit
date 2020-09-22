import React from 'react';
import { render } from '@testing-library/react';
import { StaticRouter } from 'react-router-dom';
import { defineFeature, loadFeature } from 'jest-cucumber';
import Unauthorize from './Unauthorize';

const wrapper = ({ children }) => <StaticRouter context={{}}>{children}</StaticRouter>;

const feature = loadFeature('src/Unauthorize/Unauthorize.feature');

defineFeature(feature, test => {
  test('Chargement de la page 403', ({ given, when, then, and }) => {
    let $;
    given('Je suis un utilisateur accédant à une page non autorisée', () => {});

    when('Je suis redirigé sur cette page', () => {
      $ = render(<Unauthorize />, { wrapper });
    });

    then(/^La page m'affiche un titre "403notauthorized"$/, () => {
      expect($.getByText('403 Forbidden')).toBeDefined();
    });

    and(/^La page m'affiche le contenu suivant "The page you are looking for is forbidden !"$/, () => {
      expect($.getByText('The page you are looking for is forbidden !')).toBeDefined();
    });
  });
});
