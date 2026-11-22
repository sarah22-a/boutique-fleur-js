export { initDb, QUANTITE_MAX, ADMIN_EMAIL, ADMIN_MDP } from './baseDeDonnees';
export { insererUtilisateur, verifierConnexion, modifierProfil } from './utilisateurs';
export { lireSession, ecrireSession, effacerSession } from './session';
export {
  listerProduits, compterProduits, listerCategories, insererProduit,
  modifierProduit, modifierStock, supprimerProduit,
} from './produits';
export {
  lireLignes, ajouterAuPanier, changerQuantite, retirerDuPanier, viderPanier,
} from './panier';
export { listerFavoris, basculerFavori, listerProduitsFavoris } from './favoris';
