import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './teamOneBox.css';
import { get, ref, set, child, onValue, onDisconnect, update } from 'firebase/database';
import { database } from '../../utils/firebase';
import { setTeamOneOperatives, setTeamOneSpymaster } from '../../store/teamOneSlice';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store';

const TeamOneBox = () => {
  // redux
  const { roomId } = useParams();
  const { playerId, username, teamId } = useSelector((state: RootState) => state.player);
  const { team1Id, teamOneOperatives, teamOneSpymaster } = useSelector((state: RootState) => state.teamOne);
  const { team1RemainingCards } = useSelector((state: RootState) => state.game);

  // firebase refs
  const playerOnTeamOneOperativesRef = ref(database, `rooms/${roomId}/team-1/operatives/${playerId}`);
  const teamTwoRef = ref(database, `rooms/${roomId}/team-2/`);
  const teamOneOperativesRef = ref(database, `rooms/${roomId}/team-1/operatives/`);
  const teamOneSpymasterRef = ref(database, `rooms/${roomId}/team-1/spymaster/`);
  const nestedPlayerRef = ref(database, `rooms/${roomId}/players/${playerId}/`);

  const dispatch = useDispatch();

  // On click event for a player to be able to join team-1 team as a operative
  const joinTeamOneOp = async () => {
    const teamTwo = await get(teamTwoRef);
    const teamTwoOpsAndSpys = teamTwo.val();
    let teamTwoSpymaster;
    let teamTwoOperatives;
    if (teamTwoOpsAndSpys && teamTwoOpsAndSpys.spymaster) {
      teamTwoSpymaster = teamTwoOpsAndSpys.spymaster;
    }
    if (teamTwoOpsAndSpys && teamTwoOpsAndSpys.operatives) {
      teamTwoOperatives = Object.keys(teamTwoOpsAndSpys.operatives);
    }
    // If a player is on team 2, they cannot join this team
    if (
      (teamTwoSpymaster && teamTwoSpymaster.playerId === playerId) ||
      (teamTwoOperatives && teamTwoOperatives.includes(playerId))
    ) {
      // console.log('Cannot join the other team!');
    } else {
      // Here we want to check if a player is already a spymaster, so that they cannot join both
      await get(teamOneSpymasterRef).then((snapshot) => {
        // If players already exist as team one spymasters:
        if (snapshot.exists()) {
          const teamOneSpymasterGet = snapshot.val();
          if (teamOneSpymasterGet.playerId === playerId) {
            // later we should probably refactor this so that something on the UI is triggered
            // console.log('cannot join both the spymasters and the operatives');
          } else {
            onDisconnect(playerOnTeamOneOperativesRef).remove();
            set(child(teamOneOperativesRef, playerId), { playerId, username });
            update(nestedPlayerRef, { teamId: team1Id });
          }
        } else {
          onDisconnect(playerOnTeamOneOperativesRef).remove();
          set(child(teamOneOperativesRef, playerId), { playerId, username });
          update(nestedPlayerRef, { teamId: team1Id });
        }
      });
    }
  };

  // On click event for a player to be able to join the blue team-1 as a spymaster
  const joinTeamOneSpy = async () => {
    const teamTwo = await get(teamTwoRef);
    const teamTwoOpsAndSpys = teamTwo.val();
    let teamTwoSpymaster;
    let teamTwoOperatives;
    if (teamTwoOpsAndSpys && teamTwoOpsAndSpys.spymaster) {
      teamTwoSpymaster = teamTwoOpsAndSpys.spymaster;
    }
    if (teamTwoOpsAndSpys && teamTwoOpsAndSpys.operatives) {
      teamTwoOperatives = Object.keys(teamTwoOpsAndSpys.operatives);
    }
    // If a player is on team 2, they cannot join this team
    if (
      (teamTwoSpymaster && teamTwoSpymaster.playerId === playerId) ||
      (teamTwoOperatives && teamTwoOperatives.includes(playerId))
    ) {
      // console.log('Cannot join the other team!');
    } else {
      await get(teamOneOperativesRef).then((snapshot) => {
        // If players already exist as team one operatives:
        if (snapshot.exists()) {
          const teamOneOperativesGet = Object.keys(snapshot.val());
          if (teamOneOperativesGet.includes(playerId)) {
            // later we should probably refactor thisso that something on the UI is triggered
            // console.log('cannot join both the spymasters and the operatives');
          } else {
            onDisconnect(teamOneSpymasterRef).remove();
            set(teamOneSpymasterRef, { playerId, username });
            update(nestedPlayerRef, { teamId: team1Id });
          }
        } else {
          onDisconnect(teamOneSpymasterRef).remove();
          set(teamOneSpymasterRef, { playerId, username });
          update(nestedPlayerRef, { teamId: team1Id });
        }
      });
    }
  };

  useEffect(() => {
    onValue(teamOneOperativesRef, async (snapshot) => {
      // if operatives exist
      if (snapshot.exists()) {
        const teamOneOperativesFirebase = snapshot.val();
        const teamOneOperativesGet = Object.values(teamOneOperativesFirebase);
        dispatch(setTeamOneOperatives(teamOneOperativesGet));
      } else {
        dispatch(setTeamOneOperatives([]));
      }
    });

    onValue(teamOneSpymasterRef, async (snapshot) => {
      if (snapshot.exists()) {
        const teamOneSpymasterFirebase = snapshot.val();
        dispatch(
          setTeamOneSpymaster({
            playerId: teamOneSpymasterFirebase.playerId,
            username: teamOneSpymasterFirebase.username,
          }),
        );
      } else {
        dispatch(setTeamOneSpymaster(null));
      }
    });
  }, [playerId]);

  return (
    <div className="redGridCell">
      <div className="redBoxCard">
        <div>
          <h3>Team 1</h3>
          <h3>Remaining Cards: {team1RemainingCards}</h3>
        </div>
        <div className="redOpsAndSpys">
          <div>
            <p>Operative(s)</p>
            <div className="playerNameContainer">
              {teamOneOperatives?.map((player) => {
                return (
                  <div className="playerName" key={player.playerId}>
                    {player.username}
                  </div>
                );
              })}{' '}
            </div>
            <br />
            {!teamId && <button onClick={joinTeamOneOp}>Join as Operative</button>}
          </div>
          <div>
            <p>Spymaster(s)</p>
            {teamOneSpymaster && <div className="playerName">{teamOneSpymaster.username}</div>}
            <br />
            {!teamOneSpymaster && !teamId && <button onClick={joinTeamOneSpy}>Join as Spymaster</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamOneBox;
