import { addMotorcycle } from '../data/motorcycles.js';
import { html, page, render } from '../lib.js';
import { createSubmitHandler } from '../util.js';


const addMotorcycleTemplate = (onAdd) => html`
  <section id="create">
    <h2>Add Motorcycle</h2>
    <div class="form">
      <h2>Add Motorcycle</h2>
      <form class="create-form" @submit=${onAdd}>
        <input type="text" name="model" id="model" placeholder="Model" />
        <input
          type="text"
          name="imageUrl"
          id="moto-image"
          placeholder="Moto Image"
        />
        <input type="number" name="year" id="year" placeholder="Year" />
        <input
          type="number"
          name="mileage"
          id="mileage"
          placeholder="mileage"
        />
        <input type="text" name="contact" id="contact" placeholder="contact" />
        <textarea
          id="about"
          name="about"
          placeholder="about"
          rows="10"
          cols="50"
        ></textarea>
        <button type="submit">Add Motorcycle</button>
      </form>
    </div>
  </section>
`;

export function showAddMotorcycle(ctx) {
    render(addMotorcycleTemplate(createSubmitHandler(onAdd)));
}

async function onAdd({model, imageUrl, year, mileage, contact, about}){

    if(!model || !imageUrl || !year || !mileage || !contact || !about){
        debugger;
        return alert('All fields are required!');
    }

    await addMotorcycle(model, imageUrl, year, mileage, contact, about);
    page.redirect('/dashboard');
}