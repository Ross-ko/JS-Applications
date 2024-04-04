import { deleteMotorcycle, getMotorcycleById } from '../data/motorcycles.js';
import { html, render, page } from '../lib.js';
import { getUserData } from '../util.js';


const detailsTemplate = (data, hasUser, isOwner, onDelete) => html`
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src="${data.imageUrl}" alt="example1" />
      <p id="details-title">${data.model}</p>
      <div id="info-wrapper">
        <div id="details-description">
          <p class="year">${data.year}</p>
          <p class="mileage">${data.mileage}</p>
          <p class="contact">${data.contact}</p>
          <p id="motorcycle-description">
            ${data.about}
          </p>
        </div>
        <!--Edit and Delete are only for creator-->
        ${isOwner ? html` 
        <div id="action-buttons">
          <a href="/edit/${data._id}" id="edit-btn">Edit</a>
          <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
        </div>
        `: null}
      </div>
    </div>
  </section>
`;

export async function showDetails(ctx){
    const id = ctx.params.id;
    const motorcycle = await getMotorcycleById(id);

    const user = getUserData();
    const hasUser = !!user;
    const isOwner = hasUser && user._id == motorcycle._ownerId;
    
    render(detailsTemplate(motorcycle, hasUser, isOwner, onDelete));

    async function onDelete(){
        const choice = confirm('Are you sure?');
        if (choice) {
            await deleteMotorcycle(id);
            page.redirect('/dashboard');
        }
    }
}