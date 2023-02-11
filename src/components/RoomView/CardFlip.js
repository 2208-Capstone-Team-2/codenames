import React from 'react';
import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import './card.css';
const CardFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const notYetRevealed = {
    width: '120pt',
    height: '96pt',
    backgroundColor: '#e2c78d',
    alignContent: 'center',
    margin: '0',
    color: 'black',
    textAlign: 'center',
    fontSize: '15px',
    fontFamily: 'Montserrat',
    textDecoration: 'underline',
    border: 'solid 3px black',
  };

  //const images = [
  //  {
  //    url: require('../../../statics/images/pfister.jpg'),
  //    title: 'Breakfast', width: '40%',
  //  }
  // ];
  // <span className={classes.imageSrc} style={{ backgroundImage: url(${image.url})`, }} />

  const redUrl = {
    url: require('./red.jpg'),
  };
  console.log(redUrl.url);

  const redRevealed = {
    width: '120pt',
    height: '96pt',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    textIndent: '-9999px',
    margin: '0',
    border: 'none',
    backgroundImage: `url(${redUrl.url})`,
  };

  const cardStyles = {
    front: notYetRevealed,
    back: redRevealed,
  };
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical" cardStyles={cardStyles}>
      <div>
        This is the front of the card.
        <button onClick={handleClick}>Click to flip</button>
      </div>

      <div>
        This is the back of the card.
        <button onClick={handleClick}>Click to flip</button>
      </div>
    </ReactCardFlip>
  );
};

export default CardFlip;
