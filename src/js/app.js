import WordDictionary from './word-dictionary.js';
import SaveChosenWords from './save-chosen-words.js';
import GetChosenWords from './get-chosen-words.js';

const wordDictionary = new WordDictionary();
const saveChosenWords = new SaveChosenWords();
const getChosenWords = new GetChosenWords();

wordDictionary.splitText();
saveChosenWords.saveObj();
getChosenWords.getWords();
