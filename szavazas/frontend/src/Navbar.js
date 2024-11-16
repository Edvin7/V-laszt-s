import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './images/most.png'; // Az útvonal a logóhoz

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Állapot a menü nyitásához/zárásához

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Menü nyitás/zárás
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      {/* Hamburger ikon mobil nézetben */}
      <div className="hamburger-icon" onClick={toggleMenu}>
        <div className={menuOpen ? 'bar open' : 'bar'}></div>
        <div className={menuOpen ? 'bar open' : 'bar'}></div>
        <div className={menuOpen ? 'bar open' : 'bar'}></div>
      </div>

      {/* Menüpontok, mobil nézetben a "active" osztállyal jelenik meg */}
      <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <ul>
          <li><Link to="/">Szavazz</Link></li>
          <li><Link to="#">Statisztikák</Link></li>
          <li><Link to="/contact">Kapcsolat</Link></li>
          <li><Link to="/login" className="loginbutton">Bejelentkezés</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
