from flask import Flask, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

ALPHA_VANTAGE_KEY = os.getenv('ALPHA_VANTAGE_KEY')
NEWSAPI_KEY = os.getenv('NEWSAPI_KEY')

@app.route('/api/stock/<symbol>', methods=['GET'])
def get_stock(symbol):
    try:
        url = f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={symbol}&apikey={ALPHA_VANTAGE_KEY}'
        response = requests.get(url)
        return jsonify(response.json())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/news/<symbol>', methods=['GET'])
def get_news(symbol):
    try:
        url = f'https://newsapi.org/v2/everything?q={symbol}&apiKey={NEWSAPI_KEY}&pageSize=5'
        response = requests.get(url)
        return jsonify(response.json()['articles'])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)