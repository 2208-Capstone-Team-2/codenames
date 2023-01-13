import React from "react";
import "./redTeamBox.css";
const RedTeamBox = () => {
  return (
    <div className="redBoxCard">
      <div>Red Team</div>
      <div className="redOpsAndSpys">
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
