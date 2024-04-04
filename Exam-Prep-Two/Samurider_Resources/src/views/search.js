import { get } from '../data/request.js';
import { render, html, page } from '../lib.js';
import { createSubmitHandler } from '../util.js';


const searchTemplate = (onSearch, result) => html`
  <section id="search">
    <div class="form">
      <h4>Search</h4>
      <form class="search-form" @submit=${onSearch}>
        <input type="text" name="search" id="search-input" />
        <button class="button-list">Search</button>
      </form>
    </div>
    <h4 id="result-heading">Results:</h4>
 <div class="search-result">
    ${result ? result.map( r => html`
    <div class="motorcycle">
        <img src="${r.imageUrl}" alt="example1" />
        <h3 class="model">${r.model}</h3>
        <a class="details-btn" href="/dashboard/${r._id}">More Info</a>
      </div>`)
        : html`
      <h2 class="no-avaliable">No result.</h2>`}
      
    </div>
   </section>
   `;

export function showSearch() {
    render(searchTemplate(createSubmitHandler(onSearch)));
}

async function search(query){
    return await get(`/data/motorcycles?where=model%20LIKE%20%22${query}%22`);
}

async function onSearch(data, form){
    if(!data.search) {
        return alert('Empty field!');
    }
    const result = await search(data.search);
    render(searchTemplate(result));
}