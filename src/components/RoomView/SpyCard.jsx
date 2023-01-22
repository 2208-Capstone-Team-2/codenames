import React from 'react';
import './card.css';

const SpyCard = ({ singleWord, value }) => {
  // spies have a different view of the card depending on its value, and also whether or not it's been revealed to everyone.
  // we'll likely use images or something for css but this was helpful for testing purposes
  return (
    <>
      {!singleWord.isVisibleToAll && value === 1 && <button className="redStyle">{singleWord.word}</button>}
      {!singleWord.isVisibleToAll && value === 2 && <button className="blueStyle">{singleWord.word}</button>}
      {!singleWord.isVisibleToAll && value === 3 && <button className="beigeStyle">{singleWord.word}</button>}
      {!singleWord.isVisibleToAll && value === 0 && <button className="blackStyle">{singleWord.word}</button>}

      {singleWord.isVisibleToAll && value === 1 && <button className="redRevealed">{singleWord.word}</button>}
      {singleWord.isVisibleToAll && value === 2 && <button className="blueRevealed">{singleWord.word}</button>}
      {singleWord.isVisibleToAll && value === 3 && <button className="beigeRevealed">{singleWord.word}</button>}
      {singleWord.isVisibleToAll && value === 0 && <button className="blackRevealed">{singleWord.word}</button>}
    </>
  );
};

export default SpyCard;
