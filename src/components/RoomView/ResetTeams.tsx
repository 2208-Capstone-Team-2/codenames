import React from 'react';
import { ref, remove, set } from 'firebase/database';
import { database } from '../../utils/firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const ResetTeams = () => {
    const { roomId } = useSelector((state: RootState) => state.player);
    const teamOneSpymasterRef = ref(database, `rooms/${roomId}/team-1/spymaster/`);
    const teamTwoSpymasterRef = ref(database, `rooms/${roomId}/team-2/spymaster/`);
    const teamOneOperativesRef = ref(database, `rooms/${roomId}/team-1/operatives/`);
    const teamTwoOperativesRef = ref(database, `rooms/${roomId}/team-2/operatives/`);
    // if host, see resetTeams button
const resetTeams = () => {
    remove(teamOneSpymasterRef)
    remove(teamTwoSpymasterRef)
    remove(teamOneOperativesRef)
    remove(teamTwoOperativesRef)
    set(gameRef, { gameStatus: 'ready', team1RemainingCards: 9, team2RemainingCards: 8 });
    set(gameHistoryRef, {});
    set(cardsRef, {});
}
    return (
        <button onClick={resetTeams}>Reset Teams</button>
    );
};

export default ResetTeams;