import { DefineStepFunction } from 'jest-cucumber';
import expectButton from './expectButton';
import expectLink from './expectLink';
import expectTitle from './expectTitle';

export const UnBoutonEstMasque = (instruction: DefineStepFunction) =>
  instruction(/^un bouton "(.*)" est masqué$/, name => {
    expectButton({ name, isQueryByRole: true, beInDoc: false });
  });

export const UnBoutonEstVisible = (instruction: DefineStepFunction) =>
  instruction(/^un bouton "(.*)" est visible$/, name => {
    expectButton({ name, beDisabled: false });
  });

export const UnLienEstMasque = (instruction: DefineStepFunction, role = 'link') =>
  instruction(/^un lien "(.*)" est masqué$/, name => {
    expectLink({ name, role, isQueryByRole: true, beInDoc: false });
  });

export const UnLienEstVisible = (instruction: DefineStepFunction, role = 'link') =>
  instruction(/^un lien "(.*)" est visible avec le lien "(.*)"$/, (name, href) => {
    expectLink({ name, href, role });
  });

export const JeSuisUnUtilisateurConnuEtConnecteAvecleProfil = (instruction: DefineStepFunction, callback: (arg: string) => void) =>
  instruction(/^Je suis un utilisateur connu et connecté avec le profil "(.*)"$/, role => {
    callback(role);
  });

export const UnTitreEstVisible = (instruction: DefineStepFunction, level = 1) =>
  instruction(/^un titre du tableau "(.*)" est visible$/, title => {
    expectTitle({ name: title, level });
  });
