import { getCyberwareById, updateCyberware } from '../data/cyberware.js';
import { displayErrorMessage } from '../data/errMsg.js';
import { html, page, render } from '../lib.js';
import { createSubmitHandler } from '../util.js';


const editTemplate = (article, onEdit) => html`
<section id="edit">
    <div class="form form-item" @submit=${onEdit}>
        <h2>Edit Your Item</h2>
        <form class="edit-form">
            <input type="text" name="item" id="item" placeholder="Item" .value="${article.item}"/>
            <input type="text" name="imageUrl" id="item-image" placeholder="Your item Image URL" .value="${article.imageUrl}"/>
            <input type="text" name="price" id="price" placeholder="Price in Euro" .value="${article.price}"/>
            <input type="text" name="availability" id="availability" placeholder="Availability Information" .value="${article.availability}"/>
            <input type="text" name="type" id="type" placeholder="Item Type" .value="${article.type}"/>
            <textarea id="description" name="description" placeholder="More About The Item" rows="10"
                cols="50" .value="${article.description}"></textarea>
            <button type="submit">Edit</button>
        </form>
    </div>
</section>
`;

export async function showEdit(ctx){
    const id = ctx.params.id;
    const article = await getCyberwareById(id);
    render(editTemplate(article, createSubmitHandler(onEdit)));

    async function onEdit({item, imageUrl, price, availability, type, description}, form){
        if(!item || !imageUrl || !price || !availability || !type || !description){
            throw displayErrorMessage('All fields are required!');
        }

        await updateCyberware(id, {item, imageUrl, price, availability, type, description});
        page.redirect('/market/' + id);
    }
}