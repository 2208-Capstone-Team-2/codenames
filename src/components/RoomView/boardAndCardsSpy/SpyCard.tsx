import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { CardObj } from '../../../utils/interfaces';
import { ref, onValue } from 'firebase/database';
import { useEffect } from 'react';
import { database } from '../../../utils/firebase';
import { revealCard } from '../../../store/wordsInGameSlice';
import ReactCardFlip from 'react-card-flip';
import allCardStyles from './spyCardStyles';
import { useMediaQuery } from '@mui/material';

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

  // Decide on the styling based on these comparisons
  let cardStyles: any = {}; // Todo: give this an actual interface
  if (teamId === team1Id) cardStyles = allCardStyles.redCardStyles;
  if (teamId === team2Id) cardStyles = allCardStyles.blueCardStyles;
  if (teamId === bystanderTeamId) cardStyles = allCardStyles.beigeCardStyles;
  if (teamId === assassinTeamId) cardStyles = allCardStyles.blackCardStyles;

  // Use mediaquery to adjust card height and width - 600px is our 'small screen' breakpoint
  const isSmallScreen = useMediaQuery('(max-width:600px');
  if (isSmallScreen && teamId) {
    // What you want for <600px screen styling on card front and back props goes here.
    cardStyles.front.width = '48pt';
    cardStyles.front.height = '38.4pt';
    cardStyles.back.width = '48pt';
    cardStyles.back.height = '38.4pt';
  }
  if (!isSmallScreen && teamId) {
    // What you want for >600px screen styling on card front and back props goes here.
    cardStyles.front.width = '120pt';
    cardStyles.front.height = '96pt';
    cardStyles.back.width = '120pt';
    cardStyles.back.height = '96pt';
  }

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
