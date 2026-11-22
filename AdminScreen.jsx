import { useEffect } from 'react';
import { PhotoProduit } from '../components/PhotoProduit';
import { formaterPrix } from '../../utils/texte';

// Une ligne de la liste : infos, stock (− / +), modifier, supprimer
const LigneAdmin = ({ produit, onAjusterStock, onEditer, onSupprimer }) => {
  const confirmerSuppression = () => {
    if (window.confirm(`Supprimer « ${produit.nom} » ? Il sera aussi retiré des paniers et des favoris.`)) {
      onSupprimer(produit);
    }
  };

  return (
    <li className="admin-ligne">
      <PhotoProduit produit={produit} petite />

      <div className="admin-ligne__infos">
        <h3 className="admin-ligne__nom">{produit.nom}</h3>
        <p className="texte-doux">{produit.categorie}</p>
      </div>

      <span className="prix">{formaterPrix(produit.prix)}</span>

      <div className="quantite">
        <button
          type="button"
          className="quantite__pas"
          disabled={produit.stock === 0}
          onClick={() => onAjusterStock(produit, -1)}
          aria-label="Retirer un au stock"
        >
          −
        </button>
        <span className={`quantite__nombre quantite__nombre--large${produit.stock === 0 ? ' erreur' : ''}`}>
          {produit.stock === 0 ? 'Rupture' : `Stock ${produit.stock}`}
        </span>
        <button
          type="button"
          className="quantite__pas"
          onClick={() => onAjusterStock(produit, 1)}
          aria-label="Ajouter un au stock"
        >
          +
        </button>
      </div>

      <div className="admin-ligne__actions">
        <button type="button" className="lien" onClick={() => onEditer(produit)}>Modifier</button>
        <button type="button" className="lien lien--doux" onClick={confirmerSuppression}>Supprimer</button>
      </div>
    </li>
  );
};

// Fenêtre d'ajout / modification d'un produit
const FormulaireProduit = ({ formulaire, categories, onChange, onEnregistrer, onFermer }) => {
  const { ouvert, enEdition, form, erreurs, erreurGenerale } = formulaire;

  useEffect(() => {
    if (!ouvert) return undefined;
    const fermerAvecEchap = (e) => e.key === 'Escape' && onFermer();
    window.addEventListener('keydown', fermerAvecEchap);
    return () => window.removeEventListener('keydown', fermerAvecEchap);
  }, [ouvert, onFermer]);

  if (!ouvert) return null;

  const champ = (cle, libelle, props = {}) => (
    <div className="groupe">
      <label htmlFor={`produit-${cle}`}>{libelle}</label>
      <input
        id={`produit-${cle}`}
        className={`champ champ--plein${erreurs[cle] ? ' champ--erreur' : ''}`}
        value={form[cle]}
        onChange={(e) => onChange(cle, e.target.value)}
        {...props}
      />
      {erreurs[cle] && <p className="erreur">{erreurs[cle]}</p>}
    </div>
  );

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-titre">
      <button type="button" className="modal__fond" aria-label="Fermer" onClick={onFermer} />
      <form
        className="modal__panneau"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          onEnregistrer();
        }}
      >
        <h2 id="modal-titre" className="titre-page titre-page--moyen">
          {enEdition ? 'Modifier le produit' : 'Nouveau produit'}
        </h2>

        {champ('nom', 'Nom', { type: 'text', placeholder: 'Pivoines blush', autoFocus: true })}
        {champ('categorie', 'Catégorie', { type: 'text', placeholder: 'Bouquets' })}

        {categories.length > 0 && (
          <div className="suggestions">
            {categories.map((c) => {
              const actif = form.categorie.trim() === c;
              return (
                <button
                  key={c}
                  type="button"
                  className={`puce puce--petite${actif ? ' puce--active' : ''}`}
                  onClick={() => onChange('categorie', c)}
                >
                  {c}
                </button>
              );
            })}
          </div>
        )}

        <div className="deux-colonnes">
          {champ('prix', 'Prix (€)', { type: 'text', inputMode: 'decimal', placeholder: '39,00' })}
          {champ('stock', 'Stock', { type: 'text', inputMode: 'numeric', placeholder: '10' })}
        </div>

        {erreurGenerale && <p className="erreur" role="alert">{erreurGenerale}</p>}

        <button type="submit" className="bouton bouton--large">Enregistrer</button>
        <button type="button" className="lien lien--doux lien--centre" onClick={onFermer}>Annuler</button>
      </form>
    </div>
  );
};

// Vue : affichage seul. Tout arrive par props depuis AdminController.
export const AdminScreen = ({
  produits, categories, chargement, erreur, formulaire,
  onReessayer, onNouveau, onEditer, onFermer, onChange, onEnregistrer,
  onAjusterStock, onSupprimer,
}) => (
  <div className="page">
    <header className="page__entete">
      <h1 className="titre-page">Administration</h1>
      <p className="texte-doux">
        {produits.length} produit{produits.length > 1 ? 's' : ''}
      </p>
      <button type="button" className="bouton" onClick={onNouveau}>+ Nouveau produit</button>
    </header>

    {erreur && (
      <p className="erreur">
        {erreur}{' '}
        <button type="button" className="lien" onClick={onReessayer}>Réessayer</button>
      </p>
    )}

    {chargement ? (
      <div className="centre"><span className="spinner" role="status" aria-label="Chargement" /></div>
    ) : (
      <ul className="admin-liste">
        {produits.map((p) => (
          <LigneAdmin
            key={p.id}
            produit={p}
            onAjusterStock={onAjusterStock}
            onEditer={onEditer}
            onSupprimer={onSupprimer}
          />
        ))}
      </ul>
    )}

    <FormulaireProduit
      formulaire={formulaire}
      categories={categories}
      onChange={onChange}
      onEnregistrer={onEnregistrer}
      onFermer={onFermer}
    />
  </div>
);
