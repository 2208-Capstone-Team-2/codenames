import React from 'react';

const SpyCard = ({ singleWord, value }) => {
  console.log('inspy card', singleWord, value);
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
      {value === 1 && <div style={redStyle}>{singleWord.word}</div>}

      {value === 2 && <div style={blueStyle}>{singleWord.word}</div>}

      {value === 3 && <div style={beigeStyle}>{singleWord.word}</div>}

      {value === 0 && <div style={blackStyle}>{singleWord.word}</div>}
    </>
  );
};

export default SpyCard;
