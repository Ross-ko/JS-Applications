import { showHomeView } from "./home.js";
import "./login.js";
import { showView } from "./nav.js";
import "./create.js";

const views = {
  "home-link": ["home-view", showHomeView],
  "login-link": ["login-view"],
  "create-link": ["create-view"],
};

for (let linkID in views) {
  const [sectionID, callback] = views[linkID];
  document
    .getElementById(linkID)
    .addEventListener("click", (event) => showView(sectionID, callback, event));
}

document.getElementById("loading").remove();
showView("home-view", showHomeView);
