import { configure, render, screen } from 'shared/testsUtils/customRender';
import { SCOPE_PREVIEW } from 'shared/testsUtils/constants';
import {
  JeCliqueSurLeBouton,
  JeSelectionneUneValeurSurleChamp,
  JeSuisUnUtilisateurConnuEtConnecteAvecleProfil,
  UnBoutonEstVisible,
  UnEditeurEstVisible,
  UnIconeEstVisible,
  UnLienEstVisible,
  UnTexteEstVisible,
  UnTitreEstVisible,
} from 'shared/testsUtils/sharedScenarios';
import { defineFeature, loadFeature } from 'jest-cucumber';
import StepperPage from '../Stepper';

configure({ defaultHidden: true });

const feature = loadFeature('features/Demos/Stepper/Stepper.feature');

defineFeature(feature, test => {
  let role: string;

  const setRoleMock = (roleMock: string) => {
    role = roleMock;
  };

  const renderPage = async () => {
    render(<StepperPage />, {}, { role });
    expect(await screen.findByText(/Samuel/)).toBeInTheDocument();
  };

  test('Affichage du playground Stepper', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when('J’accède à la page démo du Stepper', renderPage);
    UnTitreEstVisible(then);
    UnLienEstVisible(and);
    UnLienEstVisible(and);
    UnLienEstVisible(and);
    UnBoutonEstVisible(and);
    UnTexteEstVisible(and, SCOPE_PREVIEW);
  });

  test("Sélection d'un icone", ({ given, when, and, then }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, setRoleMock);
    when('J’accède à la page démo du Stepper', renderPage);
    JeCliqueSurLeBouton(and);
    UnEditeurEstVisible(then);
    JeSelectionneUneValeurSurleChamp(when);
    UnIconeEstVisible(then, SCOPE_PREVIEW);
  });
});
