import React, { useState } from 'react';


import yellowStar from '../assets/yellow-star.png';
import star from '../assets/star.png';
import increasedArrow from '../assets/increasedarrow.png';
import decreasedArrow from '../assets/decreased-arrow.png';

const PercentCell = ({ value }) => {
  const isPositive = value > 0;
  const isNegative = value <= 0;

  return (
    <td className={`decreaser ${isPositive ? 'text-green' : isNegative ? 'text-red' : 'text-gray'}`}>
      {isPositive && <img className="increaser" src={increasedArrow} alt="up" />}
      {isNegative && <img className="increaser" src={decreasedArrow} alt="down" />}
      {value}%
    </td>
  );
};

const Bar = ({ percent }) => (
  <div className="bar">
    <div className="fill" style={{ width: `${percent}%` }} />
  </div>
);

const SupplyCell = ({ value, percent, token }) => (
  <div>
    <div>{value} {token}</div>
    <Bar percent={percent} />
  </div>
);

const CryptoRow = ({ asset, index }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const toggleFavourite = () => {
    setIsFavourite(prev => !prev);
  };

  return (
    <tr className="border-b" onClick={toggleFavourite}>
      <td>
        <img
          src={isFavourite ? yellowStar : star}
          className='star'
          alt='icon not found'
        />
      </td>
      <td>{index}</td>
      <td>
        <div className='symbols'>
        
          <p>{asset.short}</p>
        </div>
      </td>
      <td>${asset.price.toLocaleString()}</td>
      <PercentCell value={asset.change1h} />
      <PercentCell value={asset.change24h} />
      <PercentCell value={asset.change7d} />
      <td>${asset.marketCap.toLocaleString()}</td>
      <td>
        <div className='volume-10'>
          <div className='volumep'>${asset.volume24h.toLocaleString()}</div>
          <div className='volumetoken'>{asset.volumeToken.toLocaleString()}{asset.short}</div>
        </div>
      </td>
      <td>
        <div className="volume-1">
          <div className='supply3'>{asset.supply} {asset.short}</div>
          <SupplyCell percent={asset.supplyPercent} />
        </div>
      </td>
      <td>
        <img src={asset.chart} alt="chart" className="chart" />
      </td>
    </tr>
  );
};

export default CryptoRow;
