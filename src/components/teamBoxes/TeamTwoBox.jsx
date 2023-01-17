import React from 'react';
import './blueTeamBox.css'
import { useDispatch, useSelector } from "react-redux";
import "./redTeamBox.css";
import { child, get, ref, set, update } from "firebase/database";
import { database,  } from "../../utils/firebase";
import { setTeamTwoOperatives, setTeamTwoSpymaster } from '../../store/teamTwoSlice';
const BlueTeamBox = () => {
  let playerId = useSelector((state) => state.player.playerId);
  let playerRef;
  const roomId = useSelector((state) => state.player.roomId);
  const username = useSelector((state) => state.player.username);
  playerRef = ref(database, "players/" + playerId);
  const teamTwoOperativesRef = ref(database, `rooms/${roomId}/team-2/operatives/`);
  const teamTwoSpymasterRef = ref(database, `rooms/${roomId}/team-2/spymaster/`);
  const { teamTwoOperatives } = useSelector(state => state.teamTwo);
  const { teamTwoSpymaster } = useSelector(state => state.teamTwo);
  const dispatch = useDispatch();
  // On click event for a player to be able to join team-1 team as a operative
  const joinTeam2Op = async () => {
    //Here we want to check if a player is already a spymaster, so that they cannot join both
    await get(teamTwoSpymasterRef).then((snapshot)=> {
      //If players already exist as team one spymasters:
      if(snapshot.exists()){
        //'teamTwoSpymasters' sets the spymasers id's to an array
        const teamTwoSpymaster = Object.keys(snapshot.val());
        //Now we can check if the player is a spymaster, if they are, for now we just console log
        if(teamTwoSpymaster.includes(playerId)){
          // later we should probably refactor this so that something on the UI is triggered
          console.log('cannot join both the spymasters and the operatives')
        } else {
          // if they are not a spymaster, then we allow them to join as an operative
          set(child(teamTwoOperativesRef, playerId), {playerId, username})
        }
      } else {
        // if the snapshot is null, then no one is a spymaster and we can allow this player to be an operative
        // this code might be redundant, but I figured it could account for an edge case
        set(child(teamTwoOperativesRef, playerId), {playerId, username})
      }
    })
    get(teamTwoOperativesRef).then((snapshot)=> {
      dispatch(setTeamTwoOperatives(Object.values(snapshot.val())))
    })
  }

  // On click event for a player to be able to join the blue team-2 as a spymaster
  const joinTeam2Spy = async () => {
    //Here we want to check if a player is already an operative, so that they cannot join both.
    await get(teamTwoOperativesRef).then((snapshot)=> {
      //If players already exist as team one operatives:
      if(snapshot.exists()){
        //Now we can check if the player is an operative, if they are for now we just console log
        const teamTwoOperatives = Object.keys(snapshot.val());
        if(teamTwoOperatives.includes(playerId)){
          // later we should probably refactor thisso that something on the UI is triggered
          console.log('cannot join both the spymasters and the operatives')
        } else{
          // if they are not an operative, then we allow them to join as a spymaster
          set(child(teamTwoSpymasterRef, playerId), {playerId, username})
        }
      } else {
        // if the snapshot is null, then no one is a spymaster and we can allow this player to be an operative
        // this code might be redundant, but I figured it could account for an edge case
        set(child(teamTwoSpymasterRef, playerId), {playerId, username})
      }
    })
    get(teamTwoSpymasterRef).then((snapshot)=> {
      dispatch(setTeamTwoSpymaster(Object.values(snapshot.val())))
    })
  }
    return (
    <div className="blueBoxCard">
      <div>Team 2</div>
      <div className="blueOpsAndSpys">
        <div>
          <p>Operative(s)</p>
          {
            teamTwoOperatives.map((player)=> {
              return <p>{player.username}</p>
            })
          }
          <button
          onClick={joinTeam2Op}
          >Join as Operative</button>
        </div>
        <div>
          <p>Spymaster(s)</p>
          {
            teamTwoSpymaster.map((player)=> {
              return <p>{player.username}</p>
            })
          }
          <button
          onClick={joinTeam2Spy}
          >Join as Spymaster</button>
        </div>
      </div>
    </div>
    );
};

export default BlueTeamBox;