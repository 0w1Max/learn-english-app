const wordHistoryElement = document.querySelector('.word-history');

function postData (data) {
  fetch('https://learnenglish-app-default-rtdb.firebaseio.com/words.json', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(response => console.log(response))
}

function getData () {
  fetch('https://learnenglish-app-default-rtdb.firebaseio.com/words.json')
    .then(response => response.json())
    .then(json => Object.values(json))
    .then(words => {
      words.forEach(arr =>
        arr.forEach((word) =>
          wordHistoryElement.innerHTML +=
            `<div class="row-history">
            <h4>Слово</h4>
            <span class="chosen-word">${word.word}</span>
            <h4>Перевод</h4>
            <span class="translate-word">${word.translate}</span>
            </div>`
      ))
    })
}

export {postData, getData}
