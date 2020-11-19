import React, { useState, useEffect } from "react";
import PokemonInfo from "./Info";

export default function Card({ data }) {
  return (
    <section className="card-section">
      {data.map(element => (
        <div key={element.id} className="card">
          <img
            src={element.data.sprites.front_default}
            alt={`photo of` + element.data.name}
            className="card__img"
          />
          <h1 className="card__name">{element.data.name}</h1>
          <div className="card__height">
            Height:{" "}
            {Math.round((element.data.height / 3.048 + Number.EPSILON) * 100) /
              100}{" "}
            ft
          </div>
          <div className="card__weight">
            Weight:{" "}
            {Math.round((element.data.weight / 4.536 + Number.EPSILON) * 100) /
              100}{" "}
            lbs
          </div>
          <h2 className="card__abilities--header">Abilities:</h2>
          <div className="card__abilities">
            {element.data.abilities.map(element => (
              <li className="card__abilities--ability">
                {element.ability.name}
              </li>
            ))}
          </div>

          <PokemonInfo infoUrl={element.data.species.url} />
        </div>
      ))}
    </section>
  );
}
