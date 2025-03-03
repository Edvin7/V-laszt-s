import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from './images/logo1.png';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVotingActive, setIsVotingActive] = useState(false); // Szavazás aktív státusz

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setIsAdmin(user.isAdmin);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchVotingStatus = async () => {
      try {
        const response = await fetch('/api/is-voting-active');
        const data = await response.json();
        console.log('Voting status:', data.isActive); // Ellenőrizzük, mi érkezik
        setIsVotingActive(data.isActive); // Frissítjük az állapotot
      } catch (error) {
        console.error('Error fetching voting status:', error);
      }
    };

    fetchVotingStatus(); // Elindítjuk az első lekérést

    // Frissítjük 5 másodpercenként
    const interval = setInterval(fetchVotingStatus, 5000);
    return () => clearInterval(interval); // Tisztítjuk az interval-t, ha a komponens eltűnik
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          {isAdmin && <li><Link to="/admin">Admin</Link></li>}
          <li><Link to="/parties">Pártok</Link></li>
          <li><Link to="/contact">Kapcsolat</Link></li>
          <li><a href="/news" target="_blank" rel="noopener noreferrer">Hírek</a></li>

          {isLoggedIn ? (
            <>
              <li><Link to="/stats">Statisztikák</Link></li>
              <li><Link to="/account">Profil</Link></li>
              {/* Ha a szavazás aktív, akkor jelenjen meg a Szavazz link */}
              {isVotingActive && <li><Link to="/voting">Szavazz</Link></li>}
              <li><button onClick={handleLogout} className="logoutbutton">Kijelentkezés</button></li>
            </>
          ) : (
            <li><Link to="/login" className="loginbutton">Bejelentkezés</Link></li>
          )}
        </ul>
      </div>

      <div className="hamburger-icon" onClick={toggleMenu}>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
      </div>
    </nav>
  );
};

export default Navbar;
