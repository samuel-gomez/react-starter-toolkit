import { render, screen } from 'shared/testsUtils/customRender';
import {
  JeSuisUnUtilisateurConnuEtConnecteAvecleProfil,
  UnBoutonEstVisible,
  UnLienEstVisible,
  UnTitreEstVisible,
} from 'shared/testsUtils/sharedScenarios';
import { defineFeature, loadFeature } from 'jest-cucumber';
import AccordionPage from '../Accordion';

const feature = loadFeature('features/Demos/Accordion/Accordion.feature');

defineFeature(feature, test => {
  let role: string;

  test('Affichage du playground Accordion', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, (roleMock: string) => {
      role = roleMock;
    });

    when('J’accède à la page démo du Accordion', async () => {
      render(<AccordionPage />, {}, { role });
      expect(await screen.findByText(/Samuel/)).toBeInTheDocument();
    });

    UnTitreEstVisible(then);
    UnLienEstVisible(and);
    UnLienEstVisible(and);
    UnLienEstVisible(and);
    UnBoutonEstVisible(and);
    UnTitreEstVisible(and, 3);
    UnTitreEstVisible(and, 3);
    UnTitreEstVisible(and, 3);
  });
});
