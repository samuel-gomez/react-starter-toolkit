import { render, screen } from 'shared/testsUtils/customRender';
import { emptyFunction } from 'shared/testsUtils';
import {
  JeSuisUnUtilisateurConnuEtConnecteAvecleProfil,
  UnAideALaSaisieEstVisible,
  UnBoutonEstDesactive,
  UnChampTextEstVisibleAvecLaValeurEtUnPlaceholder,
  UnLabelEstVisible,
  UnTitreEstVisible,
} from 'shared/testsUtils/sharedScenarios';
import { defineFeature, loadFeature } from 'jest-cucumber';
import SearchMembers from '..';

const feature = loadFeature('features/Demos/SearchMembers/SearchMembers.feature');

defineFeature(feature, test => {
  let role: string;

  const defaultProps = {
    distributors: [],
    anomaly: { distributors: null },
    loaderMode: 'none',
    submitSearch: emptyFunction,
  };

  test('Affichage du moteur de recherche', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, (roleMock: string) => {
      role = roleMock;
    });

    when('J’accède à la page des téléchargements', async () => {
      render(<SearchMembers {...defaultProps} />, {}, { role });
      expect(await screen.findByText(/Samuel/)).toBeInTheDocument();
    });

    UnTitreEstVisible(then);
    UnChampTextEstVisibleAvecLaValeurEtUnPlaceholder(and);
    UnLabelEstVisible(and);
    UnAideALaSaisieEstVisible(and);
    UnBoutonEstDesactive(and);
    UnTitreEstVisible(and, 2);
  });
});
