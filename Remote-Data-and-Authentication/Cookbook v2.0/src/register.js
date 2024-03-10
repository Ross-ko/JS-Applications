window.addEventListener("load", start);

function start() {
  document.querySelector("form").addEventListener("submit", onRegister);
}

async function onRegister(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  const email = data.email.trim();
  const password = data.password.trim();
  const repass = data.rePass.trim();

  const url = "http://localhost:3030/users/register";

  try {
    if (!email || !password) {
      throw new Error("All fields are required!");
    }
    if (password != repass) {
      throw new Error("Passwords don't match!");
    }

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
    localStorage.setItem("user", userData);

    window.location = "/";
  } catch (error) {
    alert(error.message);
  }
}
