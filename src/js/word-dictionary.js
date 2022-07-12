import {postData, getData} from './db.js';

const logoTextElement = document.querySelector('.logo-text');
const inputTextElement = document.querySelector('input.input-text');
const inputTextButton = document.querySelector('.btn-input-text');
const outputTextElement = document.querySelector('.output-text');
const chosenWordsElement = document.querySelector('.chosen-words');
let outputWordElement = Array.from(document.querySelectorAll('.output-words'));
const saveButton = document.querySelector('.btn-save');
const firstRowElement = document.querySelector('.row-1');
const secondRowElement = document.querySelector('.row-2');
const wordHistoryButton = document.querySelector('.btn-history-words');
const wordHistoryRowElement = document.querySelector('.row-3--history');

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

        const chosenWordsTemplate =
          `<span class="chosen-word">${word.textContent}</span>
          <span class="chosen-word--translate">translate</span>`;

        chosenWordsElement.innerHTML += chosenWordsTemplate;
        this.allSelectedWords.push(word.textContent);

        this.wordTranslation();

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

  wordTranslation () {
    const chosenWord = Array.from(document.querySelectorAll('.chosen-word'));
    const chosenWordTranslate = document.querySelectorAll('.chosen-word--translate');

    chosenWord.forEach((word, index) => {
      word.addEventListener('click', () => {
        word.style.display = 'none';
        chosenWordTranslate[index].style.display = 'block';

        chosenWordTranslate[index].addEventListener('click', () => {
          word.style.display = 'block';
          chosenWordTranslate[index].style.display = 'none';
        });
      });
    });
  }
  
  clear () {
    inputTextElement.value = '';
    outputTextElement.innerHTML = '';
    chosenWordsElement.innerHTML = '';
    this.allSelectedWords = [];
    this.selectedWordsObj = [];
  }
}
