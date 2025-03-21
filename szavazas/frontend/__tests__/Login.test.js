import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login'; 
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom'; 
import MockAdapter from 'axios-mock-adapter';

const mockAxios = new MockAdapter(axios);

const setIsLoggedIn = jest.fn();
const setIsAdmin = jest.fn();

describe('Login Component', () => {
  beforeEach(() => {
    mockAxios.reset(); 
  });

  test('renders login form', () => {
    render(
      <Router>
        <Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
      </Router>
    );

    expect(screen.getByPlaceholderText('Email cím')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Jelszó')).toBeInTheDocument();

    expect(screen.getByValue('Bejelentkezés')).toBeInTheDocument();
  });

  test('handles successful login', async () => {
    const mockUser = { id: 1, email: 'test@user.com', isAdmin: false };
    
    mockAxios.onPost('http://localhost:5000/login').reply(200, {
      user: mockUser,
    });

    render(
      <Router>
        <Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Email cím'), {
      target: { value: 'test@user.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Jelszó'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByValue('Bejelentkezés'));

    await waitFor(() => expect(setIsLoggedIn).toHaveBeenCalledWith(true));
    expect(setIsAdmin).toHaveBeenCalledWith(false);

    expect(window.location.href).toBe('http://localhost/');
  });

  test('handles failed login', async () => {
    mockAxios.onPost('http://localhost:5000/login').reply(400, {
      message: 'Invalid credentials',
    });

    render(
      <Router>
        <Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Email cím'), {
      target: { value: 'wrong@user.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Jelszó'), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByValue('Bejelentkezés'));

    await waitFor(() => expect(screen.getByText('Ismeretlen hiba történt')).toBeInTheDocument());
  });

  test('displays error message when form is incomplete', () => {
    render(
      <Router>
        <Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
      </Router>
    );

    fireEvent.click(screen.getByValue('Bejelentkezés'));

    expect(mockAxios.history.post.length).toBe(0);

    expect(screen.getByPlaceholderText('Email cím')).toHaveFocus();
  });

  test('redirects to register page', () => {
    render(
      <Router>
        <Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
      </Router>
    );

    expect(screen.getByText('Nincs még fiókom')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Nincs még fiókom'));

    expect(window.location.href).toContain('/register');
  });
});
