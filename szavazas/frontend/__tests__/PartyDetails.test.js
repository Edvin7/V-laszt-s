import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PartyDetails from './PartyDetails'; 
import '@testing-library/jest-dom'; 

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      party_id: 1,
      name: 'Party 1',
      photo: 'party1.jpg',
      political_ideology: 'Liberal',
      description: 'This is a description of Party 1.',
      political_campaign_description: 'Campaign description for Party 1.',
    }),
  })
);

describe('PartyDetails Component', () => {

  test('renders party details correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/party/1']}>
        <Routes>
          <Route path="/party/:id" element={<PartyDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText('Party 1'));

    expect(screen.getByText('Party 1')).toBeInTheDocument();
    expect(screen.getByAltText('Party 1')).toHaveAttribute('src', '/uploads/party1.jpg');
    expect(screen.getByText('Politikai irányzat:')).toBeInTheDocument();
    expect(screen.getByText('Liberal')).toBeInTheDocument();
    expect(screen.getByText('This is a description of Party 1.')).toBeInTheDocument();
    expect(screen.getByText('Campaign description for Party 1.')).toBeInTheDocument();
  });

  test('displays loading message while data is being fetched', () => {
    render(
      <MemoryRouter initialEntries={['/party/1']}>
        <Routes>
          <Route path="/party/:id" element={<PartyDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Betöltés...')).toBeInTheDocument();
  });

  test('shows error message when data fetching fails', async () => {
    global.fetch = jest.fn(() => Promise.reject('Failed to fetch party details'));

    render(
      <MemoryRouter initialEntries={['/party/1']}>
        <Routes>
          <Route path="/party/:id" element={<PartyDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText('Hiba történt.'));
    
    expect(screen.getByText('Hiba történt.')).toBeInTheDocument();
  });

});
