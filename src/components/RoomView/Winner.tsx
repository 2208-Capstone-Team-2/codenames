import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../../utils/firebase';
import { ref, get } from 'firebase/database';
import { useSelector } from 'react-redux';
import { setRoomId } from '../../store/playerSlice';
import { RootState } from '../../store';
interface TeamInfo {
  [property: string]: any;
}
const Winner: React.FC = () => {
  const { roomId } = useParams();
  setRoomId(roomId);

  const playerId = useSelector((state: RootState) => state.player.playerId);
  const gameStatus = useSelector((state: RootState) => state.game.status);
  const [playerIdArray, setPlayerIdArray] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const winner = useSelector((state: RootState) => state.game.winner);
  const loser = useSelector((state: RootState) => state.game.loser);

// i started refactoring this since we now have access to teamIds but don't want to touch too much of heidi's code
// we should be able to just check if the player is on the team that won in redux instead of making a firebase call, but either way works!
  useEffect(() => {
      if (winner !== '') {
        const teamThatWonRef = ref(database, `rooms/${roomId}/${winner}/`);
        get(teamThatWonRef).then(async (winningTeamSnapshot) => {
          if (winningTeamSnapshot.exists()) {
            const winningMembers = winningTeamSnapshot.val();
            console.log({winningMembers})
            const getPlayerIds = (obj: TeamInfo): string[] => {
              let playerIds: string[] = [];
              for (const key in obj) {
                if (obj[key].hasOwnProperty('playerId')) {
                  playerIds.push(obj[key].playerId);
                } else {
                  playerIds = playerIds.concat(getPlayerIds(obj[key]));
                }
              }
              return playerIds;
            };
            setPlayerIdArray(getPlayerIds(winningMembers));
          }
        });
      }
  }, [winner, loser]);

  return isVisible && playerIdArray.includes(playerId) && gameStatus === 'complete' ? (
    <div className="winner">
      <h1>Congratulations! Your team won! Play again?</h1>
      <button className="closeButton" onClick={() => setIsVisible(false)}>
        X
      </button>
    </div>
  ) : (
    <div />
  );
};
export default Winner;
