import AddWordTranslation from './add-word-translation.js';
import AddChosenWords from './add-chosen-words.js';

const inputTextElement = document.querySelector('input.input-text');
const inputTextButton = document.querySelector('.btn-input-text');
const outputTextElement = document.querySelector('.output-text');

const addWordTranslation = new AddWordTranslation();
const addChosenWords = new AddChosenWords();

export default class WordDictionary {
  splitText () {
    inputTextButton.addEventListener('click', this.splitTextHandler(this.pushContent));
  }

  pushContent (arr) {
    const outputText = arr.map((word) =>
      `<span class="output-word">${word}</span>`
    ).join('');

    outputTextElement.innerHTML = outputText;
    addWordTranslation.add();
  }

  splitTextHandler (push) {
    return function (evt) {
      evt.preventDefault();
        
      if (inputTextElement.value) {
        const textArr = inputTextElement.value.split(/\W/g);

        for (let i = 0; i < textArr.length; i++) {
          if (textArr[i] === '') {
            textArr.splice(i, 1);
          }
        }

        console.log(textArr);
        push(textArr);
      } else {
        inputTextElement.placeholder = 'Вы не ввели текст!';
      }

      addChosenWords.renderChosenWords();
    }
  }
}
