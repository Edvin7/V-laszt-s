import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Navbar from './Navbar'; 
import { BrowserRouter as Router } from 'react-router-dom'; 
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = new MockAdapter(axios);

describe('Navbar Component', () => {
  const setIsLoggedIn = jest.fn();
  const setIsAdmin = jest.fn();

  beforeEach(() => {
    mockAxios.reset();
  });

  test('renders navbar with links based on login state', () => {
    const isLoggedIn = true;
    const isAdmin = false;

    render(
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </Router>
    );

    expect(screen.getByText('Pártok')).toBeInTheDocument();
    expect(screen.getByText('Kapcsolat')).toBeInTheDocument();
    expect(screen.getByText('Hírek')).toBeInTheDocument();
    expect(screen.getByText('Profil')).toBeInTheDocument();
    expect(screen.getByText('Kijelentkezés')).toBeInTheDocument();

    expect(screen.queryByText('Admin')).not.toBeInTheDocument();
  });

  test('renders navbar for logged-out user', () => {
    const isLoggedIn = false;

    render(
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </Router>
    );

    expect(screen.getByText('Pártok')).toBeInTheDocument();
    expect(screen.getByText('Kapcsolat')).toBeInTheDocument();
    expect(screen.getByText('Hírek')).toBeInTheDocument();
    expect(screen.getByText('Bejelentkezés')).toBeInTheDocument();

    expect(screen.queryByText('Kijelentkezés')).not.toBeInTheDocument();
  });

  test('shows admin link when user is admin', () => {
    const isLoggedIn = true;
    const isAdmin = true;

    render(
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </Router>
    );

    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  test('toggles menu on mobile view', () => {
    const isLoggedIn = false;

    render(
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </Router>
    );

    expect(screen.queryByText('Pártok')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Pártok')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));

    expect(screen.queryByText('Pártok')).not.toBeInTheDocument();
  });

  test('shows voting link if voting is active', async () => {
    mockAxios.onGet('/api/is-voting-active').reply(200, { isActive: true });

    render(
      <Router>
        <Navbar isLoggedIn={true} setIsLoggedIn={setIsLoggedIn} />
      </Router>
    );

    await waitFor(() => expect(screen.getByText('Szavazz')).toBeInTheDocument());
  });

  test('does not show voting link if voting is not active', async () => {
    mockAxios.onGet('/api/is-voting-active').reply(200, { isActive: false });

    render(
      <Router>
        <Navbar isLoggedIn={true} setIsLoggedIn={setIsLoggedIn} />
      </Router>
    );

    await waitFor(() => expect(screen.queryByText('Szavazz')).not.toBeInTheDocument());
  });

  test('handles logout correctly', () => {
    const isLoggedIn = true;
    const setIsLoggedIn = jest.fn();
    const setIsAdmin = jest.fn();

    render(
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </Router>
    );

    fireEvent.click(screen.getByText('Kijelentkezés'));

    expect(setIsLoggedIn).toHaveBeenCalledWith(false);
  });
});
