import React from 'react';
import { ref, remove, update, get, child } from 'firebase/database';
import { database } from '../../utils/firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import './resetButtons.css';

const ResetTeams = () => {
  const { roomId } = useSelector((state: RootState) => state.player);
  const { status } = useSelector((state: RootState) => state.game);
  const teamOneSpymasterRef = ref(database, `rooms/${roomId}/team-1/spymaster/`);
  const teamTwoSpymasterRef = ref(database, `rooms/${roomId}/team-2/spymaster/`);
  const teamOneOperativesRef = ref(database, `rooms/${roomId}/team-1/operatives/`);
  const teamTwoOperativesRef = ref(database, `rooms/${roomId}/team-2/operatives/`);
  const playersInRoomRef = ref(database, `rooms/${roomId}/players/`);

  const updateAllPlayersTeamsToNull = (playerIdsArray: any, playersInRoomRef: any) => {
    playerIdsArray.forEach((playerIdFromArray: any) => {
      update(child(playersInRoomRef, playerIdFromArray), { teamId: null });
    });
  };

  // if host, see resetTeams button
  const resetTeams = async () => {
    let arrayOfPlayerIds;
    // the 'removes' remove the teams children
    remove(teamOneSpymasterRef);
    remove(teamTwoSpymasterRef);
    remove(teamOneOperativesRef);
    remove(teamTwoOperativesRef);

    // this was a shot in the dark
    get(playersInRoomRef).then((snapshot) => {
      if (snapshot.exists()) {
        // let playerIds = [array of player ids]
        arrayOfPlayerIds = Object.keys(snapshot.val());
        updateAllPlayersTeamsToNull(arrayOfPlayerIds, playersInRoomRef);
      }
    });
  };

  return (
    <>
      {status === 'ready' && (
        <button className="gameSettingsButton" onClick={resetTeams}>
          Reset Teams
        </button>
      )}
    </>
  );
};

export default ResetTeams;
