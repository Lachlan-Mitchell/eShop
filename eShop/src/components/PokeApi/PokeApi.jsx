import React, { useState, useEffect } from "react";
import Cart from "../Cart/Cart";
import SearchBar from "../SearchBar/SearchBar";
import ApiFirestore from "../../services/API-to-firestore"
import PreSearchInfo from "../PreSearchInfo/PreSearchInfo";


const Pokemon = () => {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [cartCount, setCartCount] = useState(null);
  const [cart, setCart] = useState({})
 


  const fetchPokemon = async (name) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await res.json();
      setPokemon(data);
      setError(null);
    } catch (error) {
      setError(`Pokemon not found: ${name}`);
      setPokemon(null);
    }
  };


//  NEED TO WRITE TESTS FOR WHEN USER INPUTS ID INSTEAD OF NAME, THAT ID IS ALSO OKAY (BECAUSE OF HOW THE FETCH URL WORKS IF NAME OR ID IS PLACED IN IT WILL STILL RETURN THE CORRECT RESULT)



//set up firebase so onChange of qty effects the firestore. Will need qty for each type (default set all shinies to 10, then do catch rate for dreamworld officlal and home reg). 





const addToCart = () => {
  console.log(cart)
  console.log(cartCount)
  setCart(Object.assign({}, cart, { [pokemon.name]: (cart[pokemon.name] || 0) + 1 }))
  setCartCount(cartCount + 1);
  console.log(pokemon.name)
}

  return (
    <div>
      <Cart cartCount= {cartCount} items={cart}/>
      <SearchBar onSubmit={fetchPokemon} addToCart={addToCart}/>
      <ApiFirestore />
    </div>
  );
};

export default Pokemon;
