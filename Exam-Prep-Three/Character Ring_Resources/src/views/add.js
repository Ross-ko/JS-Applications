import { addCharacter } from '../data/characters.js';
import { html, render, page } from '../lib.js'; 
import { createSubmitHandler } from '../util.js';
    
const addCharView = (onAdd) => html`
    <section id="create">
        <div class="form">
            <img class="border" src="./images/border.png" alt="">
            <h2>Add Character</h2>
            <form class="create-form" @submit=${onAdd}>
                <input type="text" name="category" id="category" placeholder="Character Type" />
                <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
                <textarea id="description" name="description" placeholder="Description" rows="2" cols="10"></textarea>
                <textarea id="additional-info" name="additional-info" placeholder="Additional Info" rows="2"
                    cols="10"></textarea>
                <button type="submit">Add Character</button>
            </form>
            <img class="border" src="./images/border.png" alt="">
        </div>
    </section>`;

export function showAddChar(){
    render(addCharView(createSubmitHandler(onAdd)));
}

async function onAdd(data, form){

    let category = data['category'];
    let imageUrl = data['image-url'];
    let description = data['description'];
    let moreInfo = data['additional-info'];

    if(!category || !imageUrl || !description || !moreInfo){
        return alert('All fields are required!');
    }

    await addCharacter(category, imageUrl, description, moreInfo);
    page.redirect('/dashboard');
}