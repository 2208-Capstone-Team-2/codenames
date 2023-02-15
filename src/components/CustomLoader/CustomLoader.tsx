import React, { useEffect, useState } from 'react';
import { GridLoader, SquareLoader, BounceLoader } from 'react-spinners';
import './customLoader.css';
const CustomLoader = () => {
  const [color, setColor] = useState('black');
  useEffect(() => {
    setInterval(() => {
      if (color === '#517992') {
        setColor('#8e494a');
      } else if (color === '#8e494a') {
        setColor('#517992');
      }
    }, 1200);
  });
  return (
    <div className="loader">
      <SquareLoader speedMultiplier={1} size={80} color={color} />
    </div>
  );
};

export default CustomLoader;
