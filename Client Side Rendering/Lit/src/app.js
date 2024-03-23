import { html, render } from "https://unpkg.com/lit-html@3.1.2/lit-html.js";
import { classMap } from "https://unpkg.com/lit-html@3.1.2/directives/class-map.js";
import { styleMap } from "https://unpkg.com/lit-html@3.1.2/directives/style-map.js";

const classes = {
  red: true,
  underline: true,
};

const styles = {
  backgroundColor: 'crimson',
  padding: '9px'
}

const template = (name, value) => html`
  <h1 class=${classMap(classes)}>Hello, ${name}</h1>
  <p>Morpheus!</p>
  <button @click=${onClick}>Matrix button</button>
  <input style=${styleMap(styles)} .value=${value} />
  <textarea .value=${value}></textarea>
`;

const root = document.querySelector("main");

document.querySelector("button").addEventListener("click", () => {
  render(template("Trinity!"), root);
});

render(template("Mr. Anderson... We miss you!", "Agent Smith"), root);

function onClick(event) {
  alert("Machines are coming!!!");
}
