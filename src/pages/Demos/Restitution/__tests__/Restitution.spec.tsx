import { render, screen } from 'shared/testsUtils/customRender';
import { SCOPE_PREVIEW } from 'shared/testsUtils/constants';
import {
  JeSuisUnUtilisateurConnuEtConnecteAvecleProfil,
  UnBoutonEstVisible,
  UnLienEstVisible,
  UnTitreEstVisible,
  UnTexteEstVisible,
} from 'shared/testsUtils/sharedScenarios';
import { defineFeature, loadFeature } from 'jest-cucumber';
import RestitutionPage from '../Restitution';

const feature = loadFeature('features/Demos/Restitution/Restitution.feature');

defineFeature(feature, test => {
  let role: string;

  const setRoleMock = (roleMock: string) => {
    role = roleMock;
  };

  const renderPage = async () => {
    render(<RestitutionPage />, {}, { role });
    expect(await screen.findByText(/Samuel/)).toBeInTheDocument();
  };

  test('Affichage du playground Restitution', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when('J’accède à la page démo du Restitution', renderPage);
    UnTitreEstVisible(then);
    UnLienEstVisible(and);
    UnLienEstVisible(and);
    UnLienEstVisible(and);
    UnBoutonEstVisible(and);
    UnTexteEstVisible(and, SCOPE_PREVIEW);
  });
});
