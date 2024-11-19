import React, { useEffect, useState } from 'react';
import './Section4.css'; // Stílus a hírek szekcióhoz

function Section4() {
  const [articles, setArticles] = useState([]);

  const fetchArticles = () => {
    fetch('https://telex.hu/rss/politika') // Politikai RSS feed URL
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');
        const items = xmlDoc.getElementsByTagName('item');

        const articlesArray = Array.from(items).map(item => ({
          title: item.getElementsByTagName('title')[0].textContent,
          link: item.getElementsByTagName('link')[0].textContent,
          image: item.getElementsByTagName('enclosure')[0]?.getAttribute('url'), // Kép URL
          description: item.getElementsByTagName('description')[0].textContent,
        }));

        setArticles(articlesArray);
      })
      .catch(error => console.error('Hiba az RSS feed betöltésekor:', error));
  };

  useEffect(() => {
    fetchArticles();
    const intervalId = setInterval(fetchArticles, 10 * 60 * 1000); // 10 percenként frissít
    return () => clearInterval(intervalId);
  }, []);

  // Nagy hír kiválasztása (első kép nélküli kizárása)
  const getFeaturedArticle = () => {
    return articles.find(article => article.image) || articles[0];
  };

  const featuredArticle = getFeaturedArticle();
  const smallArticles = articles.filter(article => article !== featuredArticle).slice(0, 3);

  return (
    <div className="section4">
      {featuredArticle ? (
        <div className="featured-article">
          <a href={featuredArticle.link} target="_blank" rel="noopener noreferrer">
            <img
              src={featuredArticle.image || 'https://via.placeholder.com/350x200'}
              alt={featuredArticle.title}
            />
            <h2>{featuredArticle.title}</h2>
            <p>{featuredArticle.description}</p>
          </a>
        </div>
      ) : (
        <p>Nincs elérhető hír.</p>
      )}

      <div className="small-articles">
        {smallArticles.map((article, index) => (
          <div className="small-article" key={index}>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              <img
                src={article.image || 'https://kecsup.hu/wp-content/uploads/2020/10/telex-logo.jpg'}
                alt={article.title}
              />
              <h3>{article.title}</h3>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Section4;
