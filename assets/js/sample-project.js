// Sample Project - API Ninjas form (Dictionary + Dad Jokes)
// Ported from the Phase 4 work. Vanilla JS, fetch with the X-Api-Key header.

const apiQuotes = document.getElementById('apiQuotes');   // Dictionary checkbox
const apiJokes = document.getElementById('apiJokes');     // Dad Jokes checkbox
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const responseArea = document.getElementById('responseArea');

// NOTE: this key is visible to anyone who views the page source.
// Fine for the assessment; rotate it on api-ninjas.com afterwards.
const API_KEY = '13dDV1VZnU4anWkZjb1HbrLyRpvuAnn8lm18AP3p';

// Clear the input and the response box.
function clearResponse() {
  userInput.value = '';
  responseArea.innerHTML = '<p>Response will appear here.</p>';
}

// The two checkboxes behave like a pick-one toggle.
apiQuotes.addEventListener('change', () => {
  if (apiQuotes.checked) {
    apiJokes.checked = false;
    userInput.placeholder = 'Enter a word to define (e.g. ninja)';
  }
  clearResponse();
});

apiJokes.addEventListener('change', () => {
  if (apiJokes.checked) {
    apiQuotes.checked = false;
    userInput.placeholder = 'Click Send for a dad joke';
  }
  clearResponse();
});

// On Send: build the right URL, fetch, show the result.
sendBtn.addEventListener('click', (event) => {
  event.preventDefault();
  responseArea.innerHTML = '<p>Loading...</p>';

  let url = '';
  if (apiQuotes.checked) {
    if (!userInput.value.trim()) {
      responseArea.innerHTML = '<p>Please enter a word first.</p>';
      return;
    }
    url = `https://api.api-ninjas.com/v1/dictionary?word=${userInput.value}`;
  } else if (apiJokes.checked) {
    url = 'https://api.api-ninjas.com/v1/dadjokes';
  } else {
    responseArea.innerHTML = '<p>Please select an API first.</p>';
    return;
  }

  let ok;
  fetch(url, { headers: { 'X-Api-Key': API_KEY } })
    .then((res) => {
      ok = res.ok;
      return res.json();
    })
    .then((data) => {
      if (!ok) {
        responseArea.innerHTML = `<p>Error: ${data.error || 'Request failed.'}</p>`;
        return;
      }
      if (apiQuotes.checked) {
        if (!data.valid) {
          responseArea.innerHTML = `<p>"${data.word}" is not in the dictionary.</p>`;
        } else {
          responseArea.innerHTML = `<p><strong>${data.word}</strong></p><p>${data.definition}</p>`;
        }
      } else {
        responseArea.innerHTML = `<p>${data[0].joke}</p>`;
      }
    })
    .catch(() => {
      responseArea.innerHTML = '<p>Network error. Try again.</p>';
    });
});