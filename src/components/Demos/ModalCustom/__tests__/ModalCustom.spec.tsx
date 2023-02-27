import { render, screen } from 'shared/testsUtils/customRender';
import { JeSuisUnUtilisateurConnuEtConnecteAvecleProfil, UnBoutonEstVisible, UnTitreEstVisible } from 'shared/testsUtils/sharedScenarios';
import { defineFeature, loadFeature } from 'jest-cucumber';
import ModalCustom from '..';

const feature = loadFeature('features/Demos/ModalCustom/ModalCustom.feature');

defineFeature(feature, test => {
  let role: string;

  test('Affichage de la démo Modal Custom', ({ given, when, then, and }) => {
    JeSuisUnUtilisateurConnuEtConnecteAvecleProfil(given, (roleMock: string) => {
      role = roleMock;
    });

    when('J’accède à la page démo Modal Custom', async () => {
      render(<ModalCustom />, {}, { role });
      expect(await screen.findByText(/Samuel/)).toBeInTheDocument();
    });

    UnTitreEstVisible(then);
    UnBoutonEstVisible(and);
  });
});
