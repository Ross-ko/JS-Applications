const registerEl = document.querySelector("form");
registerEl.addEventListener("submit", onRegister);
document.querySelector("a[id='logout']").style.display = "none";
document.querySelector("a[id='register']").classList.add('active');

const registerURL = "http://localhost:3030/users/register";

async function onRegister(event) {
  event.preventDefault();
  let formData = new FormData(event.target);
  let email = formData.get("email");
  let password = formData.get("password");
  let rePass = formData.get("rePass");

  if (!email || !password || !rePass || password != rePass) {
    return;
  }

  await createUser({ email, password });
  event.target.reset();
  window.location = 'index.html'
}

async function createUser(data) {
  const options = createOptions("post", data);
  const response = await fetch(registerURL, options);
  const userData = await response.json();
  sessionStorage.setItem('userData', JSON.stringify(userData));
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
