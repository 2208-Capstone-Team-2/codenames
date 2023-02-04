import React from 'react';
import './card.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CardObj } from '../../utils/interfaces';



interface WrapperProps {
  word: CardObj;
  teamId: React.ReactNode;
}

const SpyCard = ({ word, teamId }: WrapperProps) => {
  // spies have a different view of the card depending on its value, and also whether or not it's been revealed to everyone.
  // we'll likely use images or something for css but this was helpful for testing purposes
  const team1Id = useSelector((state: RootState) => state.teamOne.team1Id);
  const team2Id = useSelector((state: RootState ) => state.teamTwo.team2Id);
  const assassinTeamId = useSelector((state: RootState) => state.assassinAndBystander.assassinTeamId);
  const bystanderTeamId = useSelector((state: RootState) => state.assassinAndBystander.bystanderTeamId);

  if (!word) return <></>
  return (
    <>
      {!word.isVisibleToAll && teamId === team1Id && <button className="redStyle">{word.wordString}</button>}
      {!word.isVisibleToAll && teamId === team2Id && <button className="blueStyle">{word.wordString}</button>}
      {!word.isVisibleToAll && teamId === bystanderTeamId && <button className="beigeStyle">{word.wordString}</button>}
      {!word.isVisibleToAll && teamId === assassinTeamId && <button className="blackStyle">{word.wordString}</button>}

      {word.isVisibleToAll && teamId === team1Id && <button className="redRevealed">{word.wordString}</button>}
      {word.isVisibleToAll && teamId === team2Id && <button className="blueRevealed">{word.wordString}</button>}
      {word.isVisibleToAll && teamId === bystanderTeamId && (
        <button className="beigeRevealed">{word.wordString}</button>
      )}
      {word.isVisibleToAll && teamId === assassinTeamId && <button className="blackRevealed">{word.wordString}</button>}
    </>
  );
};

export default SpyCard;
