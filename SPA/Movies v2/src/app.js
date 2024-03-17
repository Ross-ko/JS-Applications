import { showRegisterView } from "./register.js";
import { showHome } from "./home.js";
import { getUserData } from "./userHelper.js";
import { showLogin } from "./login.js";
import { showLogout } from "./logout.js";

document
  .querySelectorAll("section")
  .forEach((section) => (section.style.display = "none"));
document.querySelector("nav").addEventListener("click", onNavigate);

const userMsg = document.getElementById("welcome-msg");
const userNav = document.querySelectorAll("li.user");
const guestNav = document.querySelectorAll("li.guest");

const routes = {
  "/": showHome,
  "/register": showRegisterView,
  "/home": showHome,
  "/login": showLogin,
  "/logout": showLogout,
  "/addMovies": () => console.log("add"),
  "/details/:id": () => console.log("add"),
};

export function updateNav() {
  const userData = getUserData();
  if (userData) {
    userNav.forEach((section) => (section.style.display = "block"));
    guestNav.forEach((section) => (section.style.display = "none"));
    userMsg.textContent = `Welcome, ${userData.email}`;
  } else {
    userNav.forEach((section) => (section.style.display = "none"));
    guestNav.forEach((section) => (section.style.display = "block"));
    userMsg.textContent = ``;
  }
}

function onNavigate(event) {
  if (event.target.tagName != "A" || !event.target.href) {
    return;
  }
  event.preventDefault();

  const url = new URL(event.target.href);
  const path = url.pathname;
  routes[path]();
}

updateNav();
showHome();
