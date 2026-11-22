
// Vue : affichage seul. Tout arrive par props depuis LoginController.
export const LoginScreen = ({ form, erreurs, erreurGenerale, emailRef, onChange, onSubmit }) => (
  <form
    className="formulaire"
    noValidate
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
  >
    <p className="marque marque--accent">Maison Pétale</p>
    <h1 className="titre-page">Connexion</h1>

    <div className="groupe">
      <label htmlFor="email">Email</label>
      <input
        id="email"
        ref={emailRef}
        className={`champ${erreurs.email ? ' champ--erreur' : ''}`}
        type="email"
        placeholder="marie@mail.com"
        autoComplete="email"
        value={form.email}
        onChange={(e) => onChange('email', e.target.value)}
      />
      {erreurs.email && <p className="erreur">{erreurs.email}</p>}
    </div>

    <div className="groupe">
      <label htmlFor="mdp">Mot de passe</label>
      <input
        id="mdp"
        className={`champ${erreurs.mdp ? ' champ--erreur' : ''}`}
        type="password"
        placeholder="••••••••••••"
        autoComplete="current-password"
        value={form.mdp}
        onChange={(e) => onChange('mdp', e.target.value)}
      />
      {erreurs.mdp && <p className="erreur">{erreurs.mdp}</p>}
    </div>

    {erreurGenerale && <p className="erreur" role="alert">{erreurGenerale}</p>}

    <button type="submit" className="bouton bouton--large">Se connecter</button>
  </form>
);
