// src/Footer.js
import React from 'react';
import './Footer.css'; // Ha van CSS fájl a footerhez

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="row">
          <ul>
            <li><a href="#">Kapcsolat</a></li>
            <li><a href="#">Szavazok</a></li>
            <li><a href="#">Adatvédelmi szabályzat</a></li>
            <li><a href="#">Általános Szerződési Feltételek</a></li>
            <li><a href="#">Bejelentkezés</a></li>
          </ul>
        </div>
        <div className="row">
          Copyright © 2024 Szavazz.hu - Minden jog fenntartva || Készítette: Bodri Dávid, Pál Edvin
        </div>
      </div>
    </footer>
  );
};

export default Footer; // FONTOS: Az alapértelmezett export
