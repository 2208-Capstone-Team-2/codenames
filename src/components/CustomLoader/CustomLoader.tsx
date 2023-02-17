import React, { useEffect, useState } from 'react';
import { GridLoader, SquareLoader, BounceLoader } from 'react-spinners';
import './customLoader.css';
const CustomLoader = (props: { colorPair: any; classname: string }) => {
  // Props
  const classname = props.classname; // this will be either loaderLarge or loaderSmall
  const colorPair = props.colorPair; // this will be either greyBeige or redBlue
  // Color values
  const grey = '#DCDCDC';
  const beige = '#e2c78d';
  const red = '#8c292a';
  const blue = '#355e7f';

  // Default 1st and 2nd colors are grey and beige
  let firstColor = grey;
  let secondColor = beige;
  if (colorPair === 'redBlue') {
    firstColor = red;
    secondColor = blue;
  }

  const [color, setColor] = useState(firstColor);

  useEffect(() => {
    const interval = setInterval(() => {
      if (color === firstColor) setColor(secondColor);
      else setColor(firstColor);
    }, 1000);
    return () => clearInterval(interval);
  }, [color]);

  return (
    <div className={classname}>
      <SquareLoader speedMultiplier={1} size={80} color={color} />
    </div>
  );
};

export default CustomLoader;
