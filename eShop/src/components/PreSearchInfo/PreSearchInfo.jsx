import { useState, useEffect } from 'react';
import { collection, getDocs, where, query} from "firebase/firestore";
import { db } from '../../../config/firebase.js';
import styles from './PreSearchInfo.module.scss'
import { async } from '@firebase/util';

const PreSearchInfo = ({firestoreData, hasSearched, addToCart}) => {
  const [starterPokemon, setStarterPokemon] = useState([]);
  const [selectedOption, setSelectedOption] = useState('option1')


  const starters = [1,4,7,152,155,158,252,255,258]
  useEffect(() => {
    const fetchData = async () => {
    const pokemonRef = collection(db, "pokemon");
    const q = query(pokemonRef, where("pokedexId", "in", starters));
    const querySnapshot =  await getDocs(q);
    const pokemonArray = [];
    querySnapshot.forEach(( doc => pokemonArray.push({ ...doc.data(), id: doc.id })))
    setStarterPokemon(pokemonArray);
    };

    fetchData();    
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
  }

  return (
    <div>
      <h2>The following is a demonstration, please search the pokemon you want to add to cart and favourite</h2>
    <div className={styles.PreSearchInfo}>
      
      {starterPokemon.map(pokemon => (
        <div className={styles.ProductCard} key={pokemon.id}>
        <div>
        <label>Pokemon Variants</label>
        <select id="variants" value={selectedOption} onChange={handleOptionChange}>
          <option value="option1">Offical</option>
          <option value="option2">Offical Shiny</option>
          <option value="option3">Dream World</option>
          <option value="option4">Home</option>
          <option value="option5">Home Shiny</option>
        </select>
        {selectedOption === "option1" && <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedexId}.png`}
         alt="Offical Artwork" />}
        {selectedOption === "option2" && <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemon.pokedexId}.png`}
         alt="Offical Shiny Artwork" />}
        {selectedOption === "option3" && <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.pokedexId}.svg`}
         alt="Dream World Artwork" />}
        {selectedOption === "option4" && <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.pokedexId}.png`}
         alt="Home Artwork" />}
        {selectedOption === "option5" && <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${pokemon.pokedexId}.png`}
         alt="Home Shiny Artwork" />}
        </div>
         <h2>{pokemon.name}</h2>
        <h4 className={styles.price}><img className={styles.pokeball} src={`https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png`}/> Price: {pokemon.price + ""}</h4>
      </div>
      ))}
    </div>
    </div>
    
  );
};

export default PreSearchInfo;
