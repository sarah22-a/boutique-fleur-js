export const BarreRecherche = ({ valeur, onChange, onEffacer }) => (
  <div className="recherche">
    <input
      type="search"
      className="recherche__champ"
      placeholder="Rechercher une fleur"
      autoComplete="off"
      value={valeur}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Rechercher une fleur"
    />
    {valeur !== '' && (
      <button type="button" className="recherche__effacer" onClick={onEffacer} aria-label="Effacer la recherche">
        ×
      </button>
    )}
  </div>
);
