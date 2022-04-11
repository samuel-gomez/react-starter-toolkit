import { screen } from '@testing-library/react';
import expectButton from './expectButton';
import expectLink from './expectLink';
import expectTitle from './expectTitle';

export const UnBoutonEstMasque = instruction =>
  instruction(/^un bouton "(.*)" est masqué$/, label => {
    expectButton({ queryByRole: screen.queryByRole, name: label, beInDoc: false });
  });

export const UnBoutonEstVisible = instruction =>
  instruction(/^un bouton "(.*)" est visible$/, label => {
    expectButton({ getByRole: screen.getByRole, name: label, beDisabled: false });
  });

export const UnLienEstMasque = (instruction, role = 'link') =>
  instruction(/^un lien "(.*)" est masqué$/, name => {
    expectLink({ name, role, queryByRole: screen.queryByRole, beInDoc: false });
  });

export const UnLienEstVisible = (instruction, role = 'link') =>
  instruction(/^un lien "(.*)" est visible avec le lien "(.*)"$/, (name, href) => {
    expectLink({ getByRole: screen.getByRole, name, href, role });
  });

export const JeSuisUnUtilisateurConnuEtConnecteAvecleProfil = (instruction, callback) =>
  instruction(/^Je suis un utilisateur connu et connecté avec le profil "(.*)"$/, role => {
    callback(role);
  });

export const UnTitreEstVisible = (instruction, level = 1) =>
  instruction(/^un titre du tableau "(.*)" est visible$/, title => {
    expectTitle({ getByRole: screen.getByRole, label: title, level });
  });
