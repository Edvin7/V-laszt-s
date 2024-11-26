import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Navbar from './Navbar';
import VotingPage from './VotingPage';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import Contacts from './Contacts';
import NewsFeed from './NewsFeed';
import ScrollingSteps from './ScrollingSteps';
import HeaderBanner from './HeaderBanner';
import CounterArea from './CounterArea';
import TermsOfService from './Terms'; 
import PrivacyPolicy from './PrivacyPolicy';
import Stats from './Stats'; // Importáltuk a Stats komponenst

import axios from 'axios'; // Importáljuk az axios-t

import './App.css';
import './Transitions.css'; // Az animációhoz tartozó CSS fájl

// Az axios konfigurálása az alkalmazás kezdetén
axios.defaults.baseURL = 'http://localhost:5000'; // Backend URL
axios.defaults.withCredentials = true;  // Engedélyezi, hogy a cookie-kat automatikusan küldjük minden kéréshez

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
            <Route path="/" element={<><HeaderBanner/><ScrollingSteps /><CounterArea/><Footer /></>} />
            <Route path="/contact" element={<Contacts />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/news" element={<NewsFeed />} />
            <Route path="/voting" element={<VotingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/stats" element={<Stats />} /> {/* Új route a Stats komponenshez */}
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default App;
