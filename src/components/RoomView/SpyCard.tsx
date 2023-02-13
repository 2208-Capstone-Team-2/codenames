import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CardObj } from '../../utils/interfaces';
import allCardStyles from './spyCardStyles';
import ReactCardFlip from 'react-card-flip';

interface WrapperProps {
  word: CardObj;
  teamId: React.ReactNode;
}

const SpyCard = ({ word, teamId }: WrapperProps) => {
  // spies have a different view of the card depending on its value, and also whether or not it's been revealed to everyone.
  // we'll likely use images or something for css but this was helpful for testing purposes
  const team1Id = useSelector((state: RootState) => state.teamOne.team1Id);
  const team2Id = useSelector((state: RootState) => state.teamTwo.team2Id);
  const assassinTeamId = useSelector((state: RootState) => state.assassinAndBystander.assassinTeamId);
  const bystanderTeamId = useSelector((state: RootState) => state.assassinAndBystander.bystanderTeamId);

  let cardStyles = {};
  if (teamId === team1Id) {
    console.log('giving red revealed styles');
    cardStyles = allCardStyles.redCardStyles;
  }
  if (teamId === team2Id) {
    console.log('giving blue revealed styles');
    cardStyles = allCardStyles.blueCardStyles;
  }
  if (teamId === bystanderTeamId) {
    console.log('giving beige revealed styles');
    cardStyles = allCardStyles.beigeCardStyles;
  }
  if (teamId === assassinTeamId) {
    console.log('giving black revealed styles');
    cardStyles = allCardStyles.blackCardStyles;
  }

  if (!word) return <></>;
  return (
    <div>
      <ReactCardFlip isFlipped={word.isVisibleToAll} flipDirection="vertical" cardStyles={cardStyles}>
        <div> {word.wordString} </div>
        <div> back of card!!</div>
      </ReactCardFlip>
    </div>
  );
};

export default SpyCard;
