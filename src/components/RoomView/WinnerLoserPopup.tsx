import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setRoomId } from '../../store/playerSlice';
import { RootState } from '../../store';

const Winner: React.FC = () => {
  const { roomId } = useParams();
  setRoomId(roomId);
  const { teamId } = useSelector((state: RootState) => state.player);
  const { status, winner, loser } = useSelector((state: RootState) => state.game);
  const { team1Id } = useSelector((state: RootState) => state.teamOne);
  const { team2Id } = useSelector((state: RootState) => state.teamTwo);
  const [winnerPopup, setWinnerPopup] = useState<boolean>(false);
  const [loserPopup, setLoserPopup] = useState<boolean>(false);

  const playerWon = (winner === 'team-1' && teamId === team1Id) || (winner === 'team-2' && teamId === team2Id)
  const playerLost = (winner === 'team-1' && teamId !== team1Id) || (winner === 'team-2' && teamId !== team2Id)

  useEffect(() => {
    if (winner !== '' && loser !== '') {
      if (playerWon) {
        setWinnerPopup(true);
      }
      if (playerLost) {
        setLoserPopup(true);
      }
    } 
  }, [winner, loser, teamId]);

  return (
    <>
      {winnerPopup && status === 'complete' && (
        <div className="winner">
          <h1 className="winnerItem">Congratulations! Your team won! Play again?</h1>
          <button className="closeButton" onClick={() => setWinnerPopup(false)}>
            X
          </button>
        </div>
      )}
      {loserPopup && status === 'complete' && (
        <div className="loser">
          <h1 className="loserItem">Your team lost! Play again!</h1>
          <button className="closeButton" onClick={() => setLoserPopup(false)}>
            X
          </button>
        </div>
      )}
    </>
  );
};
export default Winner;
