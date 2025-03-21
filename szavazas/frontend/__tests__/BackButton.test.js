import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BackButton from '../src/BackButton'; 
jest.spyOn(window.history, 'back').mockImplementation(() => {});

describe('BackButton', () => {
  test('renders back button correctly', () => {
    render(<BackButton />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('calls window.history.back when the button is clicked', () => {
    render(<BackButton />);

    fireEvent.click(screen.getByRole('button'));

    expect(window.history.back).toHaveBeenCalledTimes(1);
  });
});
