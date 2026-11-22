import { normaliser } from './texte';

// Codes promo : pourcentage ou montant fixe, avec un minimum d'achat éventuel
export const CODES_PROMO = {
  PETALE10: { type: 'pourcent', valeur: 10, minimum: 0, libelle: '-10 %' },
  BIENVENUE5: { type: 'montant', valeur: 5, minimum: 30, libelle: '-5 € dès 30 € d\'achat' },
};

export const nettoyerCode = (saisie) => normaliser(saisie).toUpperCase().replace(/\s+/g, '');

// Renvoie { ok, code, message } : le code est valide pour ce sous-total ?
export const verifierCodePromo = (saisie, sousTotal) => {
  const code = nettoyerCode(saisie);
  if (!code) return { ok: false, message: 'Saisissez un code promo' };
  const regle = CODES_PROMO[code];
  if (!regle) return { ok: false, message: 'Ce code n\'existe pas' };
  if (sousTotal < regle.minimum) {
    return { ok: false, message: `Ce code est valable dès ${regle.minimum} € d'achat` };
  }
  return { ok: true, code, message: `Code ${code} appliqué (${regle.libelle})` };
};

// Montant de la réduction (0 si le code est inconnu ou si le minimum n'est plus atteint)
export const calculerRemise = (code, sousTotal) => {
  const regle = code ? CODES_PROMO[code] : null;
  if (!regle || sousTotal < regle.minimum) return 0;
  const brut = regle.type === 'pourcent' ? (sousTotal * regle.valeur) / 100 : regle.valeur;
  return Math.min(sousTotal, Math.round(brut * 100) / 100);
};

// "2026-11-20T09:00:00.000Z" -> "20 nov. 2026"
const MOIS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
export const formaterDate = (iso) => {
  const d = new Date(iso);
  return `${d.getDate()} ${MOIS[d.getMonth()]} ${d.getFullYear()}`;
};
