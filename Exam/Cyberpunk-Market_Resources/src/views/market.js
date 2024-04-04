import { getAllCyberware } from '../data/cyberware.js';
import { html, render } from '../lib.js';

const marketTemplate = (cyberware) => html`
   <h3 class="heading">Market</h3>
     <section id="dashboard">
       ${cyberware.length ? cyberware.map(cyberwareTemplate) : html`<h3 class="empty">No Items Yet</h3>`}
     </section>
     `;

const cyberwareTemplate = (item) => html`
   <div class="item">
        <img src="${item.imageUrl}" alt="example1" />
        <h3 class="model">${item.item}</h3>
        <div class="item-info">
            <p class="price">Price: ${item.price}</p>
            <p class="availability">
                ${item.availability}
            </p>
            <!-- провери за спейса!!! -->
            <p class="type">Type: ${item.type}</p>
        </div>
        <a class="details-btn" href="/market/${item._id}">Uncover More</a>
   </div>
   `;

export async function showMarket() {
    const cyberware = await getAllCyberware();
    render(marketTemplate(cyberware));
}