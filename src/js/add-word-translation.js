const outputTextElement = document.querySelector('.output-text');

export default class AddWordTranslation {
  translate = '';
  translateArray = [];
  
  add () {
    const translateFormElement = document.querySelector('.translate-form');
    const inputTranslateForm = document.querySelector('.input-translate-form');

    inputTranslateForm.innerHTML =
      `<input type="text" placeholder="Введите перевод" class="translate-text">
      <button type="submit" class="btn-translate-ok">OK</button>`;

    const translateInput = document.querySelector('.translate-text');
    const translateButton = document.querySelector('.btn-translate-ok');

    translateButton.addEventListener('click',
      this.wordTranslationHandler(
        translateFormElement,
        translateInput,
        this.translate,
        this.translateArray
      ));
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

  wordTranslationHandler (form, input, translate, array) {
    return function (evt) {
      evt.preventDefault();

      translate = input.value;
      console.log('Translate - ' + translate);
      array.push(translate);
      console.log(array);

      form.style.display = 'none';
      outputTextElement.style.display = 'flex';
    }
  }
}
