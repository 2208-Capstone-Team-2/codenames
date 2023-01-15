import React from 'react';
import './blueTeamBox.css'
import { useSelector } from "react-redux";
import "./redTeamBox.css";
import { ref, update } from "firebase/database";
import { database,  } from "../../utils/firebase";
const BlueTeamBox = () => {
  const playerId = useSelector((state) => state.player.playerId);
  const playerRef = ref(database, "players/" + playerId);
  // On click event for a player to be able to join the blue team-2 as a operative
  const joinBlueOp = () => {
    update(playerRef, {team: 'team-2', role: "operative"})
  }
  // On click event for a player to be able to join the team-2 team as a spymaster
  const joinBlueSpy = () => {
    update(playerRef, {team: 'team-2', role: "spymaster"})
  }
    return (
    <div className="blueBoxCard">
      <div>Red Team</div>
      <div className="blueOpsAndSpys">
        <div>
          <p>Operative(s)</p>
          <button
          onClick={joinBlueOp}
          >Join as Operative</button>
        </div>
        <div>
          <p>Spymaster(s)</p>
          <button
          onClick={joinBlueSpy}
          >Join as Spymaster</button>
        </div>
      </div>
    </div>
    );
};

export default BlueTeamBox;