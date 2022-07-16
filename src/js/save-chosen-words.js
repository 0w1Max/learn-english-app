import {postData} from './db.js';
import AddChosenWords from './add-chosen-words.js';

const inputTextElement = document.querySelector('input.input-text');
const outputTextElement = document.querySelector('.output-text');
const chosenWordsElement = document.querySelector('.chosen-words');
const saveButton = document.querySelector('.btn-save');

const addChosenWords = new AddChosenWords();

export default class SaveChosenWords {
  index = 1;
  selectedWordsObj = [];

  saveObj () {
    saveButton.addEventListener('click',
      this.saveObjHandler(this.index, this.selectedWordsObj, this.clearElements));
  }

  saveObjHandler (indexObj, selectedWordsObj, clearElements) {
    return function (evt) {
      evt.preventDefault();

      const allSelectedWords = addChosenWords.selectedWordsArray;
      const translateArray = addChosenWords.translateArray;
      
      allSelectedWords.forEach((item, index) => {
        selectedWordsObj.push({index: indexObj, word: item, translate: translateArray[index]})
        indexObj++;
      });

      postData(selectedWordsObj);
      clearElements(selectedWordsObj);
    }
  }

  clearElements (selectedWordsObj) {
    inputTextElement.value = '';
    outputTextElement.innerHTML = '';
    chosenWordsElement.innerHTML = '';
    addChosenWords.selectedWordsArray = [];
    console.log('selectedWordsArray ' + addChosenWords.selectedWordsArray);
    addChosenWords.translateArray = [];
    console.log('translateArray ' + addChosenWords.translateArray)
    selectedWordsObj = [];
    console.log('selectedWordsObj ' + selectedWordsObj);
  }
}
