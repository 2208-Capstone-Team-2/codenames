import React, { useState } from 'react';
import './clue.css';

// You can use this to see how it would look without needing
// all the logic behind it!
const ClueTestingDesign = () => {
  // useStates:
  const [clueString, setClueString] = useState<string>('');
  const [clueNumber, setClueNumber] = useState<number | null>(null);

  const handleClueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //trim any extra space so users cannot submit "   clue" or '    ',
    //then convert all to uppercase to avoid case sensitive issue
    setClueString(event.target.value.trim().toUpperCase());
  };

  //please also help me rephrase all these alert messages
  const handleNumberChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setClueNumber(Number(event.target.value));
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const imRedSpy = false;
  return (
    <div>
      <form className="clue-form">
        <input
          className={imRedSpy ? 'clue-input-text dark-red-color' : 'clue-input-text dark-blue-color'}
          type="text"
          placeholder="Type your clue here..."
          onChange={(e) => {
            handleClueChange(e);
          }}
        />
        <select
          className={imRedSpy ? 'clue-input-number dark-red-color' : 'clue-input-number dark-blue-color'}
          onChange={(e) => {
            handleNumberChange(e);
          }}
        >
          <option>#</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
        </select>
        <button
          className={
            imRedSpy ? 'clue-submit-button dark-red-background-color' : 'clue-submit-button dark-blue-background-color'
          }
          onClick={handleSubmit}
        >
          Submit Clue
        </button>
      </form>
    </div>
  );
};

export default ClueTestingDesign;
