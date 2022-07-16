import AddWordTranslation from './add-word-translation.js';

const outputTextElement = document.querySelector('.output-text');
const chosenWordsElement = document.querySelector('.chosen-words');
let outputWordElement = Array.from(document.querySelectorAll('.output-word'));

const addWordTranslation = new AddWordTranslation();
let allSelectedWords = [];
let translateArray = [];

export default class AddChosenWords {
  get selectedWordsArray () {
    return allSelectedWords;
  }

  get translateArray () {
    return translateArray;
  }

  set selectedWordsArray (value) {
    allSelectedWords = value;
  }

  set translateArray (value) {
    translateArray = value;
  }

  renderChosenWords () {
    this.updateElement();

    outputWordElement.forEach((word) => {
      word.addEventListener('click',
        this.renderChosenWordsHandler(word));
    })
  }

  updateElement () {
    const element = Array.from(document.querySelectorAll('.output-word'));

    if (outputWordElement.length !== element.length) {
      return outputWordElement = Array.from(document.querySelectorAll('.output-word'))  
    }
  }

  renderChosenWordsHandler (word) {
    return function () {
      const translateForm = document.querySelector('.translate-form');
      const translateButton = document.querySelector('.btn-translate-ok');
      outputTextElement.style.display = 'none';
      translateForm.style.display = 'flex';

      word.classList.add('selected');
      chosenWordsElement.querySelector('h3').textContent = '';

      translateButton.addEventListener('click', () => {
        const translateInput = document.querySelector('.translate-text');

        allSelectedWords.push(word.textContent);
        console.log('allSelectedWords - '+ allSelectedWords);
        translateArray.push(translateInput.value);
        console.log('translateArray - '+ translateArray);

        const chosenWordsTemplate =
          `<span class="chosen-word">${word.textContent}</span>
          <span class="chosen-word--translate">${translateInput.value}</span>`;

        chosenWordsElement.innerHTML += chosenWordsTemplate;

        translateInput.value = '';

        addWordTranslation.showTranslation();
      }, {once: true});
    }
  }
}
