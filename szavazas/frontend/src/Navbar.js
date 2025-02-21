import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "./images/logo1.png";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Felhasználó eltávolítása a LocalStorage-ból
    setIsLoggedIn(false); // Beállítjuk az állapotot kijelentkezettnek
    navigate("/"); // Átirányítjuk a főoldalra
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="hamburger-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <span className={menuOpen ? "bar open" : "bar"}></span>
        <span className={menuOpen ? "bar open" : "bar"}></span>
        <span className={menuOpen ? "bar open" : "bar"}></span>
      </div>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <ul>
          <li>
            <Link to="/admin" className={location.pathname === "/admin" ? "active" : ""}>Admin</Link>
          </li>
          <li>
            <Link to="/parties" className={location.pathname === "/parties" ? "active" : ""}>Pártok</Link>
          </li>
          <li>
            <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Kapcsolat</Link>
          </li>
          <li>
            <a href="/news" target="_blank" rel="noopener noreferrer">Hírek</a>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <Link to="/stats" className={location.pathname === "/stats" ? "active" : ""}>Statisztikák</Link>
              </li>
              <li>
                <Link to="/account" className={location.pathname === "/account" ? "active" : ""}>Profil</Link>
              </li>
              <li>
                <Link to="/voting" className={location.pathname === "/voting" ? "active" : ""}>Szavazz</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="logoutbutton">Kijelentkezés</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className={`loginbutton ${location.pathname === "/login" ? "active" : ""}`}>
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
