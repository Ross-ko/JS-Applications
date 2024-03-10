const loginEl = document.querySelector("form");
loginEl.addEventListener("submit", onLogin);
document.querySelector("a[id='logout']").style.display = "none";
document.querySelector("a[id='login']").classList.add('active');

const loginURL = "http://localhost:3030/users/login";

async function onLogin(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return;
  }

  await loginUser({ email, password });
  event.target.reset();
  window.location = "index.html";
}

async function loginUser(data) {
  const options = createOptions("post", data);
  const response = await fetch(loginURL, options);
  const userData = await response.json();
  sessionStorage.setItem("userData", JSON.stringify(userData));
}

function createOptions(method, data) {
  return {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
}
