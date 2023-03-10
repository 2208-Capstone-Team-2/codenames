import data from '../index';
const Word = data.Word;
const Wordpack = data.Wordpack;
import defaultPackString from '../wordpacks/defaultPack';

const seedDefaultWordpack = async () => {
  const wordArray: string[] = defaultPackString.split('\n'); // split the string on 'return' characters

  // First, create the Wordpack model
  const defaultPack = await (Wordpack as any).create({
    name: 'default',
  });

  // Create the 400 wordbanks.

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
  defaultPack.setWords(wordModels);

  console.log('DONE SEEDING DEFAULT WORDPACK...');
};

export default seedDefaultWordpack;
