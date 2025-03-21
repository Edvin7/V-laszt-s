import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer'; 
import { BrowserRouter as Router } from 'react-router-dom';

describe('Footer', () => {
  test('should render all footer links when logged out', () => {
    render(
      <Router>
        <Footer isLoggedIn={false} />
      </Router>
    );

    expect(screen.getByText('Kapcsolat')).toBeInTheDocument();
    expect(screen.getByText('Szavazok')).toBeInTheDocument();
    expect(screen.getByText('Adatvédelmi szabályzat')).toBeInTheDocument();
    expect(screen.getByText('Általános Szerződési Feltételek')).toBeInTheDocument();
    expect(screen.getByText('Bejelentkezés')).toBeInTheDocument();
  });

  test('should not render the login link when logged in', () => {
    render(
      <Router>
        <Footer isLoggedIn={true} />
      </Router>
    );

    expect(screen.queryByText('Bejelentkezés')).not.toBeInTheDocument();
  });

  test('should display the correct footer copyright text', () => {
    render(
      <Router>
        <Footer isLoggedIn={false} />
      </Router>
    );

    expect(screen.getByText('Copyright © 2024 Szavazz.hu - Minden jog fenntartva')).toBeInTheDocument();
  });
});
