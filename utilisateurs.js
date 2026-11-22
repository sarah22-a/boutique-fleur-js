import { ouvrirBase, sauverBase, prochainId } from './baseDeDonnees';

// ATTENTION : mot de passe stocké en clair (usage d'apprentissage uniquement).
const publique = ({ id, nom, prenom, email, role, telephone, cree_le }) => ({
  id, nom, prenom, email, role, telephone: telephone ?? '', cree_le,
});

export const insererUtilisateur = async ({
  nom, prenom, email, telephone, mdp, newsletter, cgu,
}) => {
  const base = await ouvrirBase();
  const mail = email.trim().toLowerCase();

  if (base.utilisateurs.some((u) => u.email === mail)) {
    throw new Error('UNIQUE constraint failed: utilisateurs.email');
  }

  const utilisateur = {
    id: prochainId('utilisateurs'),
    nom: nom.trim(),
    prenom: prenom.trim(),
    email: mail,
    telephone: telephone || null,
    mdp,
    newsletter: newsletter ? 1 : 0,
    cgu: cgu ? 1 : 0,
    role: 'client',
    cree_le: new Date().toISOString(),
  };
  base.utilisateurs.push(utilisateur);
  sauverBase();
  return utilisateur.id;
};

// Renvoie l'utilisateur (sans le mot de passe) si email et mot de passe correspondent, sinon null
export const verifierConnexion = async (email, mdp) => {
  const base = await ouvrirBase();
  const mail = email.trim().toLowerCase();
  const utilisateur = base.utilisateurs.find((u) => u.email === mail && u.mdp === mdp);
  return utilisateur ? publique(utilisateur) : null;
};

export const trouverUtilisateur = async (id) => {
  const base = await ouvrirBase();
  const utilisateur = base.utilisateurs.find((u) => u.id === id);
  return utilisateur ? publique(utilisateur) : null;
};

// Profil : le client peut changer son nom, son prénom et son téléphone (pas son email)
export const modifierProfil = async (id, { nom, prenom, telephone }) => {
  const base = await ouvrirBase();
  const utilisateur = base.utilisateurs.find((u) => u.id === id);
  if (!utilisateur) return;
  Object.assign(utilisateur, {
    nom: nom.trim(), prenom: prenom.trim(), telephone: telephone.trim() || null,
  });
  sauverBase();
};

