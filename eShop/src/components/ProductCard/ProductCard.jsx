import React from "react";
import styles from "./ProductCard.module.scss";
import { useState, useEffect } from "react";
import Cart from "../Cart/Cart";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

const ProductCard = ({  firestoreData, hasSearched, addToCart}) => {
  const [cartCount, setCartCount] = useState(null);
  const [cart, setCart] = useState({});
  const [selectedOption, setSelectedOption] = useState('option1');
  const [isFav, setIsFav] = useState(firestoreData.favourited);
  


  // currently working but isnt synced up with Cart
  useEffect(() => {
    console.log(cartCount)
    console.log(cart)
  },[cartCount])


  const handleFav =  async () => {
    const favRef = doc(db, "pokemon", firestoreData.name);
    console.log(firestoreData);
    console.log(isFav);
    if(isFav) {
      await updateDoc(favRef, {
        favourited: false
      })
      setIsFav(firestoreData.favourited)
    } else {
      await updateDoc(favRef, {
        favourited: true
      })
      setIsFav(!firestoreData.favourited)
    }
    
};

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
  }

  return (
    <div >
    {hasSearched && (<div className={styles.ProductCard}>
      <button onClick={handleFav} className={isFav ? styles.fav: styles.notFav}>Fav</button>
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
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${firestoreData.pokedexId}.png`}
       alt="Offical Artwork" />}
      {selectedOption === "option2" && <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${firestoreData.pokedexId}.png`}
       alt="Offical Shiny Artwork" />}
      {selectedOption === "option3" && <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${firestoreData.pokedexId}.svg`}
       alt="Dream World Artwork" />}
      {selectedOption === "option4" && <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${firestoreData.pokedexId}.png`}
       alt="Home Artwork" />}
      {selectedOption === "option5" && <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${firestoreData.pokedexId}.png`}
       alt="Home Shiny Artwork" />}
      </div>
       <h2>{firestoreData.name}</h2>
      <h4 className={styles.price}><img className={styles.pokeball} src={`https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png`}/> Price: {firestoreData.price + ""}</h4>
      
      <button onClick={addToCart}>Add to cart</button>
    </div>)}
    </div>
  );
};

export default ProductCard;
