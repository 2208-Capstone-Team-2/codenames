import React from "react";
import { useSelector } from "react-redux";
import "./redTeamBox.css";
import { ref, update } from "firebase/database";
import { database,  } from "../../utils/firebase";

const RedTeamBox = () => {
  let playerId = useSelector((state) => state.player.playerId);
  let playerRef;
  const roomId = useSelector((state) => state.player.roomId);
  const username = useSelector((state) => state.player.username);

  playerRef = ref(database, "players/" + playerId);
  const redSpyRef = ref(database, `rooms/${roomId}/redSpymaster`)
  // On click event for a player to be able to join team-1 team as a operative
  const joinRedOp = () => {
    update(playerRef, {team: 'team-1', role: "operative"})
    update(redSpyRef, {players: {
      id: playerId,
      username: username
    }})
  }

  // On click event for a player to be able to join the blue team-2 as a spymaster
  const joinRedSpy = () => {
    update(playerRef, {team: 'team-1', role: "spymaster"})
  }
  return (
    <div className="redBoxCard">
      <div>Team 1</div>
      <div className="redOpsAndSpys">
        <div>
          <p>Operative(s)</p>
          <button
          onClick={joinRedOp}
          >Join as Operative</button>
        </div>
        <div>
          <p>Spymaster(s)</p>
          <button
          onClick={joinRedSpy}
          >Join as Spymaster</button>
        </div>
      </div>
    </div>
  );
};

export default RedTeamBox;
