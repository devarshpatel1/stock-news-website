export default function NewsFeed({ articles }) {
  // Validate articles prop
  if (!Array.isArray(articles)) {
    return (
      <div className="news-container">
        <h2>Latest News</h2>
        <div className="error-message">
          No news available at the moment
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="news-container">
        <h2>Latest News</h2>
        <div className="loading-message">
          Loading news...
        </div>
      </div>
    );
  }

  return (
    <div className="news-container">
      <h2>Latest News</h2>
      {articles.map((article, index) => (
        <div key={index} className="news-card">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            <h3>{article.title || 'No title available'}</h3>
          </a>
          <p>{article.description || 'No description available'}</p>
          <div className="news-footer">
            <span>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'Unknown date'}</span>
            <span>{article.source?.name || 'Unknown source'}</span>
          </div>
        </div>
      ))}
    </div>
  );
}