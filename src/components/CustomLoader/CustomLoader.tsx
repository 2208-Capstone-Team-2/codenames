import React, { useEffect, useState } from 'react';
import { GridLoader, SquareLoader, BounceLoader } from 'react-spinners';
import './customLoader.css';
const CustomLoader = () => {
  const [color, setColor] = useState('#DCDCDC');
  useEffect(() => {
    setInterval(() => {
      if (color === '#DCDCDC') {
        setColor('#e2c78d');
      } else if (color === '#e2c78d') {
        setColor('#DCDCDC');
      }
    }, 1000);
  });
  return (
    <div className="loader">
      <SquareLoader speedMultiplier={1} size={80} color={color} />
    </div>
  );
};

export default CustomLoader;
