import React from 'react';
import './card.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { CardObj } from '../../utils/interfaces';
import { ref, onValue } from 'firebase/database';
import { useEffect } from 'react';
import { database } from '../../utils/firebase';
import { revealCard } from '../../store/wordsInGameSlice';
import ReactCardFlip from 'react-card-flip';
import allCardStyles from './spyCardStyles';

interface WrapperProps {
  word: CardObj;
  teamId: React.ReactNode;
}

const SpyCard = ({ word, teamId }: WrapperProps) => {
  const dispatch = useDispatch();
  // spies have a different view of the card depending on its value, and also whether or not it's been revealed to everyone.
  // we'll likely use images or something for css but this was helpful for testing purposes
  const { roomId } = useSelector((state: RootState) => state.player);
  // get ids from redux to compare the props teamId with
  const team1Id = useSelector((state: RootState) => state.teamOne.team1Id);
  const team2Id = useSelector((state: RootState) => state.teamTwo.team2Id);
  const assassinTeamId = useSelector((state: RootState) => state.assassinAndBystander.assassinTeamId);
  const bystanderTeamId = useSelector((state: RootState) => state.assassinAndBystander.bystanderTeamId);
  let singleCardRef = ref(database, `rooms/${roomId}/gameboard/${word.id}`);

  useEffect(() => {
    onValue(singleCardRef, (snapshot) => {
      if (snapshot.exists()) {
        let revealed = snapshot.val().isVisibleToAll;
        let wordId = snapshot.val().id;
        let teamId = snapshot.val().teamId;
        if (revealed) {
          dispatch(revealCard({ wordId, teamId }));
        }
      }
    });
  }, []);

  // decide on the styling based on these comparisons
  let cardStyles = {};
  if (teamId === team1Id) cardStyles = allCardStyles.redCardStyles;
  if (teamId === team2Id) cardStyles = allCardStyles.blueCardStyles;
  if (teamId === bystanderTeamId) cardStyles = allCardStyles.beigeCardStyles;
  if (teamId === assassinTeamId) cardStyles = allCardStyles.blackCardStyles;

  if (!word) return <></>;
  if (!teamId) return <></>; // this stops a dispatch to the screen that looks weird

  return (
    <div>
      <ReactCardFlip isFlipped={word.isVisibleToAll} cardStyles={cardStyles}>
        <div> {word.wordString} </div>
        <div> back of card!!</div>
      </ReactCardFlip>
    </div>
  );
};

export default SpyCard;
