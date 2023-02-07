import React from 'react';

const GameRules = () => {
    return (
        <div>
            <ul>
                <li>
                    Each team must have one spymaster and at least one operatives.
                </li>
                <li>
                    The spymaster should give an appropriate hint to their operative(s) to help them guess
                    the words that belong to their team.
                </li>
                <li>
                    If the operative clicks a bystander or the other teams card, the turn ends.
                </li>
                <li>
                    If an operative chooses a card that belongs to the other team, the other team
                    the operatives turn ends and the other team is given the point.
                </li>
                <li>
                    If the operative clicks the Assassin card, the other team wins, so becareful with
                    your hints!
                </li>
                <li>
                    First team to select all their cards wins!
                </li>
            </ul>
        </div>
    );
};

export default GameRules;