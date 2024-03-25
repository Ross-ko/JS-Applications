import { itemNotFound, loadData, showCategory, showDetails, showEShop } from "./eshop.js";
import page from "//unpkg.com/page/page.mjs";

const root = document.querySelector("main");

page("/", showHome);
page("/index.html", "/");
page("/about", showAbout);
page("/eshop", loadData, showEShop);
page("/eshop/:category/:id", showCategory);
page("/eshop/:id", showDetails);
page("/eshop/*", itemNotFound);
page("*", notFound);

page();

function showHome() {
  root.innerHTML = `<p>Home page</p>`;
}

function showAbout() {
  root.innerHTML = `<p>About page</p>`;
}

function notFound() {
  root.innerHTML = `<p>Page not found!!!</p>`;
}
