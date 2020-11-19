import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import "./App.css";

function App() {
  const [newData, setNewData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=30"
      );
      const data = await response.json();
      const { results: pokemonList } = data;

      //pokeList has all 50pokemon. i need to fetch each pokemon data and set it to state.
      const pokeData = pokemonList.forEach(element => {
        async function fetchPoke() {
          const response = await fetch(element.url);
          const data = await response.json();
          setNewData(newData => [...newData, { data }]);
        }
        fetchPoke();
      });
    }
    fetchData();
    setLoading(false);
  }, []);

  function search(data) {
    return data.filter(
      element => element.data.name.toLowerCase().indexOf(filtered) > -1
    );
  }

  return (
    <div className="App">
      <div className="filter__box">
        <input
          type="text"
          value={filtered}
          onChange={e => setFiltered(e.target.value.toLowerCase())}
          className="filter__input"
          placeholder="Search..."
        />
      </div>
      {loading ? <div>...loading</div> : <Card data={search(newData)} />}
    </div>
  );
}

export default App;
