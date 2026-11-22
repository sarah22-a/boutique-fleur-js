import { formaterPrix } from '../../utils/texte';
import LignePanier from '../components/LignePanier';
import { CodePromo } from '../components/CodePromo';

// Vue : affichage seul. Tout arrive par props depuis PanierController.
export const PanierScreen = ({
  lignes, total, remise, codePromo, nombreArticles, quantiteMax,
  onChangerQuantite, onRetirer, onVider, onAppliquerCode, onRetirerCode, onCatalogue,
}) => {
  const confirmerVider = () => {
    if (window.confirm('Vider le panier ? Toutes les fleurs seront retirées.')) onVider();
  };

  const libelleArticles = `${nombreArticles} article${nombreArticles > 1 ? 's' : ''}`;
  return (
    <div className="page page--panier">
      <header className="page__entete">
        <h1 className="titre-page">Panier</h1>
        {nombreArticles > 0 && <p className="texte-doux">{libelleArticles}</p>}
      </header>

      {lignes.length === 0 ? (
        <div className="vide-zone">
          <h2>Votre panier est vide</h2>
          <p className="texte-doux">Les fleurs que vous ajoutez apparaissent ici.</p>
          <button type="button" className="bouton" onClick={onCatalogue}>Voir le catalogue</button>
        </div>
      ) : (
        <>
          <ul className="lignes">
            {lignes.map((l) => (
              <LignePanier
                key={l.id}
                ligne={l}
                max={Math.min(quantiteMax, l.stock)}
                onChangerQuantite={onChangerQuantite}
                onRetirer={onRetirer}
              />
            ))}
          </ul>

          <CodePromo
            codeActif={codePromo}
            remise={remise}
            onAppliquer={onAppliquerCode}
            onRetirer={onRetirerCode}
          />

          <footer className="pied-panier">
            <div className="pied-panier__detail">
              <div className="pied-panier__ligne pied-panier__ligne--fine">
                <span>Sous-total</span>
                <span>{formaterPrix(total)}</span>
              </div>
              {remise > 0 && (
                <div className="pied-panier__ligne pied-panier__ligne--fine pied-panier__ligne--remise">
                  <span>Réduction ({codePromo})</span>
                  <span>−{formaterPrix(remise)}</span>
                </div>
              )}
            </div>
            <div className="pied-panier__ligne">
              <div>
                <p className="pied-panier__libelle">Total</p>
                <p className="texte-doux">{libelleArticles}</p>
              </div>
              <p className="pied-panier__total">{formaterPrix(total - remise)}</p>
            </div>
            <button type="button" className="lien lien--doux" onClick={confirmerVider}>
              Vider le panier
            </button>
          </footer>
        </>
      )}
    </div>
  );
};
