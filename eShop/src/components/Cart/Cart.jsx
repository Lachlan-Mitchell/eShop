import React from 'react'
import { useState } from 'react'
import Checkout from '../../containers/Checkout/Checkout'
import styles  from './Cart.module.scss'


const Cart = ({cartCount, items}) => {
  const [display, setDisplay] = useState(false)
  const [currentItems, setCurrentItems] = useState(items);


  const countFrequency = (obj) => {
    return Object.entries(obj).reduce((frequency, [item, quantity]) => {
      frequency[item] = quantity
      return frequency
    }, {})
  }
  
  const handleRemove = (item) => {
    
  }

  const displayItems = (event) => {
    event.target;
    console.log(cartCount) // currently not recieving cartCount
    setDisplay(!display)
  }

  return (
    <div>
      <button onClick={displayItems}>Cart: {cartCount}</button>
      {display && (
        <ul className={styles.itemsList}>
          {Object.entries(countFrequency(items)).map(([item, frequency]) => (
            <li key={item}>{`${frequency}x ${item}`} <button onClick={() => handleRemove(item)}>X</button></li>
          ))}
        </ul>
      )}
      <div  className={styles.hidden}>
      <Checkout cartCount={cartCount} items={items}/>
      </div>
      
    </div>
  )
}

export default Cart
