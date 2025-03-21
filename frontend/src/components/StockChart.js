import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

export default function StockChart({ data }) {
  if (!data['Time Series (Daily)']) return <div>No data available</div>;

  const dailyData = data['Time Series (Daily)'];
  const dates = Object.keys(dailyData).reverse().slice(0, 30);
  const prices = dates.map(date => parseFloat(dailyData[date]['4. close']));

  return (
    <div className="chart-container">
      <Line 
        data={{
          labels: dates,
          datasets: [{
            label: 'Closing Price',
            data: prices,
            borderColor: '#2962ff',
            tension: 0.1
          }]
        }}
      />
    </div>
  );
}