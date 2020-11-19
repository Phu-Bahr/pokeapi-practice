import React, { useState, useEffect } from "react";

export default function PokemonInfo({ infoUrl }) {
  const [speciesInfo, setSpeciesInfo] = useState("");
  const [toggle, setToggle] = useState(false);

  console.log("species pre useEffect", speciesInfo);

  function getPokeInfo() {
    async function fetchInfo() {
      const response = await fetch(infoUrl);
      const data = await response.json();
      setSpeciesInfo(speciesInfo => [...speciesInfo, { data }]);
    }
    fetchInfo();
    setToggle(!toggle);
  }

  console.log(speciesInfo);

  return (
    <section className="card__info">
      <button className="card__info--button" onClick={() => getPokeInfo()}>
        More Info
      </button>
      <div className="card__info--details">
        {speciesInfo &&
          toggle &&
          speciesInfo[0].data.flavor_text_entries[0].flavor_text}
      </div>
    </section>
  );
}
