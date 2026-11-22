import { MDP_MIN } from '../../utils/validation';

// Vue : affichage seul. Tout arrive par props depuis InscriptionController.
export const InscriptionScreen = ({
  form, erreurs, erreurGenerale, newsletter, cgu, afficher, nomRef, bienvenue,
  onChange, onNewsletter, onCgu, onAfficher, onSubmit, onInscrit,
}) => {
  // Compte créé : message de bienvenue à la place du formulaire
  if (bienvenue) {
    return (
      <div className="formulaire formulaire--succes">
        <p className="marque marque--accent">Maison Pétale</p>
        <h1 className="titre-page">Compte créé</h1>
        <p className="texte-doux">Bienvenue {bienvenue} ! Vous pouvez maintenant vous connecter.</p>
        <button type="button" className="bouton bouton--large" onClick={onInscrit}>
          Se connecter
        </button>
      </div>
    );
  }

  const champTexte = (champ, libelle, props = {}, aide = null) => (
    <div className="groupe">
      <label htmlFor={champ}>{libelle}</label>
      <input
        id={champ}
        className={`champ${erreurs[champ] ? ' champ--erreur' : ''}`}
        value={form[champ]}
        onChange={(e) => onChange(champ, e.target.value)}
        {...props}
      />
      {erreurs[champ]
        ? <p className="erreur">{erreurs[champ]}</p>
        : aide && <p className="aide">{aide}</p>}
    </div>
  );

  const interrupteur = (id, libelle, valeur, onValeur) => (
    <label className="interrupteur" htmlFor={id}>
      <span>{libelle}</span>
      <input id={id} type="checkbox" checked={valeur} onChange={(e) => onValeur(e.target.checked)} />
      <span className="interrupteur__piste" aria-hidden="true" />
    </label>
  );

  return (
    <form
      className="formulaire"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <p className="marque marque--accent">Maison Pétale</p>
      <h1 className="titre-page">Créer un compte</h1>

      {champTexte('nom', 'Nom', { ref: nomRef, type: 'text', placeholder: 'Dupont', autoComplete: 'family-name' })}
      {champTexte('prenom', 'Prénom', { type: 'text', placeholder: 'Marie', autoComplete: 'given-name' })}
      {champTexte('email', 'Email', { type: 'email', placeholder: 'marie@mail.com', autoComplete: 'email' })}
      {champTexte('telephone', 'Téléphone (facultatif)', {
        type: 'tel', placeholder: '06 12 34 56 78', autoComplete: 'tel',
      })}
      {champTexte('mdp', 'Mot de passe', {
        type: afficher ? 'text' : 'password', placeholder: '••••••••••••', autoComplete: 'new-password',
      }, `${MDP_MIN} caractères minimum`)}
      {champTexte('confirmation', 'Confirmer le mot de passe', {
        type: afficher ? 'text' : 'password', placeholder: '••••••••••••', autoComplete: 'new-password',
      })}

      {interrupteur('afficher', 'Afficher le mot de passe', afficher, onAfficher)}
      {interrupteur('newsletter', 'Recevoir la newsletter', newsletter, onNewsletter)}
      {interrupteur('cgu', "J'accepte les CGU", cgu, onCgu)}
      {erreurs.cgu && <p className="erreur">{erreurs.cgu}</p>}

      {erreurGenerale && <p className="erreur" role="alert">{erreurGenerale}</p>}

      <button type="submit" className="bouton bouton--large">Créer mon compte</button>
    </form>
  );
};
