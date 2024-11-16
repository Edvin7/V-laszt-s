import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Navbar from './Navbar';
import Section1 from './Section1';
import Section2 from './Section2';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';

import './App.css';
import './Transitions.css'; // Az animációhoz tartozó CSS fájl

const App = () => {
  return (
    // A <Router> környezetet itt biztosítjuk az egész alkalmazás számára
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
            <Route path="/" element={<><Section1 /><Section2 /><Footer /></>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default App;
