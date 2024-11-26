import React from 'react';
import './PrivacyPolicy.css';

function PrivacyPolicy() {
  return (
    <div className="privacy-container">
      <header className="privacy-header">
        <h1>Adatvédelmi Szabályzat</h1>
      </header>

      <section className="privacy-content">
        <div className="container">
          <h2>1. Az adatkezelő</h2>
          <p>A SzavazóPlatform Kft. (székhely: [székhely címe], cégjegyzékszám: [cégjegyzékszám]) az adatkezelő.</p>

          <h2>2. Milyen adatokat gyűjtünk?</h2>
          <p>A platform használata során az alábbi adatokat gyűjtjük:
            <ul>
              <li>Regisztrációkor megadott név, email cím, telefonszám</li>
              <li>A platform használatával kapcsolatos adatokat (pl. szavazatok, aktivitás)</li>
            </ul>
          </p>

          <h2>3. Hogyan használjuk fel az adatokat?</h2>
          <p>Az adatokat a következő célokra használjuk:
            <ul>
              <li>Szolgáltatásaink nyújtása és fejlesztése</li>
              <li>Kommunikáció a felhasználókkal (pl. hírlevelek)</li>
              <li>Jogi kötelezettségek teljesítése</li>
            </ul>
          </p>

          <h2>4. Az adatok tárolása</h2>
          <p>Az adatokat biztonságos szervereken tároljuk, és azokat kizárólag a szükséges ideig kezeljük. Az adatok védelmét titkosítási eljárásokkal biztosítjuk.</p>

          <h2>5. Az adatok megosztása</h2>
          <p>Az adatokat nem osztjuk meg harmadik féllel, kivéve, ha erre jogszabály kötelez.</p>

          <h2>6. Az Ön jogai</h2>
          <p>Önnek joga van hozzáférni a személyes adataihoz, kérheti azok törlését vagy helyesbítését.</p>

          <h2>7. Kapcsolat</h2>
          <p>Ha bármilyen kérdése van az adatkezeléssel kapcsolatban, kérjük, lépjen kapcsolatba velünk:</p>
          <ul>
            <li>Email: support@szavazoplatform.com</li>
            <li>Telefon: +36 1 234 5678</li>
          </ul>
        </div>
      </section>

    </div>
  );
}

export default PrivacyPolicy;
