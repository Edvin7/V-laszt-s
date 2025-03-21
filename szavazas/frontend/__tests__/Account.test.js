import { render, screen, waitFor } from '@testing-library/react';
import Account from '../src/Account';

describe('Account component', () => {
  test('shows loading message when no user is logged in', async () => {
    global.localStorage.removeItem('user');

    render(<Account />);

    await waitFor(() => screen.getByText('Loading...'));
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders user info when user is logged in', async () => {
    const mockUser = { name: 'John Doe', email: 'john.doe@example.com' };
    global.localStorage.setItem('user', JSON.stringify(mockUser));

    render(<Account />);

    await waitFor(() => screen.getByText(mockUser.name));
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });
});
