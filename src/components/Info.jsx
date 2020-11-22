import React, { useState, useEffect, Fragment } from "react";

export default function PokemonInfo({ infoUrl }) {
  const [speciesInfo, setSpeciesInfo] = useState("");
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");

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
        <Fragment>
          <div
            className={
              toggle ? "card__info--details-show" : "card__info--details"
            }
          >
            <div className="card__info--detail">
              {speciesInfo && speciesInfo[0].flavor_text_entries[0].flavor_text}
            </div>
            <div className="card__info--comment">
              <input
                type="text"
                name="comment"
                value={comment}
                onChange={e => setComment(e.target.value)}
                className="comment__input"
                placeholder="Pro Tip"
              />
            </div>
          </div>
        </Fragment>
      )}
    </section>
  );
}
