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
import axios from 'axios'; 
import './App.css';
import './Transitions.css';
import Party from './Party';
import AdminPanel from './AdminPanel';
import PartyDetails from './PartyDetails';
import BackButton from './BackButton';
import ProtectedRoute from './ProtectedRoute';  // Importáljuk a ProtectedRoute-ot

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
  const [isAdmin, setIsAdmin] = useState(false);  // Admin státusz

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setIsLoggedIn(true);
      setIsAdmin(user.isAdmin);  // Frissítjük az admin státuszt, ha már be van jelentkezve
    }
  }, []);  // A `useEffect` egyszer fut le az oldal betöltésekor

  const location = useLocation();

  return (
    <div className="app-container">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <BackButton />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Routes location={location}>
            <Route path="/" element={<><HeaderBanner/><ScrollingSteps /><CounterArea/><Footer /></>} />
            <Route path="/contact" element={<Contacts />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/news" element={<NewsFeed />} />
            <Route path="/voting" element={<VotingPage />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/account" element={<Account />} />
            <Route path="/parties" element={<Party />} />
            <Route path="/party/:id" element={<PartyDetails />} />
            <Route 
              path="/admin" 
              element={<ProtectedRoute element={<AdminPanel />} isAdmin={isAdmin} />} 
            />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default App;
