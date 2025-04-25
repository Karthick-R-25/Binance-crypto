import React, { useEffect, useState } from 'react';
import CryptoRow from './cryptodata';

const symbols = ['btcusdt', 'ethusdt', 'bnbusdt', 'xrpusdt', 'solusdt', 'adausdt'];

const CryptoTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${symbols.map(s => `${s}@ticker`).join('/')}`);

    ws.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      const ticker = parsed.data;
      console.log(ticker)
      const updatedItem = {
        symbol: ticker.s,
        name: ticker.s.slice(0, -4).toUpperCase(),
        short: ticker.s.slice(0, 3).toUpperCase(),
        price: parseFloat(ticker.c),
        change1h: (Math.random() * 2 - 1).toFixed(2), // mock
        change24h: parseFloat(ticker.P),
        change7d: (Math.random() * 10 - 5).toFixed(2), // mock
        marketCap: parseFloat(ticker.c) * parseFloat(ticker.v), // mock
        volume24h: parseFloat(ticker.q),
        volumeToken: parseFloat(ticker.v),
        supply: (Math.random() * 100000000).toFixed(0), // mock
        supplyPercent: Math.floor(Math.random() * 100),
        chart: '/chart-placeholder.png' // placeholder
      };

      setData(prev => {
        const index = prev.findIndex(item => item.symbol === updatedItem.symbol);
        if (index !== -1) {
          const updated = [...prev];
          updated[index] = updatedItem;
          return updated.sort((a, b) => b.price - a.price);
        } else {
          return [...prev, updatedItem].sort((a, b) => b.price - a.price);
        }
      });
    };

    return () => ws.close();
  }, []);

  return (
    <table className="w-full text-sm text-left">
      <thead className="bg-gray-100">
        <tr>
          <th></th><th>#</th><th>Name</th><th>Price</th>
          <th>1h %</th><th>24h %</th><th>7d %</th>
          <th>Market Cap</th><th>Volume (24h)</th><th>Circulating Supply</th><th>Last 7 Days</th>
        </tr>
      </thead>
      <tbody>
        {data.map((asset, index) => (
          <CryptoRow key={asset.symbol} asset={asset} index={index + 1} />
        ))}
      </tbody>
    </table>
  );
};

export default CryptoTable;
