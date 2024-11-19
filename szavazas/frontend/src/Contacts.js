import React from 'react';
import './Contacts.css';  // Importáljuk a CSS fájlt
import './ContactsResponsive.css'
import Footer from './Footer';  // Importáljuk a Footer komponenst
import { Link } from 'react-router-dom';


const Contacts = () => {
  return (
    <div className="contact_us_green">
  <div className="responsive-container-block big-container">
    <div className="responsive-container-block container">
      <div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-7 wk-ipadp-10 line" id="i69b-2">
        <form className="form-box">
          <div className="container-block form-wrapper">
            <div className="head-text-box">
              <p className="text-blk contactus-head">
                Online Szavazás
              </p>
              <p className="text-blk contactus-subhead">
                Kérjük, vegyen részt az országos online szavazásban! Adja meg az adatokat a szavazás befejezéséhez.
              </p>
            </div>
            <div className="responsive-container-block">
              <div className="responsive-cell-block wk-ipadp-6 wk-tab-12 wk-mobile-12 wk-desk-6" id="i10mt-6">
                <p className="text-blk input-title">
                  NÉV
                </p>
                <input className="input" id="ijowk-6" name="FirstName" />
              </div>
              <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                <p className="text-blk input-title">
                  VÁLASZTHATÓ OPÍCIÓ
                </p>
                <select className="input" name="voteOption">
                  <option value="option1">Segitség kérés</option>
                  <option value="option2">Hibajelentés</option>
                  <option value="option3">Visszajelzés</option>
                  <option value="option4">Egyéb</option>
                </select>
              </div>
              <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                <p className="text-blk input-title">
                  EMAIL
                </p>
                <input className="input" id="ipmgh-6" name="Email" />
              </div>
              <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                <p className="text-blk input-title">
                  TELEFONSZÁM
                </p>
                <input className="input" id="imgis-5" name="PhoneNumber" />
              </div>
              <div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" id="i634i-6">
                <p className="text-blk input-title">
                  MEGJEGYZÉS
                </p>
                <textarea className="textinput" id="i5vyy-6" placeholder=""></textarea>
              </div>
            </div>
            <div className="btn-wrapper">
              <button className="submit-btn">
                Szavazás leadása
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-5 wk-ipadp-10" id="ifgi">
        <div className="container-box">
          <div className="text-content">
            <p className="text-blk contactus-head">
              Kapcsolat
            </p>
            <p className="text-blk contactus-subhead">
              Ha bármilyen kérdése van az online szavazással kapcsolatban, vegye fel velünk a kapcsolatot az alábbi elérhetőségek egyikén.
            </p>
          </div>
          <div className="workik-contact-bigbox">
            <div className="workik-contact-box">
              <div className="phone text-box">
                <img className="contact-svg" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET21.jpg" alt="phone" />
                <p className="contact-text">
                +36 76 462 332
                </p>
              </div>
              <div className="address text-box">
                <img className="contact-svg" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET22.jpg" alt="address" />
                <p className="contact-text">
                  info@online-szavazas.hu
                </p>
              </div>
              <div className="mail text-box">
                <img className="contact-svg" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET23.jpg" alt="mail" />
                <p className="contact-text">
                6100 Kiskunfélegyháza, Kossuth u. 24.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
      <Footer />
    </div>
  );
}

export default Contacts;
