window.addEventListener("load", start);

function start() {
  document.querySelector("form").addEventListener("submit", onLogin);
}

async function onLogin(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  const email = data.email.trim();
  const password = data.password.trim();

  const url = "http://localhost:3030/users/login";

  try {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const userData = await response.json();
    localStorage.setItem("user", JSON.stringify(userData));

    window.location = "index.html";
  } catch (error) {
    alert(error.message);
  }
}
