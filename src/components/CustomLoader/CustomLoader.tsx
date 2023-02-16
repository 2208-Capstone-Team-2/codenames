import React, { useEffect, useState } from 'react';
import { GridLoader, SquareLoader, BounceLoader } from 'react-spinners';
import './customLoader.css';
const CustomLoader = (props: { colorPair: any; classname: string }) => {
  // Color values
  const red = '#8c292a';
  const blue = '#355e7f';
  const grey = '#DCDCDC';
  const beige = '#e2c78d';

  // Props
  const classname = props.classname; // this will be either loaderLarge or loaderSmall
  const colorPair = props.colorPair; // this will be either greyBeige or redBlue

  // State
  let firstColor = grey;
  if (colorPair === 'redBlue') firstColor = red;
  const [color, setColor] = useState(firstColor);

  useEffect(() => {
    const interval = setInterval(() => {
      if (colorPair === 'greyBeige') {
        if (color === grey) setColor(beige);
        else setColor(grey);
      }
      if (colorPair === 'redBlue') {
        if (color === red) setColor(blue);
        else setColor(red);
      }
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
