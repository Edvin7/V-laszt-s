import React from 'react';
import './Contacts.css';  
import './ContactsResponsive.css'
import Footer from './Footer';  
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
                Elküldés
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
      <Footer />
    </div>
  );
}

export default Contacts;
