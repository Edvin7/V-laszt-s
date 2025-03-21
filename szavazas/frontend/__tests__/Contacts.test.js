import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contacts from '../src/Contacts';
import emailjs from 'emailjs-com';

jest.mock('emailjs-com', () => ({
  sendForm: jest.fn(),
}));

describe('Contacts', () => {
  test('renders contact form', () => {
    render(<Contacts />);

    expect(screen.getByPlaceholderText('Teljes név')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email cím')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Üzenet')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Küldés/i })).toBeInTheDocument();
  });

  test('displays success message when email is sent', async () => {
    emailjs.sendForm.mockResolvedValueOnce({ text: 'OK' });

    render(<Contacts />);

    fireEvent.change(screen.getByPlaceholderText('Teljes név'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email cím'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Üzenet'), { target: { value: 'Ez egy teszt üzenet' } });

    fireEvent.click(screen.getByRole('button', { name: /Küldés/i }));

    await waitFor(() => expect(screen.getByText('Email sikeresen elküldve!')).toBeInTheDocument());
  });

  test('displays error message when email send fails', async () => {
    emailjs.sendForm.mockRejectedValueOnce({ text: 'Error' });

    render(<Contacts />);

    fireEvent.change(screen.getByPlaceholderText('Teljes név'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email cím'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Üzenet'), { target: { value: 'Ez egy teszt üzenet' } });

    fireEvent.click(screen.getByRole('button', { name: /Küldés/i }));

    await waitFor(() => expect(screen.getByText('Hiba történt az email küldése közben. Kérlek próbáld újra!')).toBeInTheDocument());
  });
});
