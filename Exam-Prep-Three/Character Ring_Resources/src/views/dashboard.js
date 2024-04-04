import { getAllChars } from '../data/characters.js';
import { html, render } from '../lib.js';

const dashboardView = (characters) => html`
    <h2>Characters</h2>
    <section id="characters">
        ${characters.length ? characters.map(charTemplate) : html`<h2>No added Heroes yet.</h2>`}
    </section>
    `;

const charTemplate = (char) => html`   
    <div class="character">
            <img src="${char.imageUrl}" alt="example1" />
            <div class="hero-info">
                <h3 class="category">${char.category}</h3>
                <p class="description">${char.description}</p>
                <a class="details-btn" href="/dashboard/${char._id}">More Info</a>
            </div>

    </div>`;


export async function showDashboard(){
    const characters = await getAllChars();
    render(dashboardView(characters));
}