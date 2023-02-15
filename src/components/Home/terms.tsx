import React from 'react';
import { Link } from 'react-router-dom';
import './faqTerms.css';
const Terms = () => {
  return (
    <div>
      <Link to={'/'}>
        <button className="homeButton">&larr;&nbsp;Home</button>
      </Link>
      <div className="termsContainer">
        <p className="termsContent">
          Any use of our code or project for the purpose of making a profit without prior authorization is not allowed.
          If you wish to use our code or project for commercial purposes, you must first obtain our explicit permission,
          and agree to any terms and conditions that we may impose.
        </p>
        <h3>Acknowledgements </h3>
        <ul className="ulContent">
          <li>
            Words for the cards sourced from{' '}
            <a href="https://github.com/sagelga/codenames" target="_blank">
              this repository
            </a>
          </li>
          <li>
            <a href="https://express.adobe.com/express-apps/logo-maker/" target="_blank">
              Adobe Express
            </a>{' '}
            for logo creation
          </li>
          <li>
            Fullstack Academy & and our amazing instructor{' '}
            <a href="https://github.com/Semiroundpizza8" target="_blank">
              Ben
            </a>{' '}
            and awesome mentor
            <a href="https://github.com/Semiroundpizza8" target="_blank">
              Louis
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Terms;
