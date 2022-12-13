import { defineFeature, loadFeature } from 'jest-cucumber';
import { screen, configure } from '@testing-library/react';
import { render } from 'shared/testsUtils/customRender';
import expectLink from 'shared/testsUtils/expectLink';
import { JeSuisUnUtilisateurConnuEtConnecteAvecleProfil } from 'shared/testsUtils/sharedScenarios';
import A11yMenu from '../A11yMenu';

configure({ defaultHidden: true });

const feature = loadFeature('features/Layout/A11yMenu/A11yMenu.feature');

defineFeature(feature, test => {
  let role: string;

  const setRoleMock = (roleMock: string) => {
    role = roleMock;
  };

  const renderA11yMenu = () => {
    render(<A11yMenu />, {}, { role });
    expect(screen.getByLabelText("Menu d'accès rapide")).toBeDefined();
  };

  test("Menu d'accès rapide", ({ given, when, then }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when("Je suis sur l'application", renderA11yMenu);
    then("un menu d'accès rapide est présent", () => {
      expectLink({ name: 'Passer directement au contenu principal', href: '#main-content' });
      expectLink({ name: 'Accès rapide au menu principal', href: '#mainmenu' });
    });
  });
});
