import React from 'react';
import './blueTeamBox.css'
import { useSelector } from "react-redux";
import "./redTeamBox.css";
import { child, get, ref, set, update } from "firebase/database";
import { database,  } from "../../utils/firebase";
const BlueTeamBox = () => {
  let playerId = useSelector((state) => state.player.playerId);
  let playerRef;
  const roomId = useSelector((state) => state.player.roomId);
  const username = useSelector((state) => state.player.username);

  playerRef = ref(database, "players/" + playerId);
  const teamOneRef = ref(database, `rooms/${roomId}/team-1/`);
  const teamTwoRef = ref(database, `rooms/${roomId}/team-2/`);
  const teamTwoOperativesRef = ref(database, `rooms/${roomId}/team-2/operatives/`);
  const teamTwoSpymasterRef = ref(database, `rooms/${roomId}/team-2/spymaster/`);

  // On click event for a player to be able to join team-1 team as a operative
  const joinTeam2Op = () => {
    //Here we want to check if a player is already a spymaster, so that they cannot join both
    get(teamTwoSpymasterRef).then((snapshot)=> {
      if(snapshot.exists()){
        const teamTwoSpymaster = Object.keys(snapshot.val());
        if(teamTwoSpymaster.includes(playerId)){
          console.log('cannot join both the spymasters and the operatives')
        } else {
          set(child(teamTwoOperativesRef, playerId), {playerId, username})
        }
      } else {
        console.log('should be here')
        set(child(teamTwoOperativesRef, playerId), {playerId, username})
      }
    })
  }

  // On click event for a player to be able to join the blue team-2 as a spymaster
  const joinTeam2Spy = () => {
    get(teamTwoOperativesRef).then((snapshot)=> {
      if(snapshot.exists()){
        const teamTwoOperatives = Object.keys(snapshot.val());
        if(teamTwoOperatives.includes(playerId)){
          console.log('cannot join both the spymasters and the operatives')
        } else{
          set(child(teamTwoSpymasterRef, playerId), {playerId, username})
        }
      } else {
        set(child(teamTwoSpymasterRef, playerId), {playerId, username})
      }
    })
  }
    return (
    <div className="blueBoxCard">
      <div>Team 2</div>
      <div className="blueOpsAndSpys">
        <div>
          <p>Operative(s)</p>
          <button
          onClick={joinTeam2Op}
          >Join as Operative</button>
        </div>
        <div>
          <p>Spymaster(s)</p>
          <button
          onClick={joinTeam2Spy}
          >Join as Spymaster</button>
        </div>
      </div>
    </div>
    );
};

export default BlueTeamBox;