import { useEffect } from 'react';
import { PhotoProduit } from './PhotoProduit';
import { formaterPrix } from '../../utils/texte';
import { descriptionDe } from '../../utils/descriptions';

const STOCK_BAS = 5;

// Fenêtre « fiche produit » : grande photo, description, conseils d'entretien, ajout au panier.
// Ne s'affiche que si `produit` n'est pas null (le contrôleur décide quand l'ouvrir).
export const FicheProduit = ({ produit, quantite, estFavori, onFermer, onAjouter, onToggleFavori }) => {
  useEffect(() => {
    if (!produit) return undefined;
    const fermerAvecEchap = (e) => e.key === 'Escape' && onFermer();
    window.addEventListener('keydown', fermerAvecEchap);
    return () => window.removeEventListener('keydown', fermerAvecEchap);
  }, [produit, onFermer]);

  if (!produit) return null;

  const { texte, entretien } = descriptionDe(produit);
  const rupture = produit.stock === 0;
  const stockBas = !rupture && produit.stock <= STOCK_BAS;

  let libelleStock = 'En stock';
  if (rupture) libelleStock = 'Rupture de stock';
  else if (stockBas) libelleStock = `Plus que ${produit.stock} en stock`;

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="fiche-titre">
      <button type="button" className="modal__fond" aria-label="Fermer" onClick={onFermer} />
      <div className="modal__panneau fiche">
        <button type="button" className="fiche__fermer" onClick={onFermer} aria-label="Fermer la fiche">×</button>

        <div className="fiche__photo">
          <PhotoProduit produit={produit} grisee={rupture} />
        </div>

        <p className="produit__categorie">{produit.categorie}</p>
        <div className="fiche__titre">
          <h2 id="fiche-titre" className="titre-page titre-page--petit">{produit.nom}</h2>
          <span className="prix prix--grand">{formaterPrix(produit.prix)}</span>
        </div>
        <p className={`fiche__stock${rupture ? ' fiche__stock--rupture' : ''}`}>{libelleStock}</p>

        <p className="fiche__texte">{texte}</p>
        <div className="fiche__entretien">
          <p className="fiche__entretien-titre">Conseil d'entretien</p>
          <p className="texte-doux">{entretien}</p>
        </div>

        <button
          type="button"
          className="bouton bouton--large"
          disabled={rupture}
          onClick={() => onAjouter(produit)}
        >
          {rupture ? 'Indisponible' : 'Ajouter au panier'}
        </button>
        {quantite > 0 && (
          <p className="texte-doux fiche__panier">
            {quantite} déjà dans votre panier
          </p>
        )}
        <button
          type="button"
          className="lien lien--doux lien--centre"
          aria-pressed={estFavori}
          onClick={() => onToggleFavori(produit.id)}
        >
          {estFavori ? '★ Retirer des favoris' : '☆ Ajouter aux favoris'}
        </button>
      </div>
    </div>
  );
};
