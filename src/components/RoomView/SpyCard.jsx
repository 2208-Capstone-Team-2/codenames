import React from 'react';
import './card.css';
import { useSelector } from 'react-redux';

const SpyCard = ({ word, teamId }) => {
  // spies have a different view of the card depending on its value, and also whether or not it's been revealed to everyone.
  // we'll likely use images or something for css but this was helpful for testing purposes
  const team1Id = useSelector((state) => state.teamOne.team1Id);
  const team2Id = useSelector((state) => state.teamTwo.team2Id);
  const assassinTeamId = useSelector((state) => state.spymasterWords.assassinTeamId);
  const bystanderTeamId = useSelector((state) => state.spymasterWords.bystanderTeamId);

  return (
    <>
      {!word.isVisibleToAll && teamId === team1Id && <button className="redStyle">{word.word}</button>}
      {!word.isVisibleToAll && teamId === team2Id && <button className="blueStyle">{word.word}</button>}
      {!word.isVisibleToAll && teamId === bystanderTeamId && <button className="beigeStyle">{word.word}</button>}
      {!word.isVisibleToAll && teamId === assassinTeamId && <button className="blackStyle">{word.word}</button>}

      {word.isVisibleToAll && teamId === team1Id && <button className="redRevealed">{word.word}</button>}
      {word.isVisibleToAll && teamId === team2Id && <button className="blueRevealed">{word.word}</button>}
      {word.isVisibleToAll && teamId === bystanderTeamId && <button className="beigeRevealed">{word.word}</button>}
      {word.isVisibleToAll && teamId === assassinTeamId && <button className="blackRevealed">{word.word}</button>}
    </>
  );
};

export default SpyCard;
