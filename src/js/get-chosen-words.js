import {getData} from './db.js';

const logoTextElement = document.querySelector('.logo-text');
const firstRowElement = document.querySelector('.row-1');
const secondRowElement = document.querySelector('.row-2');
const wordHistoryRowElement = document.querySelector('.row-3--history');
const wordHistoryButton = document.querySelector('.btn-history-words');
const wordHistoryElement = document.querySelector('.word-history');

export default class GetChosenWords {
  getWords () {
    wordHistoryButton.addEventListener('click', this.wordHistoryHandler());

    logoTextElement.addEventListener('click' , this.logoTextHandler());
  }

  wordHistoryHandler () {
    return function (evt) {
      evt.preventDefault();

      firstRowElement.style.display = 'none';
      secondRowElement.style.display = 'none';
      wordHistoryRowElement.style.display = 'flex';

      wordHistoryElement.innerHTML = '';
      getData();
    }
  }

  logoTextHandler () {
    return function (evt) {
      evt.preventDefault();

      wordHistoryElement.innerHTML = '';
      firstRowElement.style.display = 'flex';
      secondRowElement.style.display = 'flex';
      wordHistoryRowElement.style.display = 'none';
    }
  }
}
