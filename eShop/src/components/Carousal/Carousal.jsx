import React, { useState, useEffect } from 'react'
import styles from './Carousal.module.scss'
import { db,  } from '../../../config/firebase'
import { collection, getDocs, where, query} from "firebase/firestore";

const Carousal = ({isFav, firestoreData, searchRef}) => {
const [favPokemon, setFavPokemon] = useState([]);
const [currentIndex, setCurrentIndex] = useState(0);
const [displayedPokemons, setDisplayedPokemons] = useState(favPokemon.slice(0,3))

useEffect(()=> {
  setDisplayedPokemons(favPokemon.slice(currentIndex, currentIndex + 3));
},[isFav, currentIndex])


useEffect(() => {
  const fetchData = async () => {
  const favPokemonRef = collection(db, "pokemon");
  const q = query(favPokemonRef, where("favourited", "==", true));
  const querySnapshot =  await getDocs(q);
  const favPokemonArray = [];
  querySnapshot.forEach(( doc => favPokemonArray.push({ ...doc.data(), id: doc.id })))
  console.log("favPokemon array updated",favPokemonArray)
  console.log(favPokemonArray)
  setFavPokemon(favPokemonArray);
  };

  fetchData();    
}, [searchRef]);

const handleNext = () => {
  if (currentIndex + 3 < favPokemon.length) {
    setCurrentIndex(currentIndex + 3);
  } else {
    setCurrentIndex(0);
  }
}
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 3);
    } else {
      setCurrentIndex(favPokemon.length - 3);
    }
};
  return (
    <div>
       <h2>Our Favourite Pokemon!</h2>
       <div className={styles.Carousal}>
          <button onClick={handlePrev}>Prev</button>
     
    {displayedPokemons.map(pokemon => (
      <div className={styles.FavPokemon}>
              <img key={pokemon.name} src={pokemon.imageUrl} ></img>
      <h4>{pokemon.name}</h4>
      </div>

    ))}

    <button onClick={handleNext}>Next</button>
  </div>
    </div>
    
  )

}

export default Carousal