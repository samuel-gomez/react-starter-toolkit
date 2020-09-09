import React from 'react';
import { render } from '@testing-library/react';
import { defineFeature, loadFeature } from 'jest-cucumber';
import Members from './Members';

const feature = loadFeature('./src/Members/Members.feature');

defineFeature(feature, test => {
  let $;

  const defaultProps = {
    header: () => {},
    title: () => {},
    footer: () => {},
    members: [],
    anomaly: null,
    loaderMode: 'none',
    deleteNotification: () => {},
    notifications: [],
  };

  test('Affichage de la liste des sociétaires', ({ given, when, then }) => {
    given('Je suis un utilisateur connu et connecté', () => {});

    when('J’accède à la page des sociétaires', () => {
      $ = render(
        <Members
          {...defaultProps}
          members={[
            {
              _id: '00001',
              firstname: 'Samuel',
              lastname: 'Gomez',
              birthdate: '20/10/1985',
              sexe: 'M',
            },
          ]}
        />,
      );
    });

    then('la page contient un tableau répertoriant la liste des sociétaires', () => {
      expect($.getByRole('table')).toBeInTheDocument();
    });

    then('le tableau présente 3 colonnes dans l’ordre suivant : ’Nom’, ‘Prénom’, ‘Date de naissance’, ‘type’', () => {
      expect($.container.querySelector('thead.af-table-thead')).toBeInTheDocument();
      expect($.container.querySelector('tr.af-table__tr')).toBeInTheDocument();
      expect($.container.querySelector('th.af-table__th:nth-child(1)')).toHaveTextContent(/Prénom/i);
      expect($.container.querySelector('th.af-table__th:nth-child(2)')).toHaveTextContent(/Nom/i);
      expect($.container.querySelector('th.af-table__th:nth-child(3)')).toHaveTextContent(/Date de naissance/i);
      expect($.container.querySelector('th.af-table__th:nth-child(4)')).toHaveTextContent(/Sexe/i);
    });

    then(
      'le tableau contient 1 ligne correspondant à un sociétaire avec 3 colonnes dans l’ordre suivant :’Samuel’, ‘Gomez’, ‘20/10/1985’, ‘PP’',
      () => {
        expect($.container.querySelector('tbody.af-table__body')).toBeInTheDocument();
        expect($.container.querySelector('tr.af-table__tr')).toBeInTheDocument();
        expect($.container.querySelector('td.af-table__cell:nth-child(1)')).toHaveTextContent(/Samuel/i);
        expect($.container.querySelector('td.af-table__cell:nth-child(2)')).toHaveTextContent(/Gomez/i);
        expect($.container.querySelector('td.af-table__cell:nth-child(3)')).toHaveTextContent(/20\/10\/1985/i);
        expect($.container.querySelector('td.af-table__cell:nth-child(4)')).toHaveTextContent(/M/i);
      },
    );
  });
});
