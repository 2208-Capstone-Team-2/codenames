import React from 'react';
import "./error.css";

function Error() {
  return (
  <div className='container'>  
    <div className='imgContainer'>
      <h2>You come to the wrong place, mate!</h2>
      <img src='https://raw.githubusercontent.com/2208-Capstone-Team-2/codenames/8665c86ca6998f71951d5feef354f5569268f67b/public/images/black.svg' width='300px'/>

      <p>Most likely, the room you tried joining does not exist.</p>
    </div>
  </div>
  );
}

export default Error;
