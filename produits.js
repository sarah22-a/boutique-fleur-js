import { ouvrirBase, sauverBase, prochainId } from './baseDeDonnees';
import { normaliser } from '../utils/texte';

const correspond = (p, motif, categorie) =>
  p.nom_norm.includes(motif) && (categorie === null || p.categorie === categorie);

// Lecture d'une page (limite = -1 : tout). Recherche sans accents ni majuscules.
export const listerProduits = async ({
  recherche = '', categorie = null, limite = -1, decalage = 0,
} = {}) => {
  const base = await ouvrirBase();
  const motif = normaliser(recherche);
  const trouves = base.produits
    .filter((p) => correspond(p, motif, categorie))
    .sort((a, b) => a.id - b.id);
  const fin = limite < 0 ? undefined : decalage + limite;
  return trouves.slice(decalage, fin).map(({ nom_norm, ...produit }) => produit);
};

export const compterProduits = async ({ recherche = '', categorie = null } = {}) => {
  const base = await ouvrirBase();
  const motif = normaliser(recherche);
  return base.produits.filter((p) => correspond(p, motif, categorie)).length;
};

export const listerCategories = async () => {
  const base = await ouvrirBase();
  return [...new Set(base.produits.map((p) => p.categorie))].sort((a, b) => a.localeCompare(b, 'fr'));
};

// Espace administrateur : ajout, modification, stock, suppression
export const insererProduit = async (nom, categorie, prix, stock) => {
  const base = await ouvrirBase();
  const id = prochainId('produits');
  base.produits.push({ id, nom, nom_norm: normaliser(nom), categorie, prix, stock });
  sauverBase();
  return id;
};

export const modifierProduit = async (id, nom, categorie, prix, stock) => {
  const base = await ouvrirBase();
  const produit = base.produits.find((p) => p.id === id);
  if (!produit) return;
  Object.assign(produit, { nom, nom_norm: normaliser(nom), categorie, prix, stock });
  sauverBase();
};

export const modifierStock = async (id, stock) => {
  const base = await ouvrirBase();
  const produit = base.produits.find((p) => p.id === id);
  if (!produit) return;
  produit.stock = stock;
  sauverBase();
};

// Le panier et les favoris qui contiennent ce produit sont supprimés aussi (comme ON DELETE CASCADE)
export const supprimerProduit = async (id) => {
  const base = await ouvrirBase();
  base.produits = base.produits.filter((p) => p.id !== id);
  base.panier = base.panier.filter((l) => l.produit_id !== id);
  base.favoris = base.favoris.filter((f) => f.produit_id !== id);
  sauverBase();
};
