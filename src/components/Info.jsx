import React, { useState, useEffect } from "react";

export default function PokemonInfo({ infoUrl }) {
  const [speciesInfo, setSpeciesInfo] = useState("");
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchInfo() {
      //begin
      setLoading(true);
      try {
        const response = await fetch(infoUrl);
        const data = await response.json();
        setSpeciesInfo(speciesInfo => [...speciesInfo, data]);
        //success
        setLoading(false);
      } catch (error) {
        console.log(error);
        //failure
        setLoading(false);
      }
    }
    fetchInfo();
  }, [infoUrl]);

  return (
    <section className="card__info">
      <button className="card__info--button" onClick={() => setToggle(!toggle)}>
        More Info
      </button>

      {loading && toggle ? (
        //debugger
        <div className="card__info--details-show">...loading</div>
      ) : (
        <div
          className={
            toggle ? "card__info--details-show" : "card__info--details"
          }
        >
          {speciesInfo && speciesInfo[0].flavor_text_entries[0].flavor_text}
        </div>
      )}
    </section>
  );
}
