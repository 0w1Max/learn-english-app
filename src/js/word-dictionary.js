import {postData, getData} from './db.js';

const logoTextElement = document.querySelector('.logo-text');
const inputTextElement = document.querySelector('input.input-text');
const inputTextButton = document.querySelector('.btn-input-text');
const outputTextElement = document.querySelector('.output-text');
const chosenWordsElement = document.querySelector('.chosen-words');
let outputWordElement = Array.from(document.querySelectorAll('.output-word'));
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
  translate = '';
  translateArray = [];

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
    this.wordTranslation();
  }

  updateElement () {
    const element = Array.from(document.querySelectorAll('.output-word'));

    if (outputWordElement.length !== element.length) {
      return outputWordElement = Array.from(document.querySelectorAll('.output-word'))  
    }
  }

  outputChosenWords () {
    this.updateElement();

    outputWordElement.forEach((word, index) => {
      word.addEventListener('click', () => {

        // Логика для ввода перевода слова в input
        const modalWindow = document.querySelector('.modal-window');
        const translateInput = document.querySelector('.translate-text');
        const translateButton = document.querySelector('.btn-translate-ok');
        modalWindow.style.display = 'flex';

        word.classList.add('selected');
        chosenWordsElement.querySelector('h3').textContent = '';
        
        translateButton.addEventListener('click', () => {
          console.log('Click');
          this.allSelectedWords.push(word.textContent);

          const chosenWordsTemplate =
            `<span class="chosen-word">${word.textContent}</span>
            <span class="chosen-word--translate">${this.translate}</span>`;

          chosenWordsElement.innerHTML += chosenWordsTemplate;

          this.showTranslation();

          console.log('index:' + index + ', Array: ' + this.allSelectedWords);
        }, {once: true});
      });
    });
  }

  saveObj () {
    saveButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      
      this.allSelectedWords.forEach((item, index) => {
        this.selectedWordsObj.push({index: this.index, word: item, translate: this.translateArray[index]})
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
    outputTextElement.innerHTML +=
      `<div class="modal-window">
        <input type="text" placeholder="Введите перевод" class="translate-text">
        <button type="submit" class="btn-translate-ok">OK</button>
      </div>`;

    const modalWindow = document.querySelector('.modal-window');
    const translateInput = document.querySelector('.translate-text');
    const translateButton = document.querySelector('.btn-translate-ok');

    translateButton.addEventListener('click', (evt) => {
      evt.preventDefault();

      this.translate = translateInput.value;
      this.translateArray.push(this.translate);
      console.log(this.translateArray);

      translateInput.value = '';
      modalWindow.style.display = 'none';
    });
  }

  showTranslation () {
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
