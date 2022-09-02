import { isNull } from 'lodash';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { screen, within } from '@testing-library/react';
import { render } from 'shared/testsUtils/customRender';
import { JeSuisUnUtilisateurConnuEtConnecteAvecleProfil } from 'shared/testsUtils/sharedScenarii';
import Members from '..';
import { totals, defaultProps } from './Members.mock';

const feature = loadFeature('./src/pages/demos/Members/__tests__/Members.feature');

defineFeature(feature, test => {
  let role;
  let members;
  let tableMembers;

  const LeTableauPresenteDesEntetesDeColonnesDansLOrdreSuivant = (instruction, headers) =>
    instruction(`le tableau présente des entêtes de colonnes dans l’ordre suivant : ${headers}`, (...args) => {
      const thead = within(tableMembers).getByRole('rowgroup', { selector: 'thead', name: 'table-header' });
      const theadLine = within(thead).getByRole('row', { name: 'table-header-line' });
      const cells = within(theadLine).getAllByRole('columnheader');
      args
        .filter(item => !isNull(item))
        .forEach((headerLabel, index) => {
          expect(cells[index]).toHaveTextContent(RegExp(headerLabel));
        });
    });

  const LeTableauContientLesLignesCorrespondantAuxDonneesRecues = (instruction, scenarioName) =>
    instruction(`${scenarioName}`, candidats => {
      const tbody = within(tableMembers).getByRole('rowgroup', { selector: 'tbody', name: 'table-body' });
      const tbodyLines = within(tbody).getAllByRole('row', { name: 'table-body-line' });

      tbodyLines.forEach((tbodyLine, index) => {
        const cells = within(tbodyLine).getAllByRole('cell');
        Object.values(candidats[index]).forEach((bodyCell, indexCell) => {
          expect(cells[indexCell]).toHaveTextContent(bodyCell);
        });
      });
    });

  test('Affichage de la liste des membres', ({ given, and, when, then }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, roleMock => {
      role = roleMock;
    });

    and('la page reçoit les membres suivants', membersMock => {
      members = membersMock;
    });

    when("J'accède à la page des membres", async () => {
      render(<Members {...defaultProps} />, {}, { role, responseBody: { totals, data: members } });
      expect(await screen.findByText('Samuel')).toBeInTheDocument();
    });

    then('la page contient un tableau répertoriant la liste des membres', () => {
      tableMembers = screen.getByRole('table', {
        name: /Tableau Liste des membres/i,
      });
      expect(tableMembers).toBeInTheDocument();
    });

    LeTableauPresenteDesEntetesDeColonnesDansLOrdreSuivant(and, `"Nom", "Prénom", "Date de naissance", "Sexe"`);

    LeTableauContientLesLignesCorrespondantAuxDonneesRecues(
      and,
      "le tableau contient 4 lignes correspondant à un sociétaire avec 4 colonnes dans l'ordre suivant :",
    );
  });
});
