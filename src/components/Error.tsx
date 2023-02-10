import React from 'react';
import './error.css';

function Error() {
  return (
    <div className="container">
      <div className="imgContainer">
        <h2>You come to the wrong place, mate!</h2>
        <img src="./images/black.svg" alt="a suspicious looking detective" width="300px" />

        <p>Most likely, the room you tried joining does not exist.</p>
      </div>
    </div>
  );
}

export default Error;
