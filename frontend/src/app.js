import React, { useState, useEffect } from 'react';
import StockChart from './components/StockChart';
import NewsFeed from './components/NewsFeed';
import './styles.css';

function App() {
  const [symbol, setSymbol] = useState('AAPL');
  const [stockData, setStockData] = useState(null);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use localhost instead of backend service name
        const stockResponse = await fetch(`http://localhost:5000/api/stock/${symbol}`);
        const stockJson = await stockResponse.json();
        setStockData(stockJson);

        const newsResponse = await fetch(`http://localhost:5000/api/news/${symbol}`);
        const newsJson = await newsResponse.json();
        setNews(newsJson);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [symbol]);

  return (
    <div className="container">
      <h1>Stock Dashboard 📈</h1>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        placeholder="Enter Stock Name"
      />
      
      {stockData && <StockChart data={stockData} />}
      <NewsFeed articles={news} />
    </div>
  );
}

export default App;