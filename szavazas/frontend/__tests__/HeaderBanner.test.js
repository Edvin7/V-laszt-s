import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HeaderBanner from './HeaderBanner'; 
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ countdownDate: new Date('2025-03-30T00:00:00').toISOString() }),
  })
);

describe('HeaderBanner', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders the header banner with a countdown timer', async () => {
    render(<HeaderBanner />);

    expect(screen.getByText('NAP')).toBeInTheDocument();
    expect(screen.getByText('ÓRA')).toBeInTheDocument();
    expect(screen.getByText('PERC')).toBeInTheDocument();
    expect(screen.getByText('MÁSODPERC')).toBeInTheDocument();

    const video = screen.getByRole('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('autoplay');
    expect(video).toHaveAttribute('loop');
    expect(video).toHaveAttribute('muted');
  });

  test('fetches the countdown date from the server', async () => {
    render(<HeaderBanner />);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(fetch).toHaveBeenCalledWith('/api/countdown-date'));
  });

  test('correctly updates the countdown date when a new date is set', async () => {
    render(<HeaderBanner />);

    const newDate = '2025-06-15T00:00:00';
    const dateInput = screen.getByPlaceholderText('Enter new date');
    fireEvent.change(dateInput, { target: { value: newDate } });

    const submitButton = screen.getByText('Submit Date');
    fireEvent.click(submitButton);

    await waitFor(() => expect(fetch).toHaveBeenCalledWith(
      'http://localhost:5000/api/date-plus',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ countdownDate: newDate }),
      })
    ));
  });

  test('correctly updates the countdown time', async () => {
    render(<HeaderBanner />);

    const targetDate = new Date(new Date().getTime() + 5000);
    const countdownDate = targetDate.toISOString();

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ countdownDate }),
    });

    await waitFor(() => expect(screen.getByText('NAP')).toBeInTheDocument());
  });
});
