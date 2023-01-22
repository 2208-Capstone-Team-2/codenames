import React from 'react';
import './card.css';

const SpyCard = ({ singleWord, value }) => {
  return (
    <>
      {!singleWord.isVisibleToAll && value === 1 && <div className="redStyle">{singleWord.word}</div>}
      {!singleWord.isVisibleToAll && value === 2 && <div className="blueStyle">{singleWord.word}</div>}
      {!singleWord.isVisibleToAll && value === 3 && <div className="beigeStyle">{singleWord.word}</div>}
      {!singleWord.isVisibleToAll && value === 0 && <div className="blackStyle">{singleWord.word}</div>}

      {singleWord.isVisibleToAll && value === 1 && <div className="redRevealed">{singleWord.word}</div>}
      {singleWord.isVisibleToAll && value === 2 && <div className="blueRevealed">{singleWord.word}</div>}
      {singleWord.isVisibleToAll && value === 3 && <div className="beigeRevealed">{singleWord.word}</div>}
      {singleWord.isVisibleToAll && value === 0 && <div className="blackRevealed">{singleWord.word}</div>}
    </>
  );
};

export default SpyCard;
