import React, { useEffect, useState } from 'react';
import './ScrollingSteps.css';
import { Link } from 'react-router-dom';

const steps = [
  {
    id: 1,
    title: '1. lépés: Regisztráció',
    description: 'A szavazáshoz először regisztrálnia kell a platformon...',
    buttonText: 'Regisztráljon most',
    link: '/register',
  },
  {
    id: 2,
    title: '2. lépés: Bejelentkezés',
    description: 'A regisztráció befejezése után jelentkezzen be...',
    buttonText: 'Jelentkezzen be',
    link: '/login',
  },
  {
    id: 3,
    title: '3. lépés: Szavazás leadása',
    description: 'Miután bejelentkezett, kiválaszthatja a szavazási opciókat...',
    buttonText: 'Szavazzon most',
    link: '/voting',
  },
];

const ScrollingSteps = () => {
  const [visibleStep, setVisibleStep] = useState(0);
  const [sectionInView, setSectionInView] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Bejelentkezett állapot
  const [hasVoted, setHasVoted] = useState(false); // Szavazott állapot

  useEffect(() => {
    // Bejelentkezett felhasználó ellenőrzése
    const checkLoginStatus = () => {
      const loggedInUser = localStorage.getItem('user'); // Ezt beállíthatjuk login során

      if (loggedInUser) {
        setIsLoggedIn(true);
        const userId = JSON.parse(loggedInUser).id; // Felhasználó ID lekérése

        // Szavazatok lekérése a back-endről
        fetch(`/api/votes?user_id=${userId}`)
          .then(response => response.json())
          .then(data => {
            if (data.length > 0) {
              setHasVoted(true); // Ha van szavazat, akkor beállítjuk a hasVoted-ot
            } else {
              setHasVoted(false); // Ha nincs szavazat, akkor false
            }
          })
          .catch(error => console.error('Szavazatok lekérése hiba:', error));
      } else {
        setIsLoggedIn(false); // Ha nincs bejelentkezve
      }
    };

    checkLoginStatus(); // Ellenőrizzük, hogy be van-e jelentkezve a felhasználó
  }, []);

  useEffect(() => {
    const sectionObserverOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setSectionInView(true);
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
          <div className="line-above"></div>
          <h2 className="font-weight-bold display-4">
            Hogyan tud <span style={{ color: '#033473' }}>szavazni?</span>
          </h2>
        </div>
        <div className="steps-container">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`scrolling-step ${visibleStep >= step.id ? 'show' : ''}`}
              data-step={step.id}
            >
              <div className="step-header">
                <div className="circle">{step.id}</div>
              </div>
              <div className="step-body">
                <h4>{step.title}</h4>
                <p>{step.description}</p>
                {step.id === 1 || step.id === 2 ? (
                  // Regisztráció és bejelentkezés
                  isLoggedIn ? (
                    <span style={{ color: 'green', fontSize: '24px' }}>✔</span>
                  ) : (
                    <Link to={step.link} className="vote-button">
                      {step.buttonText}
                    </Link>
                  )
                ) : (
                  // Szavazás
                  isLoggedIn && hasVoted ? (
                    <span style={{ color: 'green', fontSize: '24px' }}>✔</span>
                  ) : (
                    isLoggedIn && (
                      <Link to={step.link} className="vote-button">
                        {step.buttonText}
                      </Link>
                    )
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ScrollingSteps;
