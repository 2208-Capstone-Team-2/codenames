import React from 'react';
import { Link } from 'react-router-dom';
import './faqTerms.css';
const FAQ = () => {
  return (
    <div>
      <Link to={'/'}>
        <button className="homeButton">&larr;&nbsp;Home</button>
      </Link>
      <div className="faqContainer">
        <h2 className="commonQuestions">Common Questions</h2>
        <ul className="ulContainer">
          <li>Q: What's spectator?</li>
          <p>
            A: a spectatr can see the board but not able to make guesses or give clues. This is designed for friends
            that are late to the game but still wants to participate
          </p>
          <li>Q: I am inside a room and the game has started, but I can't see the cards.</li>
          <p>A: Player must assign themselves a role before the board setup in order to see the board.</p>
          <br />
          <li>Q: The timer button is not working.</li>
          <p>A: Timer function is in our roadmap but unfortunately it is currently unavailable.</p>
          <br />
          <li>Q: It takes very long time for the website to load.</li>
          <p>
            A: This site is using a free hosting service with limited capacities. If you want a more seamless
            experience, you can play it locally by follow our step by step guide in our github repository.{' '}
          </p>
        </ul>
      </div>
    </div>
  );
};
export default FAQ;
