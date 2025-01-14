import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from './images/most.png';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();  

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false); 
    navigate('/'); 
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="nav-links">
        <ul>
          <li><Link to="/admin">Admin</Link></li>
          <li><Link to="/parties">Pártok</Link></li>
          <li><Link to="/stats">Statisztikák</Link></li>
          <li><a href="/news" target="_blank" rel="noopener noreferrer">Hírek</a></li>
         
          {isLoggedIn ? (
            <>
              <li><Link to="/account">Profil</Link></li>
              <li><Link to="/voting">Szavazz</Link></li>
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
