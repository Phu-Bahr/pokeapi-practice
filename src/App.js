import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import "./App.css";

function App() {
  const [newData, setNewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtered, setFiltered] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const data = await response.json();
        const { results: pokemonList } = data;
        pokemonList.forEach(element => {
          async function fetchPoke() {
            try {
              const response = await fetch(element.url);
              const data = await response.json();
              setNewData(newData => [...newData, data]);
            } catch (error) {
              console.log(error);
            }
          }
          fetchPoke();
        }, []);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function search(data) {
    return data.filter(element =>
      element.name.toLowerCase().includes(filtered.toLowerCase())
    );
  }

  return (
    <div className="App">
      <div></div>
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
