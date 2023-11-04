import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Game from './components/Game';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter >
      <Routes basename="/">
        
          <Route path='/' element={<Home />} />
          <Route path='game' element={<Game />} />
          <Route path='highscore' element={<Game />} />
          <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
