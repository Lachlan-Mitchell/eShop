import { collection, addDoc, getDocs, getDoc, doc, increment, setDoc} from "firebase/firestore";
import { db } from "../../config/firebase.js";
import { useState, useEffect } from "react";

const ApiFirestore = () => {
  const [pokemon, setPokemon] = useState([]);
  const [iWontChange, setIWontChange] = useState(null);
  //Create
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=385")
      .then(response => response.json())
      .then(data => setPokemon(data.results));
  }, []);

  useEffect(() => {
    pokemon.forEach(async pokemon => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      const data = await response.json();
      const priceResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`);
      const priceData = await priceResponse.json();
      const price = 256 - priceData.capture_rate;
      

      const addPokemon = await setDoc(doc(db, "pokemon", data.name),{
          pokedexId: data.id,
          name: pokemon.name,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
          favourited: false,
          price: price,
          quantity: data.base_experience,
          variants: ["offical", "dream_world", "home", "home_shiny", "offical_shiny"],
        });
    });
  }, [iWontChange]);
};

export default ApiFirestore;
