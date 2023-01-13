import React from 'react';
import './blueTeamBox.css'
const BlueTeamBox = () => {
    return (
    <div className="blueBoxCard">
      <div>Red Team</div>
      <div className="blueOpsAndSpys">
        <div>
          <p>Operative(s)</p>
          <button>Join as Operative</button>
        </div>
        <div>
          <p>Spymaster(s)</p>
          <button>Join as Spymaster</button>
        </div>
      </div>
    </div>
    );
};

export default BlueTeamBox;