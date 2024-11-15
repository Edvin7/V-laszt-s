import React, { useState } from 'react';
import './Navbar.css'; // A CSS fájl, amit mellékelsz a stílushoz
import logo from './images/most.png';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleHamburgerClick = () => {
    setMenuOpen(!menuOpen); // Toggle the menu open/close state
  };

  return (
    <nav className="navbar">
      <div className="logo">
      <img src={logo} href="index.html" alt="logo" />


      </div>
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li><a href="#">Szavazz</a></li>
        <li><a href="#">Statisztikák</a></li>
        <li><a href="#">Kapcsolat</a></li>
        <li><a href="loading.html" className="loginbutton">Bejelentkezés</a></li>
      </ul>
      <div className={`hamburger ${menuOpen ? 'hamburger-active' : ''}`} onClick={handleHamburgerClick}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>
    </nav>
  );
};



export default Navbar;
