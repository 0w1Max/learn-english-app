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
const wordHistoryElement = document.querySelector('.word-history');

export {logoTextElement, inputTextElement, inputTextButton, outputTextElement, chosenWordsElement,
    outputWordElement, saveButton, firstRowElement, secondRowElement, wordHistoryButton, wordHistoryRowElement,
    wordHistoryElement}
