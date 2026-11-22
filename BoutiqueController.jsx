import { useState, useCallback } from 'react';
import { BoutiqueLayout } from '../views/layouts/BoutiqueLayout';
import { useAuth } from './AuthContext';
import { usePanier } from './PanierContext';
import { CatalogueController } from './CatalogueController';
import { FavorisController } from './FavorisController';
import { PanierController } from './PanierController';
import { ProfilController } from './ProfilController';
import { AdminController } from './AdminController';

// Utilisateur connecté : onglets Catalogue / Favoris / Panier (et Admin pour un administrateur).
// « profil » est une page sans onglet : on y accède depuis la pastille de l'en-tête.
export const BoutiqueController = () => {
  const { utilisateur, deconnecter } = useAuth();
  const { nombreArticles, recharger } = usePanier();
  const [onglet, setOnglet] = useState('catalogue');
  const [versionCatalogue, setVersionCatalogue] = useState(0);

  const estAdmin = utilisateur.role === 'admin';

  // L'admin a modifié un produit : le catalogue et le panier se relisent
  const apresModificationAdmin = useCallback(() => {
    setVersionCatalogue((v) => v + 1);
    recharger().catch(console.log);
  }, [recharger]);

  const onglets = [
    { id: 'catalogue', libelle: 'Catalogue', compte: 0 },
    { id: 'favoris', libelle: 'Favoris', compte: 0 },
    { id: 'panier', libelle: 'Panier', compte: nombreArticles },
    ...(estAdmin ? [{ id: 'admin', libelle: 'Admin', compte: 0 }] : []),
  ];

  const versCatalogue = () => setOnglet('catalogue');

  const pages = {
    catalogue: (
      <CatalogueController versionExterne={versionCatalogue} actif={onglet === 'catalogue'} />
    ),
    favoris: (
      <FavorisController
        versionExterne={versionCatalogue}
        actif={onglet === 'favoris'}
        onCatalogue={versCatalogue}
      />
    ),
    panier: <PanierController onCatalogue={versCatalogue} />,
    profil: <ProfilController actif={onglet === 'profil'} />,
    ...(estAdmin ? { admin: <AdminController onModifie={apresModificationAdmin} /> } : {}),
  };

  return (
    <BoutiqueLayout
      utilisateur={utilisateur}
      onDeconnexion={deconnecter}
      onProfil={() => setOnglet('profil')}
      onglets={onglets}
      onglet={onglet}
      onChangerOnglet={setOnglet}
      pages={pages}
    />
  );
};
