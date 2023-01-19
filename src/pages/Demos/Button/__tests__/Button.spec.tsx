import { configure, render, screen } from 'shared/testsUtils/customRender';
import {
  JeCliqueSurLeBouton,
  JeSelectionneUneValeurSurleChamp,
  JeSuisUnUtilisateurConnuEtConnecteAvecleProfil,
  UnBoutonEstVisible,
  UnEditeurEstVisible,
  UnIconeEstVisible,
  UnLienEstVisible,
  UnTitreEstVisible,
} from 'shared/testsUtils/sharedScenarios';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { SCOPE_PREVIEW } from 'shared/testsUtils/constants';
import ButtonPage from '../Button';

configure({ defaultHidden: true });

const feature = loadFeature('features/Demos/Button/Button.feature');

defineFeature(feature, test => {
  let role: string;

  const setRoleMock = (roleMock: string) => {
    role = roleMock;
  };

  const renderPage = async () => {
    render(<ButtonPage />, {}, { role });
    expect(await screen.findByText(/Samuel/)).toBeInTheDocument();
  };

  test('Affichage du playground Button', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when('J’accède à la page démo du Button', renderPage);
    UnTitreEstVisible(then);
    UnLienEstVisible(and);
    UnLienEstVisible(and);
    UnLienEstVisible(and);
    UnBoutonEstVisible(and);
    UnBoutonEstVisible(and);
  });

  test("Sélection d'un icone", ({ given, when, and, then }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when('J’accède à la page démo du Button', renderPage);
    JeCliqueSurLeBouton(and);
    UnEditeurEstVisible(then);
    JeSelectionneUneValeurSurleChamp(when);
    UnIconeEstVisible(then, SCOPE_PREVIEW);
  });
});
