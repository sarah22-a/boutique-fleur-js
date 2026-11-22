import { useState } from 'react';
import { InscriptionScreen } from '../views/screens/InscriptionScreen';
import { useInscription } from './useInscription';

export const InscriptionController = ({ onInscrit }) => {
  const { envoyer, ...inscription } = useInscription();
  // Prénom de la personne qui vient de s'inscrire : la vue affiche alors un message de bienvenue
  const [bienvenue, setBienvenue] = useState(null);

  const soumettre = async () => {
    const prenom = await envoyer();
    if (prenom) setBienvenue(prenom);
  };

  return (
    <InscriptionScreen
      {...inscription}
      bienvenue={bienvenue}
      onSubmit={soumettre}
      onInscrit={onInscrit}
    />
  );
};
