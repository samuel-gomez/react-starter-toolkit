import { render, screen } from 'shared/testsUtils/customRender';
import { JeSuisUnUtilisateurConnuEtConnecteAvecleProfil, UnTitreEstVisible } from 'shared/testsUtils/sharedScenarios';
import { defineFeature, loadFeature } from 'jest-cucumber';
import Notification from '..';

const feature = loadFeature('features/Demos/Notification/Notification.feature');

defineFeature(feature, test => {
  let role: string;

  test('Affichage de la démo Notification', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, (roleMock: string) => {
      role = roleMock;
    });

    when('J’accède à la page démo Notification', async () => {
      render(<Notification />, {}, { role });
      expect(await screen.findByText(/Samuel/)).toBeInTheDocument();
    });

    UnTitreEstVisible(then);
    UnTitreEstVisible(and, 3);
    UnTitreEstVisible(and, 3);
    UnTitreEstVisible(and, 3);
    UnTitreEstVisible(and, 3);
  });
});
