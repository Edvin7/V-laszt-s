import React from 'react';
import Navbar from './Navbar';
import Section1 from './Section1';
import Section2 from './Section2';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import './App.css';
import './Section1.css';
import './Section2.css';
import './Footer.css';
import './Login.css';
import './Register.css';




const App = () => {
  return (
    <div>
      <Navbar />
      <Section1 />
      <Section2 />
      <Footer />
      {/* 
      {/<Login/>
      <Register/>*/}
    </div>
  );
};

export default App;
