
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from './images/logo1.png';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setIsAdmin(user.isAdmin);  // Ellenőrizzük, hogy admin-e
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/');


  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      {/* Hamburger ikon */}
      <div className="hamburger-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <span className={menuOpen ? "bar open" : "bar"}></span>
        <span className={menuOpen ? "bar open" : "bar"}></span>
        <span className={menuOpen ? "bar open" : "bar"}></span>
      </div>

      {/* Navigációs menü */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <ul>
<<<<<<< HEAD
          {isAdmin && <li><Link to="/admin">Admin</Link></li>}  {/* Csak adminoknak */}
          <li><Link to="/parties">Pártok</Link></li>
          <li><Link to="/contact">Kapcsolat</Link></li>
          <li><a href="/news" target="_blank" rel="noopener noreferrer">Hírek</a></li>

          {isLoggedIn ? (
            <>
              <li><Link to="/stats">Statisztikák</Link></li>
              <li><Link to="/account">Profil</Link></li>
              <li><Link to="/voting">Szavazz</Link></li>
              <li><button onClick={handleLogout} className="logoutbutton">Kijelentkezés</button></li>
=======
          <li>
            <Link 
              to="/admin" 
              className={location.pathname === "/admin" ? "active" : ""} 
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </Link>
          </li>
          <li>
            <Link 
              to="/parties" 
              className={location.pathname === "/parties" ? "active" : ""} 
              onClick={() => setMenuOpen(false)}
            >
              Pártok
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={location.pathname === "/contact" ? "active" : ""} 
              onClick={() => setMenuOpen(false)}
            >
              Kapcsolat
            </Link>
          </li>
          <li>
            <a href="/news" target="_blank" rel="noopener noreferrer">Hírek</a>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <Link 
                  to="/stats" 
                  className={location.pathname === "/stats" ? "active" : ""} 
                  onClick={() => setMenuOpen(false)}
                >
                  Statisztikák
                </Link>
              </li>
              <li>
                <Link 
                  to="/account" 
                  className={location.pathname === "/account" ? "active" : ""} 
                  onClick={() => setMenuOpen(false)}
                >
                  Profil
                </Link>
              </li>
              <li>
                <Link 
                  to="/voting" 
                  className={location.pathname === "/voting" ? "active" : ""} 
                  onClick={() => setMenuOpen(false)}
                >
                  Szavazz
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="logoutbutton">Kijelentkezés</button>
              </li>
>>>>>>> 8639493b63a2a44d0c7e54b1f89fe2f845bcb778
            </>
          ) : (
            <li>
              <Link 
                to="/login" 
                className={`loginbutton ${location.pathname === "/login" ? "active" : ""}`} 
                onClick={() => setMenuOpen(false)}
              >
                Bejelentkezés
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
