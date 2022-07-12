import {logoTextElement, inputTextElement, inputTextButton, outputTextElement, chosenWordsElement,
  outputWordElement, saveButton, firstRowElement, secondRowElement, wordHistoryButton, wordHistoryRowElement}
  from './selectors.js';
import {postData, getData} from './db.js';
import changeModalWindow from './modal-window.js';

export default class WordDictionary {
  index = 1;
  allArrays = [];
  allSelectedWords = [];
  selectedWordsObj = [];

  splitText () {
    inputTextButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      
      if (inputTextElement.value) {
        const textArr = inputTextElement.value.split(' ');

        this.pushContent(textArr);
        this.allArrays.push(textArr);
      } else {
        inputTextElement.placeholder = 'Вы не ввели текст!';
      }

      this.outputChosenWords();
    });
  }

  pushContent (arr) {
    const outputText = arr.map((word) =>
      `<span class="output-word">${word}</span>`
    ).join('');

    outputTextElement.innerHTML = outputText;
  }

  updateElement () {
    const element = Array.from(document.querySelectorAll('.output-word'));

    if (outputWordElement.length !== element.length) {
      return outputWordElement = Array.from(document.querySelectorAll('.output-word'))  
    }
  }

  outputChosenWords () {
    this.updateElement();

    outputWordElement.map((word) => {
      word.addEventListener('click', () => {
        word.classList.add('selected');
        chosenWordsElement.querySelector('h3').textContent = '';
        chosenWordsElement.innerHTML += `<span class="chosen-word">${word.textContent}</span>`;
        this.allSelectedWords.push(word.textContent);

        console.log(this.allSelectedWords);
      });
    });
  }

  saveObj () {
    saveButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      
      this.allSelectedWords.forEach((item) => {
        this.selectedWordsObj.push({index: this.index, word: item})
        this.index++;
      });

      postData(this.selectedWordsObj);
      this.clear();
    });
  }

  getWords () {
    wordHistoryButton.addEventListener('click', (evt) => {
      evt.preventDefault();

      firstRowElement.style.display = 'none';
      secondRowElement.style.display = 'none';
      wordHistoryRowElement.style.display = 'flex';

      getData();
    });

    logoTextElement.addEventListener('click' , (evt) => {
      evt.preventDefault();

      firstRowElement.style.display = 'flex';
      secondRowElement.style.display = 'flex';
      wordHistoryRowElement.style.display = 'none';
    });
  }

  cliclkModal () {
    changeModalWindow();
  }
  
  clear () {
    inputTextElement.value = '';
    outputTextElement.innerHTML = '';
    chosenWordsElement.innerHTML = '';
    this.allSelectedWords = [];
    this.selectedWordsObj = [];
  }
}
