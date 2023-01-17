import React from "react";
import { useSelector } from "react-redux";
import "./redTeamBox.css";
import { get, ref, update, set, child } from "firebase/database";
import { database } from "../../utils/firebase";

const RedTeamBox = () => {
  let playerId = useSelector((state) => state.player.playerId);
  let playerRef;
  const roomId = useSelector((state) => state.player.roomId);
  const username = useSelector((state) => state.player.username);

  playerRef = ref(database, "players/" + playerId);
  const teamOneRef = ref(database, `rooms/${roomId}/team-1/`);
  const teamTwoRef = ref(database, `rooms/${roomId}/team-2/`);
  const teamOneOperativesRef = ref(database, `rooms/${roomId}/team-1/operatives/`);
  const teamOneSpymasterRef = ref(database, `rooms/${roomId}/team-1/spymaster/`);

  // On click event for a player to be able to join team-1 team as a operative
  const joinRedOp = () => {
    //Here we want to check if a player is already a spymaster, so that they cannot join both
    get(teamOneSpymasterRef).then((snapshot)=> {
      if(snapshot.exists()){
        const teamOneSpymaster = Object.keys(snapshot.val());
        if(teamOneSpymaster.includes(playerId)){
          console.log('cannot join both the spymasters and the operatives')
        } else {
          set(child(teamOneOperativesRef, playerId), {playerId, username})
        }
      } else {
        set(child(teamOneOperativesRef, playerId), {playerId, username})
      }
    })
  }

  // On click event for a player to be able to join the blue team-2 as a spymaster
  const joinRedSpy = () => {
    get(teamOneOperativesRef).then((snapshot)=> {
      if(snapshot.exists()){
        const teamOneOperatives = Object.keys(snapshot.val());
        if(teamOneOperatives.includes(playerId)){
          console.log('cannot join both the spymasters and the operatives')
        } else{
          set(child(teamOneSpymasterRef, playerId), {playerId, username})
        }
      } else {
        set(child(teamOneSpymasterRef, playerId), {playerId, username})
      }
    })
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
