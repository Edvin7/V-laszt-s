import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import axios from 'axios'; 
import './App.css';
import './Transitions.css';
import Party from './Party';
import AdminPanel from './AdminPanel';
import PartyDetails from './PartyDetails';
import BackButton from './BackButton';

axios.defaults.baseURL = 'http://localhost:5000'; 
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setIsLoggedIn(true);
      setIsAdmin(user.isAdmin);
    }
  }, []);

  const location = useLocation();

  return (
    <div className="app-container">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <BackButton />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Routes location={location}>
            <Route path="/" element={<><HeaderBanner /><ScrollingSteps /><CounterArea /><Footer isLoggedIn={isLoggedIn} /></>} />
            <Route path="/contact" element={<Contacts />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/news" element={<NewsFeed />} />
            <Route path="/voting" element={isLoggedIn ? <VotingPage /> : <Navigate to="/" />} />
            <Route path="/stats" element={isLoggedIn ? <Stats /> : <Navigate to="/" />} />
            <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />}/>
            <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register />}/>
            <Route path="/account" element={isLoggedIn ? <Account /> : <Navigate to="/login" />} />
            <Route path="/parties" element={<Party />} />
            <Route path="/party/:id" element={<PartyDetails />} />
            <Route path="/admin" element={isAdmin ? <AdminPanel /> : <Navigate to="/" />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default App;
