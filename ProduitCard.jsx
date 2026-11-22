import { memo } from 'react';
import { PhotoProduit } from './PhotoProduit';
import { formaterPrix } from '../../utils/texte';

const STOCK_BAS = 5;

// Une carte de la grille : grande photo, catégorie, nom, prix, bouton d'ajout
const ProduitCard = ({ produit, quantite, estFavori, onAjouter, onToggleFavori, onOuvrir }) => {
  const rupture = produit.stock === 0;
  const stockBas = !rupture && produit.stock <= STOCK_BAS;
  const dansPanier = quantite > 0;

  return (
    <article className="produit">
      <div className="produit__photo">
        <button
          type="button"
          className="produit__ouvrir"
          onClick={() => onOuvrir(produit)}
          aria-label={`Voir la fiche de ${produit.nom}`}
        >
          <PhotoProduit produit={produit} grisee={rupture} />
        </button>

        <button
          type="button"
          className={`etoile${estFavori ? ' etoile--active' : ''}`}
          onClick={() => onToggleFavori(produit.id)}
          aria-pressed={estFavori}
          aria-label={estFavori ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          {estFavori ? '★' : '☆'}
        </button>

        {(rupture || stockBas) && (
          <span className={`badge${rupture ? ' badge--rupture' : ''}`}>
            {rupture ? 'Rupture de stock' : `Plus que ${produit.stock}`}
          </span>
        )}
      </div>

      <p className="produit__categorie">{produit.categorie}</p>
      <h3 className="produit__nom">
        <button type="button" className="lien-nu" onClick={() => onOuvrir(produit)}>{produit.nom}</button>
      </h3>

      <div className="produit__bas">
        <span className="prix">{formaterPrix(produit.prix)}</span>
        <button
          type="button"
          className={`ajouter${dansPanier ? ' ajouter--plein' : ''}`}
          disabled={rupture}
          onClick={() => onAjouter(produit)}
          aria-label={`Ajouter ${produit.nom} au panier`}
        >
          {dansPanier ? quantite : '+'}
        </button>
      </div>
    </article>
  );
};

export default memo(ProduitCard);
