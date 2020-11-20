import React, { useState, useEffect } from "react";

export default function PokemonInfo({ infoUrl }) {
  const [speciesInfo, setSpeciesInfo] = useState("");
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInfo() {
      const response = await fetch(infoUrl);
      const data = await response.json();
      setSpeciesInfo(speciesInfo => [...speciesInfo, { data }]);
    }
    fetchInfo();
    setLoading(false);
  }, []);

  return (
    <section className="card__info">
      <button className="card__info--button" onClick={() => setToggle(!toggle)}>
        More Info
      </button>

      {loading && toggle ? (
        <div className="card__info--details-show">...loading</div>
      ) : (
        <div
          className={
            toggle ? "card__info--details-show" : "card__info--details"
          }
        >
          {speciesInfo &&
            speciesInfo[0].data.flavor_text_entries[0].flavor_text}
        </div>
      )}
    </section>
  );
}
