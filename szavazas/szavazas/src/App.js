// src/App.js
import React from 'react';
import Navbar from './Navbar'; // A Navbar komponenst importálod
import Section1 from './Section1'; // Az előző Section1 komponens importálása
import Section2 from './Section2'; // Az új Section2 komponens importálása
import Footer from './Footer'; // Az új Footer komponenst importálása
import './App.css'; // Alap CSS fájl
import './Section1.css'; // Az előző Section1 CSS fájl
import './Section2.css'; // Az új Section2 CSS fájl
import './Footer.css'; // A Footer CSS fájl
import './loginform.css';  // importáld be a css fájlt




const App = () => {
  return (
    <div>
      <Navbar />
      <Section1 />
      <Section2 />
      <Footer /> {/* Footer hozzáadása az oldal aljához */}
    </div>
  );
};

export default App;
