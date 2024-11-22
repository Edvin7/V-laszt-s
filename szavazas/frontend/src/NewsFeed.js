import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import './NewsFeed.css';  // CSS a hírek oldalhoz

function NewsFeed() {
  const [articles, setArticles] = useState([]);

  const fetchArticles = () => {
    fetch('https://telex.hu/rss/politika')  // Politikai RSS feed URL
      .then(response => response.text())  // Válasz szöveges formátumban
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');
        const items = xmlDoc.getElementsByTagName('item');  // Az RSS elemek lekérése
        
        const articlesArray = Array.from(items).map(item => ({
          title: item.getElementsByTagName('title')[0].textContent,
          link: item.getElementsByTagName('link')[0].textContent,
          image: item.getElementsByTagName('enclosure')[0]?.getAttribute('url'), // Kép URL
          description: item.getElementsByTagName('description')[0].textContent,
        }));

        setArticles(articlesArray);  // Beállítjuk a híreket az állapotba
      })
      .catch(error => console.error('Hiba az RSS feed betöltésekor:', error));  // Hibakezelés
  };

  useEffect(() => {
    fetchArticles();  // Első betöltéskor lekérjük az RSS feedet
    const intervalId = setInterval(fetchArticles, 10 * 60 * 1000);  // 10 percenként frissítjük az adatokat

    return () => clearInterval(intervalId);  // Tisztítjuk az interval-t, ha a komponens eltűnik
  }, []);

  return (
    <div className="news-feed">
      {articles.length > 0 ? (
        <ul>
          {/* Kiemelt blokk a legfrissebb hírhez */}
          {articles[0] && (
            <li className="featured-article">
              <a href={articles[0].link} target="_blank" rel="noopener noreferrer">
                <img src={articles[0].image || 'https://kecsup.hu/wp-content/uploads/2020/10/telex-logo.jpg'} alt={articles[0].title} />
                <h3>{articles[0].title}</h3>
                <p>{articles[0].description}</p>
              </a>
            </li>
          )}
          {/* További hírek megjelenítése */}
          {articles.length > 1 ? (
            articles.slice(1).map((article, index) => (
              <NewsItem key={index} article={article} />
            ))
          ) : (
            <li>Nincs több hír.</li> // 
          )}
        </ul>
      ) : (
        <p>Hírek betöltése...</p> 
      )}
    </div>
  );
}

export default NewsFeed;