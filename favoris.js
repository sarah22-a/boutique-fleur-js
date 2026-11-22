import { ouvrirBase, sauverBase } from './baseDeDonnees';

export const listerFavoris = async (utilisateurId) => {
  const base = await ouvrirBase();
  return base.favoris.filter((f) => f.utilisateur_id === utilisateurId).map((f) => f.produit_id);
};

// Ajoute le favori s'il n'existe pas, le retire sinon
export const basculerFavori = async (utilisateurId, produitId) => {
  const base = await ouvrirBase();
  const avant = base.favoris.length;
  base.favoris = base.favoris.filter(
    (f) => !(f.utilisateur_id === utilisateurId && f.produit_id === produitId)
  );
  if (base.favoris.length === avant) {
    base.favoris.push({ utilisateur_id: utilisateurId, produit_id: produitId });
  }
  sauverBase();
};

// Les produits favoris (objets complets), pour l'écran Favoris
export const listerProduitsFavoris = async (utilisateurId) => {
  const base = await ouvrirBase();
  const ids = base.favoris.filter((f) => f.utilisateur_id === utilisateurId).map((f) => f.produit_id);
  return base.produits
    .filter((p) => ids.includes(p.id))
    .sort((a, b) => a.id - b.id)
    .map(({ nom_norm, ...produit }) => produit);
};
