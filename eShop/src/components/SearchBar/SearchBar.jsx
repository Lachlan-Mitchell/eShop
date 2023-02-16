import { useRef, useState } from "react";
import ApiFirestore from "../../services/API-to-firestore";
import getPokemon from "../../services/API-to-firestore";
import { db } from "../../../config/firebase.js";
import { getDoc, doc } from "firebase/firestore";
import ProductCard from "../ProductCard/ProductCard"
import PreSearchInfo from "../PreSearchInfo/PreSearchInfo"
import Carousal from "../Carousal/Carousal";

const SearchBar = ({ onSubmit, addToCart }) => {
  const searchRef = useRef();
  const [firestoreData, setFirestoreData] = useState({})
  const [hasSearched, setHasSearched] = useState(false)
  const [isFav, setIsFav] = useState(firestoreData.favourited);
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(searchRef.current.value);
    setHasSearched(true);
  };

  const getPokemon = async (searchRef) => {
    const pokemonName = searchRef.current.value;
    const docRef = doc(db, "pokemon", pokemonName);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setFirestoreData(docSnap.data());
      console.log(firestoreData)
        
    } else {
      console.log("No such document!");
      setFirestoreData(0);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          data-testid="Search_Bar"
          placeholder="Search for a Pokemon"
          type="text"
          ref={searchRef}
        />
        <button onClick={() => getPokemon(searchRef)}>Search</button>
        {!hasSearched && <PreSearchInfo firestoreData = {firestoreData} hasSearched={hasSearched} addToCart={addToCart}/>}
       
        {!firestoreData && hasSearched ? (<p>Pokemon: could not be found!</p>) : (<ProductCard firestoreData = {firestoreData} hasSearched={hasSearched} addToCart={addToCart} isFav={isFav}/>)}
        
      </form>
      <Carousal isFav={isFav} firestoreData={firestoreData} searchRef= {searchRef}/>
    </>
  );
};

export default SearchBar;
