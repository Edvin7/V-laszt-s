import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Partyies from './Partyies'; 
import '@testing-library/jest-dom';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      {
        party_id: 1,
        name: 'Party 1',
        photo: 'party1.jpg',
      },
      {
        party_id: 2,
        name: 'Party 2',
        photo: 'party2.jpg',
      },
    ]),
  })
);

describe('Partyies Component', () => {

  test('renders the title', () => {
    render(
      <MemoryRouter>
        <Partyies />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Politikai Pártok')).toBeInTheDocument();
  });

  test('renders party cards with correct details', async () => {
    render(
      <MemoryRouter>
        <Partyies />
      </MemoryRouter>
    );
    
    await waitFor(() => screen.getByText('Party 1'));

    expect(screen.getByText('Party 1')).toBeInTheDocument();
    expect(screen.getByAltText('Party 1')).toHaveAttribute('src', 'http://localhost:5000/uploads/party1.jpg');
    
    expect(screen.getByText('Party 2')).toBeInTheDocument();
    expect(screen.getByAltText('Party 2')).toHaveAttribute('src', 'http://localhost:5000/uploads/party2.jpg');
  });

  test('shows error message when data fetching fails', async () => {
    global.fetch = jest.fn(() => Promise.reject('Failed to load data'));

    render(
      <MemoryRouter>
        <Partyies />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText('Failed to load party data'));

    expect(screen.getByText('Failed to load party data')).toBeInTheDocument();
  });

  test('clicking "view more" button navigates to the party page', async () => {
    const mockNavigate = jest.fn();
    
    render(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Partyies />
      </MemoryRouter>
    );
    
    await waitFor(() => screen.getByText('Party 1'));

    const button = screen.getByText('Több információ');
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/party/1');
  });
});
