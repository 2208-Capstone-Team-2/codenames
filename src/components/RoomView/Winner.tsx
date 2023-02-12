import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../../utils/firebase';
import { ref, get, onValue } from 'firebase/database';
import { useSelector } from 'react-redux';
import { setRoomId } from '../../store/playerSlice';
import { RootState } from '../../store';
interface TeamInfo {
  [property: string]: any;
}
const Winner: React.FC = () => {
  const { roomId } = useParams();
  setRoomId(roomId);

  const winnerRef = ref(database, `rooms/${roomId}/game/winner`);

  const playerId = useSelector((state: RootState) => state.player.playerId);
  const gameStatus = useSelector((state: RootState) => state.game.status);
  const [playerIdArray, setPlayerIdArray] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const winner = useSelector((state: RootState) => state.game.winner);
  const loser = useSelector((state: RootState) => state.game.loser);
  useEffect(() => {
    onValue(winnerRef, async (winnerSnapshot) => {
      console.log({winner})
      console.log({loser})

      if (winner !== '') {
        const teamWinnerRef = ref(database, `rooms/${roomId}/${winner}/`);
        get(teamWinnerRef).then(async (winnerMemberSnapshot) => {
          if (winnerMemberSnapshot.exists()) {
            const winnerMember = winnerMemberSnapshot.val();
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
            setPlayerIdArray(getPlayerIds(winnerMember));
            // console.log(playerIdArray);
          }
        });
      // if (winnerSnapshot.exists()) {
      //   const teamWinner = winnerSnapshot.val();
      //   const teamWinnerRef = ref(database, `rooms/${roomId}/${teamWinner}/`);
      //   get(teamWinnerRef).then(async (winnerMemberSnapshot) => {
      //     if (winnerMemberSnapshot.exists()) {
      //       const winnerMember = winnerMemberSnapshot.val();
      //       const getPlayerIds = (obj: TeamInfo): string[] => {
      //         let playerIds: string[] = [];
      //         for (const key in obj) {
      //           if (obj[key].hasOwnProperty('playerId')) {
      //             playerIds.push(obj[key].playerId);
      //           } else {
      //             playerIds = playerIds.concat(getPlayerIds(obj[key]));
      //           }
      //         }
      //         return playerIds;
      //       };
      //       setPlayerIdArray(getPlayerIds(winnerMember));
      //       console.log(playerIdArray);
      //     }
      //   });
      }
    });
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
