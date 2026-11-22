import { aUnePhoto, urlPhoto } from '../../images';

// Photo d'un produit ; sans photo : fond rose poudré et initiale
export const PhotoProduit = ({ produit, grisee = false, petite = false }) => {
  const classe = `photo${petite ? ' photo--petite' : ''}`;

  if (!aUnePhoto(produit.id)) {
    return (
      <div className={`${classe} photo--vide`} aria-label={produit.nom}>
        <span>{produit.nom.charAt(0)}</span>
      </div>
    );
  }

  return (
    <img
      className={`${classe}${grisee ? ' photo--grisee' : ''}`}
      src={urlPhoto(produit.id)}
      alt={produit.nom}
      loading="lazy"
    />
  );
};
