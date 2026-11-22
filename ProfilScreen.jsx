import { formaterDate } from '../../utils/commande';

// Vue : le profil du client. Tout arrive par props depuis ProfilController.
export const ProfilScreen = ({
  utilisateur, form, erreurs, message, stats, onChange, onEnregistrer, onDeconnexion,
}) => {
  const champ = (cle, libelle, props = {}) => (
    <div className="groupe">
      <label htmlFor={`profil-${cle}`}>{libelle}</label>
      <input
        id={`profil-${cle}`}
        className={`champ champ--plein${erreurs[cle] ? ' champ--erreur' : ''}`}
        value={form[cle]}
        onChange={(e) => onChange(cle, e.target.value)}
        {...props}
      />
      {erreurs[cle] && <p className="erreur">{erreurs[cle]}</p>}
    </div>
  );

  return (
    <form
      className="page page--profil"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onEnregistrer();
      }}
    >
      <header className="profil__entete">
        <span className="avatar avatar--grand" aria-hidden="true">
          {utilisateur.prenom.charAt(0).toUpperCase()}
        </span>
        <div>
          <h1 className="titre-page titre-page--petit">{utilisateur.prenom} {utilisateur.nom}</h1>
          <p className="texte-doux">{utilisateur.email}</p>
          {utilisateur.cree_le && (
            <p className="texte-doux">Membre depuis le {formaterDate(utilisateur.cree_le)}</p>
          )}
        </div>
      </header>

      <div className="stats">
        <div className="stats__case">
          <p className="stats__nombre">{stats.favoris}</p>
          <p className="texte-doux">favori{stats.favoris > 1 ? 's' : ''}</p>
        </div>
      </div>

      <h2 className="bloc__titre">Mes informations</h2>
      <div className="deux-colonnes">
        {champ('prenom', 'Prénom', { autoComplete: 'given-name' })}
        {champ('nom', 'Nom', { autoComplete: 'family-name' })}
      </div>
      {champ('telephone', 'Téléphone', { type: 'tel', inputMode: 'tel', autoComplete: 'tel', placeholder: '06 12 34 56 78' })}

      {erreurs.general && <p className="erreur" role="alert">{erreurs.general}</p>}
      {message && <p className="succes" role="status">{message}</p>}

      <button type="submit" className="bouton bouton--large">Enregistrer</button>
      <button type="button" className="lien lien--doux lien--centre" onClick={onDeconnexion}>
        Se déconnecter
      </button>
    </form>
  );
};
