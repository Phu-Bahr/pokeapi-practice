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
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      const data = await response.json();
      const { results: pokemonList } = data;

      //why does it save another 150 everytime I save to file? Why the lag on the 3rd fetch in info?
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
      element =>
        element.data.name.toLowerCase().indexOf(filtered.toLowerCase()) > -1
    );
  }

  return (
    <div className="App">
      {loading ? (
        <div>...loading</div>
      ) : (
        <Card
          data={search(newData)}
          filtered={filtered}
          setFiltered={setFiltered}
        />
      )}
    </div>
  );
}

export default App;
