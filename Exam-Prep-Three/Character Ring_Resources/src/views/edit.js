import { editChar, getCharById } from '../data/characters.js';
import { html, render, page } from '../lib.js';
import { createSubmitHandler } from '../util.js';

const editView = (char, onEdit) => html`
    <section id="edit">
        <div class="form">
            <img class="border" src="./images/border.png" alt="">
            <h2>Edit Character</h2>
            <form class="edit-form" @submit=${onEdit}>
                <input type="text" name="category" id="category" placeholder="Character Type" .value="${char.category}"/>
                <input type="text" name="image-url" id="image-url" placeholder="Image URL" .value="${char.imageUrl}"/>
                <textarea id="description" name="description" placeholder="Description" rows="2" cols="10" .value="${char.description}"></textarea>
                <textarea id="additional-info" name="additional-info" placeholder="Additional Info" rows="2"
                    cols="10" .value="${char.moreInfo}"></textarea>
                <button type="submit">Edit</button>
            </form>
            <img class="border" src="./images/border.png" alt="">
        </div>
    </section>
`;

export async function showEdit(ctx) {
    const id = ctx.params.id;
    const char = await getCharById(id);
    
    render(editView(char, createSubmitHandler(onEdit)));

    async function onEdit(data, form) {
 
        let category = data['category'];
        let imageUrl = data['image-url'];
        let description = data['description'];
        let moreInfo = data['additional-info'];

        if(!category || !imageUrl || !description || !moreInfo){
            return alert('All fields are required!');
        }
    
        await editChar(id, {category, imageUrl, description, moreInfo});
        page.redirect('/dashboard/' + id);
    }
}
