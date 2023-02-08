import React from 'react';
import { Button } from '@mui/material';
import { ref, update, remove, get, child } from 'firebase/database';
import { database } from '../../utils/firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const MakeSpectator = () => {
  const { roomId, playerId } = useSelector((state: RootState) => state.player);
  const teamOneRef = ref(database, `rooms/${roomId}/team-1/`);
  const teamTwoRef = ref(database, `rooms/${roomId}/team-2/`);
  const teamOneSpymasterRef = ref(database, `rooms/${roomId}/team-1/spymaster/`);
  const teamTwoSpymasterRef = ref(database, `rooms/${roomId}/team-2/spymaster/`);
  const teamOneOperativesRef = ref(database, `rooms/${roomId}/team-1/operatives/`);
  const teamTwoOperativesRef = ref(database, `rooms/${roomId}/team-2/operatives/`);
  const nestedPlayerRef = ref(database, `rooms/${roomId}/players/${playerId}`);
  const { teamOneSpymaster } = useSelector((state: RootState) => state.teamOne);
  const { teamTwoSpymaster } = useSelector((state: RootState) => state.teamTwo);

  const makeMeSpectator = async () => {
    // update player to being a spectator, dispatch happens in roomView
    update(nestedPlayerRef, { isSpectator: true });

    // the rest of the logic in this fxn removes them depending on what team/position theyre in
    const teamOne = await get(teamOneRef);
    const teamTwo = await get(teamTwoRef);
    const teamOneOpsAndSpys = teamOne.val();
    const teamTwoOpsAndSpys = teamTwo.val();
    let teamOneOperatives;
    let teamTwoOperatives;

    if (teamOneOpsAndSpys && teamOneOpsAndSpys.operatives) {
        teamOneOperatives = Object.keys(teamOneOpsAndSpys.operatives);
    }
    if (teamTwoOpsAndSpys && teamTwoOpsAndSpys.operatives) {
        teamTwoOperatives = Object.keys(teamTwoOpsAndSpys.operatives);
    }
     if (teamOneOperatives && teamOneOperatives.includes(playerId)) {
         remove(child(teamOneOperativesRef, playerId));
    } else if (teamTwoOperatives && teamTwoOperatives.includes(playerId)) {
        remove(child(teamTwoOperativesRef, playerId));
    } else if (teamOneSpymaster?.playerId === playerId) {
        remove(teamOneSpymasterRef)
    } else if (teamTwoSpymaster?.playerId === playerId) {
        remove(teamTwoSpymasterRef)
    } else {
     console.log('youre already a spectator!')
    }
  };

  return (
    <div>
        <Button variant="contained" onClick={makeMeSpectator}>
          Become a spectator
        </Button>
    </div>
  );
};

export default MakeSpectator;
