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

const redUrl = { url: require('./red.svg') };
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

const blueUrl = { url: require('./blue.svg') };
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

const beigeUrl = { url: require('./beige.svg') };
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

const blackUrl = { url: require('./black.svg') };
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

// These are the 4 possible cards with fronts and backs
const redCardStyles = {
  front: notYetRevealed,
  back: redRevealed,
};
const blueCardStyles = {
  front: notYetRevealed,
  back: blueRevealed,
};
const beigeCardStyles = {
  front: notYetRevealed,
  back: beigeRevealed,
};
const blackCardStyles = {
  front: notYetRevealed,
  back: blackRevealed,
};

const allCardStyles = { redCardStyles, blueCardStyles, beigeCardStyles, blackCardStyles };
export default allCardStyles;
