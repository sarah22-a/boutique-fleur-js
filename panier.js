import { ouvrirBase, sauverBase, QUANTITE_MAX } from './baseDeDonnees';

// Quantité maximale d'un produit : 10, ou moins si le stock est plus petit
const limiteDe = (stock) => Math.min(QUANTITE_MAX, stock);

export const lireLignes = async (utilisateurId) => {
  const base = await ouvrirBase();
  return base.panier
    .filter((l) => l.utilisateur_id === utilisateurId)
    .map((l) => {
      const p = base.produits.find((x) => x.id === l.produit_id);
      return p ? { id: p.id, nom: p.nom, prix: p.prix, stock: p.stock, quantite: l.quantite } : null;
    })
    .filter(Boolean);
};

// Produit absent -> nouvelle ligne ; présent -> +1 ; limite atteinte -> rien
export const ajouterAuPanier = async (utilisateurId, produit) => {
  const base = await ouvrirBase();
  const limite = limiteDe(produit.stock);
  const existante = base.panier.find(
    (l) => l.utilisateur_id === utilisateurId && l.produit_id === produit.id
  );

  if (!existante) {
    if (limite < 1) return;
    base.panier.push({ utilisateur_id: utilisateurId, produit_id: produit.id, quantite: 1 });
  } else if (existante.quantite < limite) {
    existante.quantite += 1;
  }
  sauverBase();
};

// variation = +1 ou -1 ; la quantité reste entre 1 et la limite
export const changerQuantite = async (utilisateurId, ligne, variation) => {
  const base = await ouvrirBase();
  const existante = base.panier.find(
    (l) => l.utilisateur_id === utilisateurId && l.produit_id === ligne.id
  );
  if (!existante) return;
  existante.quantite = Math.min(limiteDe(ligne.stock), Math.max(1, ligne.quantite + variation));
  sauverBase();
};

export const retirerDuPanier = async (utilisateurId, produitId) => {
  const base = await ouvrirBase();
  base.panier = base.panier.filter(
    (l) => !(l.utilisateur_id === utilisateurId && l.produit_id === produitId)
  );
  sauverBase();
};

export const viderPanier = async (utilisateurId) => {
  const base = await ouvrirBase();
  base.panier = base.panier.filter((l) => l.utilisateur_id !== utilisateurId);
  sauverBase();
};
