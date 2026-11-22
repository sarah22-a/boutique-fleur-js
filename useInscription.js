import { useState, useRef, useEffect } from 'react';
import { validerFormulaire } from '../utils/validation';
import { initDb, insererUtilisateur } from '../models';

const FORMULAIRE_VIDE = {
  nom: '', prenom: '', email: '', telephone: '', mdp: '', confirmation: '',
};

// Contrôleur de l'inscription.
// envoyer() renvoie le prénom si le compte est créé, sinon null.
export const useInscription = () => {
  const [form, setForm] = useState(FORMULAIRE_VIDE);
  const [newsletter, setNewsletter] = useState(false);
  const [cgu, setCgu] = useState(false);
  const [afficher, setAfficher] = useState(false);
  const [erreurs, setErreurs] = useState({});
  const [erreurGenerale, setErreurGenerale] = useState(null);
  const nomRef = useRef(null);

  useEffect(() => {
    nomRef.current?.focus();
  }, []);

  const onChange = (champ, valeur) => setForm((f) => ({ ...f, [champ]: valeur }));

  const valider = () => {
    const e = validerFormulaire(form, cgu);
    setErreurs(e);
    return Object.keys(e).length === 0;
  };

  const envoyer = async () => {
    setErreurGenerale(null);
    if (!valider()) return null;

    try {
      await initDb();
      await insererUtilisateur({ ...form, newsletter, cgu });
      const prenom = form.prenom;
      setForm(FORMULAIRE_VIDE);
      setNewsletter(false);
      setCgu(false);
      setErreurs({});
      return prenom;
    } catch (e) {
      if (String(e.message).includes('UNIQUE')) {
        setErreurs({ email: 'Cet email est déjà utilisé' });
      } else {
        setErreurGenerale("Impossible d'enregistrer l'utilisateur");
      }
      console.log(e);
      return null;
    }
  };

  return {
    form, erreurs, erreurGenerale, newsletter, cgu, afficher, nomRef,
    onChange, onNewsletter: setNewsletter, onCgu: setCgu, onAfficher: setAfficher,
    envoyer,
  };
};
