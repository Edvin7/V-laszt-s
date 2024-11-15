import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importáld a Link komponenst
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
        <img src={logo} alt="logo" />
      </div>
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/">Szavazz</Link></li>
        <li><Link to="#">Statisztikák</Link></li>
        <li><Link to="#">Kapcsolat</Link></li>
        {/* Link a bejelentkezés oldalra */}
        <li><Link to="/login" className="loginbutton">Bejelentkezés</Link></li>
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
