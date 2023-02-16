import React from 'react'
import styles from './Nav.module.scss'
import {NavLink} from 'react-router-dom'


const Nav = () => {
  const activeStyle = ({ isActive }) => {
    return isActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link;
  };
  return (
   <nav className={styles.navbar}>
      <NavLink to='/' className={activeStyle}>Home</NavLink>
      <NavLink to='/checkout' className={activeStyle}>Checkout</NavLink> 
   </nav>
  );
};

export default Nav