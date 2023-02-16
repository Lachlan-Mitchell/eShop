import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import Pokemon from './components/PokeApi/PokeApi'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ApiFirestore from './services/API-to-firestore'
import Checkout from './containers/Checkout/Checkout'
import HomePage from './containers/HomePage/HomePage'
import Nav from './components/Nav/Nav'

function App() {

  return (
    <>
    <BrowserRouter>
    <Nav />
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/checkout'  element={<Checkout />}/>
    </Routes>
    </BrowserRouter>
    </>

  )
}

export default App
