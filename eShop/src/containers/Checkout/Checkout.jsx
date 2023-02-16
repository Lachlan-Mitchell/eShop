import React, { useEffect } from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './checkout.module.scss'
import SearchBar from "../../components/SearchBar/SearchBar";
import Cart from "../../components/Cart/Cart";

const Checkout = ({ items, cartCount }) => {
  const [cartEmpty, setCartEmpty] = useState(true);

  useEffect(() => {
    console.log("this be the items",items)
    if (items && Object.entries(items).length > 0) {
      return setCartEmpty(false);
    } else {
      return setCartEmpty(true);
    }
  }, [items]);

  const countFrequency = (obj) => {
    return Object.entries(obj).reduce((frequency, [item, quantity]) => {
      frequency[item] = quantity;
      return frequency;
    }, {});
  };

  const handleRemove = () => {
    return 0;
  };

  return (
    <>
      <h2>Pay me now</h2>
      {!cartEmpty ? (
        <ul>
          {Object.entries(countFrequency(items)).map(([item, frequency]) => (
            <li key={item}>
              {`${frequency}x ${item}`}{" "}
              <button onClick={() => handleRemove(item)}>X</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Sorry The Checkout feature has not been completley enabled, please enjoy looking at the first 3 gen's of pokemon</p>
      )}
    </>
  );
};

export default Checkout