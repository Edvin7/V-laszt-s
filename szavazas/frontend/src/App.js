import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Navbar from './Navbar';
import Section1 from './Section1';
import Section2 from './Section2';
import Section4 from './Section4'; 
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import Contacts from './Contacts';
import NewsFeed from './NewsFeed';
import ScrollingSteps from './ScrollingSteps';
import HeaderBanner from './HeaderBanner';

import './App.css';
import './Transitions.css'; // Az animációhoz tartozó CSS fájl

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

const Main = () => {
  const location = useLocation();

  return (
    <div className="app-container">
      <Navbar />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Routes location={location}>
            {/* Főoldal */}
            <Route path="/" element={<><HeaderBanner/><ScrollingSteps /><Section2 /><Footer /></>} /> {/* Section4 hozzáadva */}
            
            {/* Kontakt oldal */}
            <Route path="/contact" element={<Contacts />} />

            {/* Hírek oldal */}
            <Route path="/news" element={<NewsFeed />} /> {/*<Section4 /> Hírek oldal hozzáadása */}
            
            {/* Bejelentkezés és regisztráció oldalak */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default App;
