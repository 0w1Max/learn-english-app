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

const wordHistoryElement = document.querySelector('.word-history');

function getData () {
  fetch('https://learnenglish-app-default-rtdb.firebaseio.com/words.json')
    .then(response => response.json())
    .then(json => Object.values(json))
    .then(words => {
      words.forEach(arr =>
        arr.forEach((word) =>
          wordHistoryElement.innerHTML += `<span class="chosen-word">${word.word}</span>`
      ))
    })
}

export {postData, getData}
