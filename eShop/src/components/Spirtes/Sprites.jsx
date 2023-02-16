import React from 'react'
import SearchBar from "..SearchBar/SearchBar/SearchBar";

const Sprites = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleOnSubmit = (value) => {
    setSearchValue(value);
  };

  return (
    <div>
      <SearchBar onSubmit={handleOnSubmit} />
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/${searchValue}.png`}></img>
    </div>
  );
};

export default Sprites