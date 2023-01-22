import React from 'react';
import './card.css';

const SpyCard = ({ singleWord, value }) => {
  const redStyle = {
    width: '120px',
    height: '150px',
    backgroundColor: 'red',
    textAlign: 'center',
    alignContent: 'center',
    display: 'grid',
  };
  const blueStyle = {
    width: '120px',
    height: '150px',
    backgroundColor: 'blue',
    textAlign: 'center',
    alignContent: 'center',
    display: 'grid',
  };
  const beigeStyle = {
    width: '120px',
    height: '150px',
    backgroundColor: 'beige',
    textAlign: 'center',
    alignContent: 'center',
    display: 'grid',
  };
  const blackStyle = {
    width: '120px',
    height: '150px',
    backgroundColor: 'black',
    textAlign: 'center',
    alignContent: 'center',
    display: 'grid',
  };

  return (
    <>
      {!singleWord.isVisibleToAll && value === 1 && <div style={redStyle}>{singleWord.word}</div>}
      {!singleWord.isVisibleToAll && value === 2 && <div style={blueStyle}>{singleWord.word}</div>}
      {!singleWord.isVisibleToAll && value === 3 && <div style={beigeStyle}>{singleWord.word}</div>}
      {!singleWord.isVisibleToAll && value === 0 && <div style={blackStyle}>{singleWord.word}</div>}

      {singleWord.isVisibleToAll && value === 1 && <div className="redRevealed">{singleWord.word}</div>}
      {singleWord.isVisibleToAll && value === 2 && <div className="blueRevealed">{singleWord.word}</div>}
      {singleWord.isVisibleToAll && value === 3 && <div className="beigeRevealed">{singleWord.word}</div>}
      {singleWord.isVisibleToAll && value === 0 && <div className="blackRevealed">{singleWord.word}</div>}
    </>
  );
};

export default SpyCard;
