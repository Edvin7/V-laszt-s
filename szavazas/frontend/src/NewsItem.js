import React from 'react';
import './NewsItem.css';  // CSS a hír kártya megjelenéséhez

function NewsItem({ article }) {
  return (
    <li className="news-item">
      <a href={article.link} target="_blank" rel="noopener noreferrer">
        <img src={article.image || 'https://via.placeholder.com/150'} alt={article.title} />
        <h3>{article.title}</h3>
        <p>{article.description}</p>
      </a>
    </li>
  );
}

export default NewsItem;
