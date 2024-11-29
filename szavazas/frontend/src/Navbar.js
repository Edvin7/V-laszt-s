import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './images/most.png'; // Az útvonal a logóhoz

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Állapot a menü nyitásához/zárásához
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Bejelentkezési állapot

  useEffect(() => {
    // Ellenőrizzük, hogy van-e bejelentkezett felhasználó a localStorage-ban
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true); // Ha van bejelentkezett felhasználó, akkor true
    }
  }, []); // Ez csak egyszer fut le, amikor az oldal betöltődik

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Menü nyitás/zárás
  };

  const handleLogout = () => {
    // Kijelentkezés, töröljük a localStorage-ból a felhasználót
    localStorage.removeItem('user');
    setIsLoggedIn(false); // Bejelentkezési állapot frissítése
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
          <li><Link to="/voting">Szavazz</Link></li>
          <li><Link to="/parties">Pártok</Link></li>
          <li><Link to="/stats">Statisztikák</Link></li>
          <li><a href="/news" target="_blank" rel="noopener noreferrer">Hírek</a></li>
          <li><Link to="/contact">Kapcsolat</Link></li>
          
          {/* Dinamikusan jelenik meg a bejelentkezett állapottól függően */}
          {isLoggedIn ? (
            <>
              <li><Link to="/account">Profil</Link></li>
              <li><button onClick={handleLogout} className="logoutbutton">Kijelentkezés</button></li>
            </>
          ) : (
            <li><Link to="/login" className="loginbutton">Bejelentkezés</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
