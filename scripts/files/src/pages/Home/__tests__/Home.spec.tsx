import { defineFeature, loadFeature } from 'jest-cucumber';
import { screen, configure } from '@testing-library/react';
import { render } from 'shared/testsUtils/customRender';
import { JeSuisUnUtilisateurConnuEtConnecteAvecleProfil, UnTitreEstVisible } from 'shared/testsUtils/sharedScenarios';
import Home from '../Home';

configure({ defaultHidden: true });

const feature = loadFeature('features/Home/Home.feature');

defineFeature(feature, test => {
  let role: string;

  const setRoleMock = (roleMock: string) => {
    role = roleMock;
  };

  const renderPage = async () => {
    render(<Home />, {}, { role });
    expect(await screen.findByText('Samuel Gomez')).toBeInTheDocument();
  };

  test("Affichage de la page d'accueil", ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when("J'accède à la page accueil", renderPage);
    UnTitreEstVisible(then);
  });
});
