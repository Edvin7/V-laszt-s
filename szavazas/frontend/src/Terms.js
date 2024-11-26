import React from 'react';
import './Terms.css';


function TermsOfService() {
  return (
    <div className="terms-container">
      <header className="terms-header">
        <h1>Általános Szerződési Feltételek</h1>
      </header>

      <section className="terms-content">
        <div className="container">
          <h2>1. Bevezetés</h2>
          <p>Az alábbi Általános Szerződési Feltételek (ÁSZF) az Ön és a SzavazóPlatform között létrejövő megállapodást szabályozzák. Kérjük, olvassa el figyelmesen a feltételeket, mielőtt bármilyen szolgáltatást igénybe venne az oldalon.</p>

          <h2>2. Szolgáltatás leírása</h2>
          <p>A SzavazóPlatform egy online szavazási és véleménynyilvánítási platform, amely lehetővé teszi a felhasználók számára, hogy egyszerűen és gyorsan szavazatokat adjanak le különböző kérdésekre. A platformon történő regisztráció és a szavazás igénybevételével a felhasználó elfogadja az alábbi feltételeket.</p>

          <h2>3. Adatkezelés</h2>
          <p>A SzavazóPlatform tiszteletben tartja a felhasználók adatvédelmét. Az alkalmazás használata során gyűjtött személyes adatokat kizárólag a szolgáltatás nyújtásának céljára használjuk. A felhasználókat tájékoztatjuk, hogy adataik kezelése során betartjuk a vonatkozó jogszabályokat, különösen az adatvédelmi törvényt (GDPR).</p>

          <h2>4. A felhasználók jogai és kötelezettségei</h2>
          <ul>
            <li>A felhasználó felelőssége, hogy valós adatokat adjon meg a regisztráció során.</li>
            <li>A felhasználó köteles tiszteletben tartani a platform használati szabályait, és nem használhatja azt jogellenes vagy zaklató célokra.</li>
            <li>A felhasználó nem adhatja át fiókját más személyeknek, és nem küldhet spam üzeneteket a platformon.</li>
          </ul>

          <h2>5. Szellemi tulajdon</h2>
          <p>Az alkalmazás és annak tartalma (beleértve a logókat, grafikákat, szövegeket és egyéb anyagokat) a SzavazóPlatform tulajdonát képezik, és azok jogi védettséget élveznek. A felhasználó nem jogosult a platformon található anyagokat másolni, módosítani, vagy forgalmazni anélkül, hogy erre írásos engedélyt kapott volna.</p>

          <h2>6. Felelősség korlátozása</h2>
          <p>A SzavazóPlatform nem vállal felelősséget a felhasználó által a platformon tett szavazatok vagy egyéb tevékenységek következményeiért. A platform használata során felmerülő problémákért (például adatvesztés, hibák, vírusok) nem vállalunk felelősséget.</p>

          <h2>7. A szerződés módosítása</h2>
          <p>A SzavazóPlatform fenntartja a jogot, hogy bármikor módosítsa az ÁSZF-et. A módosítások hatályba lépésével a felhasználó számára elérhetővé tesszük az új feltételeket, és a további használat azt jelenti, hogy elfogadja azokat.</p>

          <h2>8. Kapcsolat</h2>
          <p>Ha bármilyen kérdése van az ÁSZF-fel kapcsolatban, kérjük, lépjen kapcsolatba velünk az alábbi elérhetőségek egyikén:</p>
          <ul>
            <li>Email: support@szavazoplatform.com</li>
            <li>Telefon: +36 1 234 5678</li>
          </ul>

          <h2>9. Záró rendelkezések</h2>
          <p>Az ÁSZF-t a magyar jog szabályozza. A felek minden vitás ügyet a magyar bíróságok elé terjesztenek.</p>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>&copy; 2024 SzavazóPlatform. Minden jog fenntartva.</p>
        </div>
      </footer>
    </div>
  );
}

export default TermsOfService;
