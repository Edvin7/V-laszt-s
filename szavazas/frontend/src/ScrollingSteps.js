import React, { useEffect, useState } from 'react';
import './ScrollingSteps.css';
import { Link } from 'react-router-dom';

const steps = [
  {
    id: 1,
    title: '1. lépés: Regisztráció',
    description: 'A szavazáshoz először regisztrálnia kell a platformon. Ehhez adja meg az alapvető adatait, például nevét, e-mail-címét és hozzon létre egy biztonságos jelszót. A regisztráció után egy megerősítő e-mailt küldünk, amelyben található linkre kattintva aktiválhatja fiókját.',
    buttonText: 'Regisztráljon most',
    link: '/register',
  },
  {
    id: 2,
    title: '2. lépés: Bejelentkezés',
    description: 'A regisztráció befejezése után jelentkezzen be a fiókjába az e-mail-címével és jelszavával. A bejelentkezés után hozzáférhet a szavazási lehetőségekhez és ellenőrizheti a rendelkezésre álló információkat.',
    buttonText: 'Jelentkezzen be',
    link: '/login',
  },
  {
    id: 3,
    title: '3. lépés: Szavazás leadása',
    description: 'Miután bejelentkezett, kiválaszthatja a szavazási opciókat a rendelkezésre álló listából. Jelölje ki a választását, majd kattintson a "Szavazás" gombra. A rendszer megkérheti, hogy erősítse meg a döntését. A sikeres szavazást követően egy megerősítő üzenetet kap.',
    buttonText: 'Szavazzon most',
    link: '/vote',
  },
];




const ScrollingSteps = () => {
  const [visibleStep, setVisibleStep] = useState(0);  // Aktuális lépés, amely látható
  const [sectionInView, setSectionInView] = useState(false);  // A szekció láthatósága

  useEffect(() => {
    const sectionObserverOptions = {
      root: null, // A viewportot használjuk
      rootMargin: '0px',
      threshold: 0.3,  // 30%-os láthatóság kell a szekcióhoz
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setSectionInView(true);  // Ha látható, kezdjük el a lépéseket figyelni
        } else {
          setSectionInView(false);
        }
      });
    }, sectionObserverOptions);

    const sectionElement = document.querySelector('.scrolling-steps-section');
    if (sectionElement) {
      sectionObserver.observe(sectionElement);
    }

    return () => {
      sectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!sectionInView) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const stepId = entry.target.dataset.step;
          setVisibleStep(prevStep => Math.max(prevStep, parseInt(stepId, 10)));
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scrolling-step').forEach(step => {
      observer.observe(step);
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionInView]);

  return (
    <div className="my-5 full-width-container">
      <section className="scrolling-steps-section">
        <div className="header text-center mb-5">
          <h2 className="font-weight-bold display-4">
            Hogyan tud <span style={{ color: '#033473' }}>szavazni?</span>
          </h2>
        </div>
        <div className="steps-container">
  {steps.map((step) => (
    <div key={step.id} 
      className={`scrolling-step ${visibleStep >= step.id ? 'show' : ''}`} 
      data-step={step.id}>
      <div className="step-header">
        <div className="circle">{step.id}</div>
      </div>
      <div className="step-body">
        <h4>{step.title}</h4>
        <p>{step.description}</p>
        <Link to={step.link} className="vote-button">{step.buttonText}</Link>
      </div>
    </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ScrollingSteps;
