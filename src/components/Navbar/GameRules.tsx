import React from 'react';
import './gameRules.css'
const GameRules = () => {
  return (
    <div className="gameRules">
      <ul>
        <li>Each team must have one spymaster and at least one operative.</li>
        <li>
          The spymaster should give an appropriate hint to their operative(s) to help them guess the words that belong
          to their team.
        </li>
        <li>If the operative clicks a bystander or the other teams card, the turn ends.</li>
        <li>
          If an operative chooses a card that belongs to the other team, their turn ends and the
          other team's card is revealed.
        </li>
        <li>If the operative clicks the Assassin card, the other team wins, so be careful with your hints!</li>
        <li>First team to reveal all their cards wins!</li>
      </ul>
    </div>
  );
};

export default GameRules;
