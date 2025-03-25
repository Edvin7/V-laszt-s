import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = ({ isLoggedIn }) => {
  return (
    <footer>
      <div className="footer">
        <div className="row">
          <ul>
            <li><Link to="/contact">Kapcsolat</Link></li>
            <li><a href="/voting">Szavazok</a></li>
            {/*<li><Link to="/privacy">Adatvédelmi szabályzat</Link></li>*/}
            {/*<li><Link to="/terms">Általános Szerződési Feltételek</Link></li>*/}
            {!isLoggedIn && <li><Link to="/login">Bejelentkezés</Link></li>}
          </ul>
        </div>
        <div className="row">
          Copyright © 2024 Szavazz.hu - Minden jog fenntartva || Készítette: Bodri Dávid, Pál Edvin
        </div>
      </div>
    </footer>
  );
};

export default Footer;
