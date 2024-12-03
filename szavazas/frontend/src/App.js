import React, { useState, useEffect } from 'react';
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
import Stats from './Stats';
import Account from './Account';
import Party from './Party';

import './App.css';
import './Transitions.css';

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Állapot a bejelentkezéshez

  // Ellenőrizzük, hogy a felhasználó be van-e jelentkezve a localStorage-ban
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user && user !== '0') {
      setIsLoggedIn(true); // Ha van bejelentkezett felhasználó, állítsuk be
    }
  }, []);

  const location = useLocation();

  return (
    <div className="app-container">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> {/* Átadjuk az állapotot a Navbar-nak */}
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Routes location={location}>
            <Route path="/" element={<><HeaderBanner/><ScrollingSteps /><CounterArea/><Footer /></>} />
            <Route path="/contact" element={<Contacts />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/news" element={<NewsFeed />} />
            <Route path="/voting" element={<VotingPage />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> {/* Átadjuk a setIsLoggedIn-t */}
            <Route path="/register" element={<Register />} />
            <Route path="/parties" element={<Party />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default App;
