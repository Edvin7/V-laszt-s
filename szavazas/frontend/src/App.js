import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Router és Route komponensek importálása
import Navbar from './Navbar';
import Section1 from './Section1';
import Section2 from './Section2';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';

import './App.css';
import './Section1.css';
import './Section2.css';
import './Footer.css';
import './Login.css';
import './Register.css';

const App = () => {
  return (
    <Router>  {/* A Router beágyazása az egész alkalmazásba */}
      <div>
        <Navbar />  {/* Navigáció */}
        <Routes>  {/* A különböző útvonalak */}
          <Route path="/login" element={<Login />} />  {/* Bejelentkezés oldal */}
          <Route path="/register" element={<Register />} />  {/* Regisztráció oldal */}
        </Routes>
        <Section1 />
        <Section2 />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
