import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "./images/logo1.png";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      {/* Hamburger ikon mobil nézethez */}
      <div className="hamburger-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <span className={menuOpen ? "bar open" : "bar"}></span>
        <span className={menuOpen ? "bar open" : "bar"}></span>
        <span className={menuOpen ? "bar open" : "bar"}></span>
      </div>

      {/* Menü linkek */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <ul>
          <li><Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link></li>
          <li><Link to="/parties" onClick={() => setMenuOpen(false)}>Pártok</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Kapcsolat</Link></li>
          <li><a href="/news" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Hírek</a></li>

          {isLoggedIn ? (
            <>
              <li><Link to="/stats" onClick={() => setMenuOpen(false)}>Statisztikák</Link></li>
              <li><Link to="/account" onClick={() => setMenuOpen(false)}>Profil</Link></li>
              <li><Link to="/voting" onClick={() => setMenuOpen(false)}>Szavazz</Link></li>
              <li><button onClick={handleLogout} className="logoutbutton">Kijelentkezés</button></li>
            </>
          ) : (
            <li><Link to="/login" className="loginbutton" onClick={() => setMenuOpen(false)}>Bejelentkezés</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
