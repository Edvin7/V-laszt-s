import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminPanel from '../src/AdminPanel';
import axios from 'axios';

jest.mock('axios');

global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

describe('AdminPanel', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [{ name: 'User 1', email: 'user1@example.com', personal_id: '123' }],
    });
    axios.post.mockResolvedValue({ data: {} });
    axios.delete.mockResolvedValue({ data: {} });
  });

  test('renders users table correctly', async () => {
    render(<AdminPanel />);

    await waitFor(() => expect(screen.getByText('Felhasználók')).toBeInTheDocument());

    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('user1@example.com')).toBeInTheDocument();
  });

  test('can delete a user', async () => {
    render(<AdminPanel />);

    await waitFor(() => expect(screen.getByText('Felhasználók')).toBeInTheDocument());

    const deleteButton = screen.getByText('Törlés');
    fireEvent.click(deleteButton);

    await waitFor(() => expect(axios.delete).toHaveBeenCalledTimes(1));
  });

  test('can add a new party', async () => {
    render(<AdminPanel />);

    const partyNameInput = screen.getByPlaceholderText('Párt neve');
    fireEvent.change(partyNameInput, { target: { value: 'New Party' } });

    const descriptionInput = screen.getByPlaceholderText('Leírás');
    fireEvent.change(descriptionInput, { target: { value: 'A new party description' } });

    const politicalIdeologyInput = screen.getByPlaceholderText('Politikai ideológia');
    fireEvent.change(politicalIdeologyInput, { target: { value: 'Liberal' } });

    const campaignDescriptionInput = screen.getByPlaceholderText('Politikai kampány leírása');
    fireEvent.change(campaignDescriptionInput, { target: { value: 'Campaign description' } });

    const yearDescriptionInput = screen.getByPlaceholderText('Politikai év leírása');
    fireEvent.change(yearDescriptionInput, { target: { value: 'Year description' } });

    const addButton = screen.getByText('Hozzáadás');
    fireEvent.click(addButton);

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
  });

  test('can update countdown date', async () => {
    render(<AdminPanel />);

    const countdownInput = screen.getByLabelText('Időzítő beállítás');
    fireEvent.change(countdownInput, { target: { value: '2023-12-31T12:00' } });

    const startButton = screen.getByText('Indítás');
    fireEvent.click(startButton);

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
  });

  test('can reset countdown', async () => {
    render(<AdminPanel />);

    const stopButton = screen.getByText('Leállítás');
    fireEvent.click(stopButton);

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
  });

  test('can reset all votes and countdown', async () => {
    render(<AdminPanel />);

    const resetButton = screen.getByText('Mind törlés + időzítő nullázás');
    fireEvent.click(resetButton);

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
  });
});
