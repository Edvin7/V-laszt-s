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
    <Router>
      <div>
        <Routes>
          {/* Regisztrációs és Bejelentkezési oldalak, nem tartalmazzák a Navbar-t */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Alapértelmezett oldal, amely tartalmazza a Navbar-t, Section1 és Section2-t */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Section1 />
                <Section2 />
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
