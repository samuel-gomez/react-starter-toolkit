import React from 'react';
import { render } from '@testing-library/react';
import { defineFeature, loadFeature } from 'jest-cucumber';
import Members from '..';
import { computeInfos } from '../Members.hook';

const feature = loadFeature('./src/Members/__tests__/Members.feature');

export const defaultProps = {
  header: () => {},
  title: () => {},
  footer: () => {},
  menu: () => {},
  loaderMode: 'none',
};

export const defaultUseMembersProps = {
  anomaly: null,
  isLoading: false,
  members: [],
  onChangeSorting: jest.fn(),
  stateSorting: {
    field: 'name',
    order: true,
  },
  onChangePaging: jest.fn(),
  numberItems: 50,
  currentPage: 1,
  numberPages: 1,
};

export const renderMembers = ({ membersData = [], useMembersProps = defaultUseMembersProps }) => {
  const members = computeInfos({ members: membersData });
  const useMembersFnMock = jest.fn().mockReturnValue({
    ...useMembersProps,
    members,
  });
  return render(<Members {...defaultProps} useMembersFn={useMembersFnMock} />);
};

export const givenJeSuisUnUtilisateurConnuEtConnecte = given => given('Je suis un utilisateur connu et connecté', () => {});

defineFeature(feature, test => {
  let $;

  test('Affichage de la liste des sociétaires', ({ given, when, then, and }) => {
    givenJeSuisUnUtilisateurConnuEtConnecte(given);

    when('J’accède à la page des sociétaires', () => {
      $ = renderMembers({
        membersData: [
          {
            _id: '00001',
            firstname: 'Samuel',
            lastname: 'Gomez',
            birthdate: '1985-10-20T00:00:00',
            sexe: 'M',
          },
        ],
      });
    });

    then('la page contient un tableau répertoriant la liste des sociétaires', () => {
      expect($.getByRole('table')).toBeInTheDocument();
    });

    and(/^le tableau présente 4 colonnes dans l\’ordre suivant : ’Nom’, ‘Prénom’, ‘Date de naissance’, ‘sexe’$/, arg0 => {
      expect($.container.querySelector('thead.af-table__thead')).toBeInTheDocument();
      expect($.container.querySelector('tr.af-table__tr')).toBeInTheDocument();
      expect($.container.querySelector('th.af-table__th:nth-child(1)')).toHaveTextContent(/Prénom/i);
      expect($.container.querySelector('th.af-table__th:nth-child(2)')).toHaveTextContent(/Nom/i);
      expect($.container.querySelector('th.af-table__th:nth-child(3)')).toHaveTextContent(/Date de naissance/i);
      expect($.container.querySelector('th.af-table__th:nth-child(4)')).toHaveTextContent(/Sexe/i);
    });

    and(
      'le tableau contient 1 ligne correspondant à un sociétaire avec 4 colonnes dans l’ordre suivant :’Samuel’, ‘Gomez’, ‘20/10/1985’, ‘M’',
      (arg0, arg1, arg2, arg3, arg4) => {
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
