import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import './card.css';
const CardFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  //const images = [
  //  {
  //    url: require('../../../statics/images/pfister.jpg'),
  //    title: 'Breakfast', width: '40%',
  //  }
  // ];
  // <span className={classes.imageSrc} style={{ backgroundImage: url(${image.url})`, }} />

  // depending on what
  let cardStyles = {};

  // if (word.teamId === team1Id) cardStyles = redCardStyles;
  // if (word.teamId === team2Id) cardStyles = blueCardStyles;
  // if (word.teamId === bystanderTeamId) cardStyles = beigeCardStyles;
  // if (word.teamId === assassinTeamId) cardStyles = blackCardStyles;

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
