import React from "react";
import PokemonInfo from "./Info";

const pokeFeet = pokeHeight => {
  return Math.round((pokeHeight / 3.048 + Number.EPSILON) * 100) / 100;
};

const pokePounds = pokeWeight => {
  return Math.round((pokeWeight / 4.536 + Number.EPSILON) * 100) / 100;
};

export default function Card({ data, filtered, setFiltered }) {
  return (
    <section className="card-section">
      <div className="filter__box">
        <label htmlFor={`filter` + data.id}></label>
        <input
          type="text"
          id={`filter` + data.id}
          name="filter"
          value={filtered}
          onChange={e => setFiltered(e.target.value)}
          className="filter__input"
          placeholder="Search..."
        />
      </div>

      {data.map(element => (
        <div key={element.id} className="card">
          <img
            src={element.sprites.front_default}
            alt={`photo of` + element.name}
            className="card__img"
          />
          <h1 className="card__name">{element.name}</h1>
          <div className="card__height">
            Height: {pokeFeet(element.weight)} ft
          </div>
          <div className="card__weight">
            Weight: {pokePounds(element.weight)} lbs
          </div>
          <PokemonInfo infoUrl={element.species.url} />
          <h2 className="card__abilities--header">Abilities:</h2>
          <div className="card__abilities">
            {element.abilities.map((item, index) => (
              <li className="card__abilities--ability" key={index}>
                {item.ability.name}
              </li>
            ))}
          </div>
        </div>
      ))}

      {data == "" && (
        <div
          className="card"
          onClick={() => setFiltered("")}
          style={{ cursor: "pointer" }}
        >
          No Results...Clear Search
        </div>
      )}
    </section>
  );
}
