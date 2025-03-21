import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { InViewProvider } from 'react-intersection-observer';
import CounterArea from '../src/CounterArea'; 
import { server } from '../mocks/server'; 
import { rest } from 'msw';

jest.mock('react-countup', () => ({ end, duration }) => <span>{end}</span>);

server.use(
  rest.get('http://localhost:3000/counters', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, value: 1500, label: 'Felhasználó', icon: 'https://example.com/icon1.png' },
        { id: 2, value: 1200, label: 'Párt', icon: 'https://example.com/icon2.png' },
      ])
    );
  })
);

describe('CounterArea', () => {
  test('should render and display counters after fetching', async () => {
    render(
      <InViewProvider>
        <CounterArea />
      </InViewProvider>
    );

    expect(screen.getByText('Felhasználó')).toBeInTheDocument();
    expect(screen.getByText('Párt')).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText('1500')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('1200')).toBeInTheDocument());
  });

  test('should trigger countup only when the component is in view', async () => {
    render(
      <InViewProvider>
        <CounterArea />
      </InViewProvider>
    );

    expect(screen.queryByText('1500')).not.toBeInTheDocument();

    await waitFor(() => expect(screen.getByText('1500')).toBeInTheDocument());
  });
});
