const list = document.querySelector('#commits')

function loadCommits() {
const username = document.querySelector('#username').value;
const repository = document.querySelector('#repo').value;

const url = `https://api.github.com/repos/${username}/${repository}/commits`;

fetch(url)
    .then(onHeaders)
    .then(displayCommits)
    .catch(onError);
}

function onHeaders(response) {
    if (!response.ok) {
      throw "Error";
    }
  
    return response.json();
  }

  function createListItem({ commit: { author: {name}, message } }){
    const item = document.createElement('li');
    item.textContent = `${name}: ${message}`

    return item;
  }

  function displayCommits(data) {
    list.replaceChildren(...data.map(createListItem));
  }

  function onError(error){
    list.innerHTML = `<li>Error: 404 Not Found</li>`
  }