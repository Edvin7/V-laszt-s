import React, { useEffect, useState } from 'react';
import './ScrollingSteps.css';

const steps = [
  {
    id: 1,
    title: '1. lépés: Regisztráció',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor nisl non ligula interdum, in pharetra magna convallis.',
  },
  {
    id: 2,
    title: '2. lépés: Confirm Your Choice',
    description: 'Donec id ante eu nisi volutpat feugiat. Integer hendrerit augue id leo fringilla, nec laoreet enim lobortis.',
  },
  {
    id: 3,
    title: '3. lépés: Submit Your Vote',
    description: 'Phasellus pretium orci sit amet tortor auctor, et dictum arcu bibendum. Donec auctor tincidunt libero, vel tristique ante blandit.',
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
    <div className="container my-5">
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
                <button className="vote-button">Vote Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ScrollingSteps;
