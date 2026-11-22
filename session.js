import { ouvrirBase, sauverBase } from './baseDeDonnees';
import { trouverUtilisateur } from './utilisateurs';

// La session survit au rechargement de la page (comme le localStorage du site)
export const lireSession = async () => {
  const base = await ouvrirBase();
  return base.session === null ? null : trouverUtilisateur(base.session);
};

export const ecrireSession = async (utilisateurId) => {
  const base = await ouvrirBase();
  base.session = utilisateurId;
  sauverBase();
};

export const effacerSession = async () => {
  const base = await ouvrirBase();
  base.session = null;
  sauverBase();
};
