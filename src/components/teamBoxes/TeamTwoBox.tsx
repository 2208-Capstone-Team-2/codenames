import React, { useEffect } from 'react';
import './teamTwoBox.css';
import { useDispatch, useSelector } from 'react-redux';
import { child, get, onDisconnect, onValue, ref, set } from 'firebase/database';
import { database } from '../../utils/firebase';
import { setTeamTwoOperatives, setTeamTwoSpymaster } from '../../store/teamTwoSlice';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store';
const TeamTwoBox = () => {
  const { roomId } = useParams();

  const { playerId, username } = useSelector((state: RootState) => state.player);
  const teamTwoOperativesRef = ref(database, `rooms/${roomId}/team-2/operatives/`);
  const teamTwoSpymasterRef = ref(database, `rooms/${roomId}/team-2/spymaster/`);
  const teamOneRef = ref(database, `rooms/${roomId}/team-1/`);
  const { teamTwoOperatives, teamTwoSpymaster } = useSelector((state: RootState) => state.teamTwo);
  const playerOnTeamTwoOperativesRef = ref(database, `rooms/${roomId}/team-2/operatives/${playerId}`);
  const teamTwoRemainingCards = useSelector((state: RootState) => state.game.team2RemainingCards);

  const dispatch = useDispatch();

  // On click event for a player to be able to join team-2 team as a operative
  const joinTeamTwoOp = async () => {
    const teamOne = await get(teamOneRef);
    const teamOneOpsAndSpys = teamOne.val();
    let teamOneSpymaster;
    let teamOneOperatives;
    if (teamOneOpsAndSpys && teamOneOpsAndSpys.spymaster) {
      teamOneSpymaster = teamOneOpsAndSpys.spymaster;
    }
    if (teamOneOpsAndSpys && teamOneOpsAndSpys.operatives) {
      teamOneOperatives = Object.keys(teamOneOpsAndSpys.operatives);
    }
    // If a player is on team 1, they cannot join this team
    if (
      (teamOneSpymaster && teamOneSpymaster.playerId === playerId) ||
      (teamOneOperatives && teamOneOperatives.includes(playerId))
    ) {
      console.log('Cannot join the other team!');
    } else {
      // Here we want to check if a player is already a spymaster, so that they cannot join both
      await get(teamTwoSpymasterRef).then((snapshot) => {
        // If players already exist as team one spymasters:
        if (snapshot.exists()) {
          const teamTwoSpymasterSnap = snapshot.val();
          if (teamTwoSpymasterSnap.playerId === playerId) {
            console.log('cannot join both the spymasters and the operatives');
          } else {
            onDisconnect(playerOnTeamTwoOperativesRef).remove();
            set(child(teamTwoOperativesRef, playerId), { playerId, username });
          }
        } else {
          onDisconnect(playerOnTeamTwoOperativesRef).remove();
          set(child(teamTwoOperativesRef, playerId), { playerId, username });
        }
      });
    }
  };

  // On click event for a player to be able to join the blue team-2 as a spymaster
  const joinTeamTwoSpy = async () => {
    const teamOne = await get(teamOneRef);
    const teamOneOpsAndSpys = teamOne.val();
    let teamOneSpymaster;
    let teamOneOperatives;
    console.log({ teamOneOpsAndSpys });
    if (teamOneOpsAndSpys && teamOneOpsAndSpys.spymaster) {
      teamOneSpymaster = teamOneOpsAndSpys.spymaster;
    }
    if (teamOneOpsAndSpys && teamOneOpsAndSpys.operatives) {
      teamOneOperatives = Object.keys(teamOneOpsAndSpys.operatives);
    }
    // If a player is on team 1, they cannot join this team
    if (
      (teamOneSpymaster && teamOneSpymaster.playerId === playerId) ||
      (teamOneOperatives && teamOneOperatives.includes(playerId))
    ) {

      console.log('Cannot join the other team!');
    } else {
      // Here we want to check if a player is already an operative, so that they cannot join both.
      await get(teamTwoOperativesRef).then((snapshot) => {
        // If players already exist as team one operatives:
        if (snapshot.exists()) {
          const teamTwoOperativesSnap = Object.keys(snapshot.val());
          if (teamTwoOperativesSnap.includes(playerId)) {
            // later we should probably refactor this so that something on the UI is triggered
      
            console.log('cannot join both the spymasters and the operatives');
          } else {
            onDisconnect(teamTwoSpymasterRef).remove();
            set(teamTwoSpymasterRef, { playerId, username });
          }
        } else {
          onDisconnect(teamTwoSpymasterRef).remove();
          set(teamTwoSpymasterRef, { playerId, username });
        }
      });
    }
  };
  useEffect(() => {
    onValue(teamTwoOperativesRef, async (snapshot) => {
      if (snapshot.exists()) {
        const teamTwoOperativesFirebase = snapshot.val();
        const teamTwoOperativesSnap = Object.values(teamTwoOperativesFirebase);
        dispatch(setTeamTwoOperatives(teamTwoOperativesSnap));
      } else {
        dispatch(setTeamTwoOperatives([]));
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