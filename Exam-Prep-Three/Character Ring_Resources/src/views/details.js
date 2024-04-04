import { deleteChar, getCharById } from '../data/characters.js';
import { html, render, page } from '../lib.js';
import { getUserData } from '../util.js';

const detailsView = (data, hasUser, isOwner, onDelete) => html`
  <section id="details">
    <div id="details-wrapper">
        <img id="details-img" src="${data.imageUrl}" alt="example1" />
        <div>
            <p id="details-category">${data.category}</p>
            <div id="info-wrapper">
                <div id="details-description">
                    <p id="description">
                        ${data.description}
                    </p>
                    <p id="more-info">
                        ${data.moreInfo}
                    </p>
                </div>
            </div>
            <h3>Is This Useful:<span id="likes">0</span></h3>
        ${hasUser ? html`
            <div id="action-buttons">
            ${isOwner ? html`
                <a href="/edit/${data._id}" id="edit-btn">Edit</a>
                <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
            `: null}
                <a href="javascript:void(0)" id="like-btn">Like</a>

            </div>
            ` : null}
        </div>
    </div>
  </section>
`;

export async function showDetails(ctx){
    const id = ctx.params.id;
    const char = await getCharById(id);

    const user = getUserData();
    const hasUser = !!user;
    const isOwner = hasUser && user._id == char._ownerId;

    render(detailsView(char, hasUser, isOwner, onDelete));

    async function onDelete(){
        const choice = confirm('Are you sure?');
        if (choice) {
            await deleteChar(id);
            page.redirect('/dashboard');
        }
    }
}