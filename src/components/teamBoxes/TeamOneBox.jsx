import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./redTeamBox.css";
import { get, ref, update, set, child } from "firebase/database";
import { database } from "../../utils/firebase";
import { setTeamOneOperatives, setTeamOneSpymaster } from "../../store/teamOneSlice";

const RedTeamBox = () => {
  let playerId = useSelector((state) => state.player.playerId);
  let playerRef;
  const roomId = useSelector((state) => state.player.roomId);
  const username = useSelector((state) => state.player.username);
  const dispatch = useDispatch();
  playerRef = ref(database, "players/" + playerId);
  const teamOneOperativesRef = ref(database, `rooms/${roomId}/team-1/operatives/`);
  const teamOneSpymasterRef = ref(database, `rooms/${roomId}/team-1/spymaster/`);
  const { teamOneOperatives } = useSelector(state => state.teamOne);
  const { teamOneSpymaster } = useSelector(state => state.teamOne);
  // On click event for a player to be able to join team-1 team as a operative
  const joinTeam1Op = async () => {
    //Here we want to check if a player is already a spymaster, so that they cannot join both
    await get(teamOneSpymasterRef).then((snapshot)=> {
      //If players already exist as team one spymasters:
      if(snapshot.exists()){
        //'teamOneSpymasters' sets the spymasers id's to an array
        const teamOneSpymaster = Object.keys(snapshot.val());
        //Now we can check if the player is a spymaster, if they are, for now we just console log
        if(teamOneSpymaster.includes(playerId)){
          // later we should probably refactor this so that something on the UI is triggered
          console.log('cannot join both the spymasters and the operatives')
        } else {
          // if they are not a spymaster, then we allow them to join as an operative
          set(child(teamOneOperativesRef, playerId), {playerId, username})
        }
      } else {
        // if the snapshot is null, then no one is a spymaster and we can allow this player to be an operative
        // this code might be redundant, but I figured it could account for an edge case
        set(child(teamOneOperativesRef, playerId), {playerId, username})
      }
    })
    get(teamOneOperativesRef).then((snapshot)=> {
      dispatch(setTeamOneOperatives(Object.values(snapshot.val())))
    })
  }

  // On click event for a player to be able to join the blue team-2 as a spymaster
  const joinTeam1Spy = async () => {
    //Here we want to check if a player is already an operative, so that they cannot join both.
    await get(teamOneOperativesRef).then((snapshot)=> {
      //If players already exist as team one operatives:
      if(snapshot.exists()){
        //Now we can check if the player is an operative, if they are for now we just console log
        const teamOneOperatives = Object.keys(snapshot.val());
        if(teamOneOperatives.includes(playerId)){
          // later we should probably refactor thisso that something on the UI is triggered
          console.log('cannot join both the spymasters and the operatives')
        } else{
          // if they are not an operative, then we allow them to join as a spymaster
          set(child(teamOneSpymasterRef, playerId), {playerId, username})
        }
      } else {
        // if the snapshot is null, then no one is a spymaster and we can allow this player to be an operative
        // this code might be redundant, but I figured it could account for an edge case
        set(child(teamOneSpymasterRef, playerId), {playerId, username})
      }
    })
    get(teamOneSpymasterRef).then((snapshot)=> {
      dispatch(setTeamOneSpymaster(Object.values(snapshot.val())))
    })
  }
  return (
    <div className="redBoxCard">
      <div>Team 1</div>
      <div className="redOpsAndSpys">
        <div>
          <p>Operative(s)</p>
          {
            teamOneOperatives.map((player)=> {
              return <p>{player.username}</p>
            })
          }
          <button
          onClick={joinTeam1Op}
          >Join as Operative</button>
        </div>
        <div>
          <p>Spymaster(s)</p>
          {
            teamOneSpymaster.map((player)=> {
              return <p>{player.username}</p>
            })
          }
          <button
          onClick={joinTeam1Spy}
          >Join as Spymaster</button>
        </div>
      </div>
    </div>
  );
};

export default RedTeamBox;
