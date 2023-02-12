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

  let cardStyles = {};

  const blueUrl = {
    url: require('./red.jpg'),
  };
  console.log(blueUrl.url);
  const blueRevealed = {
    width: '120pt',
    height: '96pt',
    backgroundimage: `url(${blueUrl.url})`,
    backgroundrepeat: 'no-repeat',
    backgroundsize: 'cover',
    margin: '0',
    textindent: '-9999px',
    border: 'none',
  };
  
  const beigeUrl = {
    url: require('./beige.jpg'),
  };
  console.log(beigeUrl.url);
  const beigeRevealed = {
    width: '120pt',
    height: '96pt',
    backgroundimage: `url(${beigeUrl.url})`,
    backgroundrepeat: 'no-repeat',
    backgroundsize: 'cover',
    margin: '0',
    textindent: '-9999px',
    border: 'none',
  };
  const blackUrl = {
    url: require('./being.jpg'),
  };
  console.log(blackUrl.url);
  const blackRevealed = {
    width: '120pt',
    height: '96pt',
    backgroundimage: `url(${blackUrl.url})`,
    backgroundrepeat: 'no-repeat',
    backgroundsize: 'cover',
    margin: '0',
    textindent: '-9999px',
    border: 'none',
  };

  // const redCardStyles = {
  //   front: notYetRevealed,
  //   back: redRevealed,
  // };
  // const blueCardStyles = {
  //   front: notYetRevealed,
  //   back: blueRevealed,
  // };
  // const beigeCardStyles = {
  //   front: notYetRevealed,
  //   back: beigeRevealed,
  // };
  // const blackCardStyles = {
  //   front: notYetRevealed,
  //   back: blackRevealed,
  // };
  // if (word.teamId === team1Id) cardStyles = redCardStyles
  // if (word.teamId === team2Id) cardStyles = blueCardStyles
  // if (word.teamId === bystanderTeamId) cardStyles = beigeCardStyles
  // if (word.teamId === assassinTeamId) cardStyles = blackCardStyles
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
