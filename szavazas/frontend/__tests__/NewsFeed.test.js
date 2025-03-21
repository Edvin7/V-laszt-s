import { render, screen, waitFor } from '@testing-library/react';
import NewsFeed from './NewsFeed'; 

global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve(`
      <rss>
        <channel>
          <item>
            <title>Test Article 1</title>
            <link>https://example.com/article1</link>
            <enclosure url="https://example.com/image1.jpg" />
            <description>Test description for article 1</description>
          </item>
          <item>
            <title>Test Article 2</title>
            <link>https://example.com/article2</link>
            <enclosure url="https://example.com/image2.jpg" />
            <description>Test description for article 2</description>
          </item>
        </channel>
      </rss>
    `),
  })
);

describe('NewsFeed Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetches and displays articles', async () => {
    render(<NewsFeed />);

    expect(screen.getByText('Hírek betöltése...')).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText('Test Article 1')).toBeInTheDocument());

    expect(screen.getByText('Test Article 1')).toBeInTheDocument();
    expect(screen.getByText('Test description for article 1')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Test Article 1/i })).toHaveAttribute('href', 'https://example.com/article1');

    expect(screen.getByText('Test Article 2')).toBeInTheDocument();
  });

  test('displays "Nincs több hír" when there are no articles', async () => {
    global.fetch.mockResolvedValueOnce({
      text: () => Promise.resolve('<rss><channel></channel></rss>'),
    });

    render(<NewsFeed />);

    await waitFor(() => expect(screen.getByText('Nincs több hír.')).toBeInTheDocument());
  });

  test('handles RSS fetch error gracefully', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network Error'));

    render(<NewsFeed />);

    await waitFor(() => expect(screen.getByText('Hírek betöltése...')).toBeInTheDocument());

    expect(screen.queryByText('Test Article 1')).not.toBeInTheDocument();
  });

  test('displays the featured article with an image', async () => {
    render(<NewsFeed />);

    await waitFor(() => expect(screen.getByText('Test Article 1')).toBeInTheDocument());

    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/image1.jpg');
  });

  test('displays fallback image when no image is available for the article', async () => {
    global.fetch.mockResolvedValueOnce({
      text: () => Promise.resolve(`
        <rss>
          <channel>
            <item>
              <title>Test Article 3</title>
              <link>https://example.com/article3</link>
              <description>Test description for article 3</description>
            </item>
          </channel>
        </rss>
      `),
    });

    render(<NewsFeed />);

    await waitFor(() => expect(screen.getByText('Test Article 3')).toBeInTheDocument());

    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://kecsup.hu/wp-content/uploads/2020/10/telex-logo.jpg');
  });
});
