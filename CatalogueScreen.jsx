import { BarreRecherche } from '../components/BarreRecherche';
import ProduitCard from '../components/ProduitCard';
import { FicheProduit } from '../components/FicheProduit';

// Vue : affichage seul. Tout arrive par props depuis CatalogueController.
export const CatalogueScreen = ({
  produits, total, categories, recherche, categorie, filtreActif,
  chargement, chargementPlus, erreur, quantites, favoris, produitOuvert,
  onOuvrir, onFermer, onRecherche, onEffacer, onCategorie, onReessayer, onChargerPlus,
  onToggleFavori, onAjouter,
}) => (
  <div className="page">
    <header className="page__entete">
      <h1 className="titre-page">Catalogue</h1>
      <p className="texte-doux">{total} article{total > 1 ? 's' : ''}</p>
    </header>

    <BarreRecherche valeur={recherche} onChange={onRecherche} onEffacer={onEffacer} />

    <div className="puces" role="group" aria-label="Catégories">
      {categories.map((c) => (
        <button
          key={c ?? 'toutes'}
          type="button"
          className={`puce${categorie === c ? ' puce--active' : ''}`}
          aria-pressed={categorie === c}
          onClick={() => onCategorie(c)}
        >
          {c ?? 'Toutes'}
        </button>
      ))}
    </div>

    {!filtreActif && (
      <section className="banniere">
        <div className="banniere__texte">
          <h2>Les fleurs du moment</h2>
          <p>Une sélection à offrir ou à garder</p>
        </div>
      </section>
    )}

    {chargement && <div className="centre"><span className="spinner" role="status" aria-label="Chargement" /></div>}

    {!chargement && erreur && (
      <div className="centre">
        <p className="erreur">{erreur}</p>
        <button type="button" className="bouton" onClick={onReessayer}>Réessayer</button>
      </div>
    )}

    {!chargement && !erreur && produits.length === 0 && (
      <p className="vide">
        {filtreActif ? `Aucune fleur ne correspond à « ${recherche.trim()} ».` : 'Aucune fleur à afficher'}
      </p>
    )}

    {!chargement && !erreur && produits.length > 0 && (
      <ul className="grille">
        {produits.map((p) => (
          <li key={p.id}>
            <ProduitCard
              produit={p}
              quantite={quantites[p.id] ?? 0}
              estFavori={favoris.includes(p.id)}
              onAjouter={onAjouter}
              onToggleFavori={onToggleFavori}
              onOuvrir={onOuvrir}
            />
          </li>
        ))}
      </ul>
    )}

    {!chargement && !erreur && produits.length < total && (
      <div className="centre">
        <button type="button" className="bouton bouton--contour" onClick={onChargerPlus} disabled={chargementPlus}>
          {chargementPlus ? 'Chargement…' : `Voir plus de fleurs (${produits.length} sur ${total})`}
        </button>
      </div>
    )}

    <FicheProduit
      produit={produitOuvert}
      quantite={produitOuvert ? quantites[produitOuvert.id] ?? 0 : 0}
      estFavori={produitOuvert ? favoris.includes(produitOuvert.id) : false}
      onFermer={onFermer}
      onAjouter={onAjouter}
      onToggleFavori={onToggleFavori}
    />
  </div>
);
