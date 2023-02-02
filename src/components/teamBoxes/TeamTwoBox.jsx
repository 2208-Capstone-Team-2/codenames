import React, { useEffect } from 'react';
import './teamTwoBox.css';
import { useDispatch, useSelector } from 'react-redux';
import { child, get, onDisconnect, onValue, ref, set } from 'firebase/database';
import { database } from '../../utils/firebase';
import { setTeamTwoOperatives, setTeamTwoSpymaster } from '../../store/teamTwoSlice';
import { useParams } from 'react-router-dom';
const TeamTwoBox = () => {
  const { roomId } = useParams();

  const { playerId, username } = useSelector((state) => state.player);

  const teamTwoOperativesRef = ref(database, `rooms/${roomId}/team-2/operatives/`);
  const teamTwoSpymasterRef = ref(database, `rooms/${roomId}/team-2/spymaster/`);
  const teamOneRef = ref(database, `rooms/${roomId}/team-1/`);
  const { teamTwoOperatives, teamTwoSpymaster } = useSelector((state) => state.teamTwo);
  const playerOnTeamTwoOperativesRef = ref(database, `rooms/${roomId}/team-2/operatives/${playerId}`);
  const playerOnTeamTwoSpymasterRef = ref(database, `rooms/${roomId}/team-2/spymaster/${playerId}`);
  const teamTwoRemainingCards = useSelector((state) => state.game.team2RemainingCards);

  const dispatch = useDispatch();

  // On click event for a player to be able to join team-2 team as a operative
  const joinTeamTwoOp = async () => {
    //lines 23 - 35 are checking if the current player is already on a team
    const teamOne = await get(teamOneRef);
    const teamOneOpsAndSpys = teamOne.val();
    let teamOneSpymaster;
    let teamOneOperatives;
    //Grabbing team ones info
    if (teamOneOpsAndSpys && teamOneOpsAndSpys.spymaster) {
      teamOneSpymaster = teamOneOpsAndSpys.spymaster;
    }
    //Grabbing team ones info
    if (teamOneOpsAndSpys && teamOneOpsAndSpys.operatives) {
      teamOneOperatives = Object.keys(teamOneOpsAndSpys.operatives);
    }
    //If a player is on team 1, they cannot join this team
    if (
      (teamOneSpymaster && teamOneSpymaster.playerId === playerId) ||
      (teamOneOperatives && teamOneOperatives.includes(playerId))
    ) {
      console.log('Cannot join the other team!');
    } else {
      //Here we want to check if a player is already a spymaster, so that they cannot join both
      await get(teamTwoSpymasterRef).then((snapshot) => {
        //If players already exist as team one spymasters:
        if (snapshot.exists()) {
          //'teamTwoSpymasters' sets the spymasers id's to an array
          const teamTwoSpymaster = snapshot.val();
          //Now we can check if the player is a spymaster, if they are, for now we just console log
          if (teamTwoSpymaster.playerId === playerId) {
            // later we should probably refactor this so that something on the UI is triggered
            console.log('cannot join both the spymasters and the operatives');
          } else {
            // if they are not a spymaster, then we allow them to join as an operative
            set(child(teamTwoOperativesRef, playerId), { playerId, username });
          }
        } else {
          // if the snapshot is null, then no one is a spymaster and we can allow this player to be an operative
          // this code might be redundant, but I figured it could account for an edge case
          set(child(teamTwoOperativesRef, playerId), { playerId, username });
        }
      });
    }
  };

  // On click event for a player to be able to join the blue team-2 as a spymaster
  const joinTeamTwoSpy = async () => {
    //lines 64 - 76 are checking if the current player is already on a team
    const teamOne = await get(teamOneRef);
    const teamOneOpsAndSpys = teamOne.val();
    let teamOneSpymaster;
    let teamOneOperatives;
    //Grabbing team ones info
    if (teamOneOpsAndSpys && teamOneOpsAndSpys.spymaster) {
      teamOneSpymaster = teamOneOpsAndSpys.spymaster;
    }
    //Grabbing team ones info
    if (teamOneOpsAndSpys && teamOneOpsAndSpys.operatives) {
      teamOneOperatives = Object.keys(teamOneOpsAndSpys.operatives);
    }
    //If a player is on team 1, they cannot join this team
    if (
      (teamOneSpymaster && teamOneSpymaster.playerId === playerId) ||
      (teamOneOperatives && teamOneOperatives.includes(playerId))
    ) {
      console.log('Cannot join the other team!');
    } else {
      //Here we want to check if a player is already an operative, so that they cannot join both.
      await get(teamTwoOperativesRef).then((snapshot) => {
        //If players already exist as team one operatives:
        if (snapshot.exists()) {
          //Now we can check if the player is an operative, if they are for now we just console log
          const teamTwoOperatives = Object.keys(snapshot.val());
          if (teamTwoOperatives.includes(playerId)) {
            // later we should probably refactor thisso that something on the UI is triggered
            console.log('cannot join both the spymasters and the operatives');
          } else {
            // if they are not an operative, then we allow them to join as a spymaster
            set(teamTwoSpymasterRef, { playerId, username });
          }
        } else {
          // if the snapshot is null, then no one is a spymaster and we can allow this player to be an operative
          // this code might be redundant, but I figured it could account for an edge case
          set(teamTwoSpymasterRef, { playerId, username });
        }
      });
    }
  };
  useEffect(() => {
    onValue(teamTwoOperativesRef, async (snapshot) => {
      if (snapshot.exists()) {
        const teamTwoOperativesFirebase = snapshot.val();
        const teamTwoOperatives = Object.values(teamTwoOperativesFirebase);
        dispatch(setTeamTwoOperatives(teamTwoOperatives));
      } else {
        dispatch(setTeamTwoOperatives([]));
      }
    });
    onValue(playerOnTeamTwoOperativesRef, async (snapshot) => {
      if (snapshot.exists()) {
        onDisconnect(playerOnTeamTwoOperativesRef).remove(playerOnTeamTwoOperativesRef);
      }
    });
    onValue(teamTwoSpymasterRef, async (snapshot) => {
      if (snapshot.exists()) {
        const teamTwoSpymasterFirebase = snapshot.val();
        dispatch(
          setTeamTwoSpymaster({
            playerId: teamTwoSpymasterFirebase.playerId,
            username: teamTwoSpymasterFirebase.username,
          }),
        );
      } else {
        dispatch(setTeamTwoSpymaster(null));
      }
    });
    onValue(playerOnTeamTwoSpymasterRef, async (snapshot) => {
      if (snapshot.exists()) {
        onDisconnect(playerOnTeamTwoSpymasterRef).remove(playerOnTeamTwoSpymasterRef);
      }
    });
  }, [playerId]);
  return (
    <div className="blueBoxCard">
      <div>Team 2</div>
      <div>Remaining Cards: {teamTwoRemainingCards}</div>
      <div className="blueOpsAndSpys">
        <div>
          <p>Operative(s)</p>
          {teamTwoOperatives?.map((player) => {
            return player.username + ', ';
          })}{' '}
          <br />
          <button onClick={joinTeamTwoOp}>Join as Operative</button>
        </div>
        <div>
          <p>Spymaster(s)</p>
          {teamTwoSpymaster && teamTwoSpymaster.username}

          <br />
          <button onClick={joinTeamTwoSpy}>Join as Spymaster</button>
        </div>
      </div>
    </div>
  );
};

export default TeamTwoBox;
