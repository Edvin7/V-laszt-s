import { render, screen } from '@testing-library/react';
import NewsItem from './NewsItem'; 

describe('NewsItem Component', () => {
  const article = {
    title: 'Test Article',
    link: 'https://example.com/test-article',
    image: 'https://example.com/image.jpg',
    description: 'This is a description for the test article.',
  };

  test('renders article title and description correctly', () => {
    render(<NewsItem article={article} />);

    expect(screen.getByText('Test Article')).toBeInTheDocument();
    expect(screen.getByText('This is a description for the test article.')).toBeInTheDocument();
  });

  test('renders the article image correctly when image URL is provided', () => {
    render(<NewsItem article={article} />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(img).toHaveAttribute('alt', 'Test Article');
  });

  test('renders the fallback image when no image URL is provided', () => {
    const articleWithoutImage = { ...article, image: null };

    render(<NewsItem article={articleWithoutImage} />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://via.placeholder.com/150');
  });

  test('renders the link correctly', () => {
    render(<NewsItem article={article} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com/test-article');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
