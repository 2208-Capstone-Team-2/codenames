// typescripted by rose!
import duetPackString from '../wordpacks/duetPack';
import data from '../index';
const Word = data.Word;
const Wordpack = data.Wordpack;

const seedDuetWordpack = async () => {
  // split the string on 'return' characters
  const wordArray = duetPackString.split('\n');

  // First, create the Wordpack model
  const duetPack = await (Wordpack as any).create({ name: 'duet' });

  // Create the 400 words:
  // Make array of promises
  const Promises = wordArray.map((str) => {
    return (Word as any).create({
      word: str,
    });
  });

  // Now await all those promises to seed
  const wordModels = await Promise.all(Promises);

  // Create association between the pack and all the words.
  // Using magic method.
  duetPack.setWords(wordModels);

  console.log('DONE SEEDING DUET WORDPACK...');
};

export default seedDuetWordpack;
