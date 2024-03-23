import { loadTemplates, render } from "./renderer.js";

const views = {
  home: {
    title: "Lets do this shit",
    content: "Hack the Matrix, pendejo",
  },
  catalog: {
    title: "Hello there",
    content: "General Kenobi!",
  },
  about: {
    title: "I'm Batman",
    content: "You'r FatttMan",
  },
};

document.querySelector("nav").addEventListener("click", (event) => {
  if (event.target.tagName == "A") {
    event.preventDefault();
    show(event.target.id);
  }
});
const root = document.querySelector("main");

show('home');

async function show(id) {
    const context = views[id]
    const result = await render('layout', context)

    root.innerHTML = result
}