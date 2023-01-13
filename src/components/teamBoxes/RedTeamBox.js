import React from "react";
import "./teamBoxes.css";
const RedTeamBox = () => {
  return (
    <div className="boxCard">
      <div>Red Team</div>
      <div className="opsAndSpys">
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

export default RedTeamBox;
