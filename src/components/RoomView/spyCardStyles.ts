//************** Stylings for FRONT of SPY CARDS ****************//
const redStyle = {
  backgroundColor: '#8c2a2a',
  width: '120pt',
  height: '96pt',
  textAlign: 'center',
  alignContent: 'center',
  margin: '0',
  color: 'black',
  fontSize: '15px',
  fontFamily: 'Montserrat',
  textDecoration: 'underline',
  border: 'solid 3px black',
};
const blueStyle = {
  backgroundColor: '#365e7f',
  width: '120pt',
  height: '96pt',
  textAlign: 'center',
  alignContent: 'center',
  margin: '0',
  color: 'black',
  fontSize: '15px',
  fontFamily: 'Montserrat',
  textDecoration: 'underline',
  border: 'solid 3px black',
};
const beigeStyle = {
  backgroundColor: '#e2c78d',
  width: '120pt',
  height: '96pt',
  textAlign: 'center',
  alignContent: 'center',
  margin: '0',
  color: 'black',
  fontSize: '15px',
  fontFamily: 'Montserrat',
  textDecoration: 'underline',
  border: 'solid 3px black',
};
const blackStyle = {
  backgroundColor: 'rgb(0, 0, 0)',
  width: '120pt',
  height: '96pt',
  textAlign: 'center',
  alignContent: 'center',
  margin: '0',
  color: 'white',
  fontSize: '15px',
  fontFamily: 'Montserrat',
  textDecoration: 'underline',
  border: 'solid 3px white',
};

//************** Stylings for BACK of SPY CARDS ****************//
const redRevealed = {
  width: '120pt',
  height: '96pt',
  backgroundImage: `url(/images/red.svg)`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  textIndent: '-9999px',
  margin: '0',
  border: 'none',
};
const blueRevealed = {
  width: '120pt',
  height: '96pt',
  backgroundImage: `url(/images/blue.svg)`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  margin: '0',
  textIndent: '-9999px',
  border: 'none',
  backgroundColor: 'blue',
};
const beigeRevealed = {
  width: '120pt',
  height: '96pt',
  backgroundImage: `url(/images/beige.svg)`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  margin: '0',
  textIndent: '-9999px',
  border: 'none',
  backgroundColor: 'beige',
};
const blackRevealed = {
  width: '120pt',
  height: '96pt',
  backgroundImage: `url(/images/black.svg)`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  margin: '0',
  textIndent: '-9999px',
  border: 'none',
  backgroundColor: 'black',
};

// These are the 4 possible cards with fronts and backs
const redCardStyles = {
  front: redStyle,
  back: redRevealed,
};
const blueCardStyles = {
  front: blueStyle,
  back: blueRevealed,
};
const beigeCardStyles = {
  front: beigeStyle,
  back: beigeRevealed,
};
const blackCardStyles = {
  front: blackStyle,
  back: blackRevealed,
};

const allCardStyles = { redCardStyles, blueCardStyles, beigeCardStyles, blackCardStyles };
export default allCardStyles;
