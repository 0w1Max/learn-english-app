const modalOpenButton = document.querySelector('.modal-open');
const modalCloseButton = document.querySelector('.modal-close');
const modalWindowElement = document.querySelector('.modal-window');

export default function changeModalWindow () {
  modalOpenButton.addEventListener('click', (evt) => {
      evt.preventDefault();

      modalWindowElement.style.display = 'flex';
      console.log('Click');
    });

    modalCloseButton.addEventListener('click', (evt) => {
      evt.preventDefault();

      modalWindowElement.style.display = 'none';
      console.log('Click');
    });

    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        modalWindowElement.style.display = 'none';
        console.log(evt.key);
      }
    });
}
