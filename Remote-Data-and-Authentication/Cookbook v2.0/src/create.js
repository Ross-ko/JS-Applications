window.addEventListener("load", start);

function start() {
  const userData = localStorage.getItem("user");
  if (!userData) {
    window.location = "/login.html";
    return;
  }
  document.querySelector("form").addEventListener("submit", onCreate);
}

async function onCreate(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  const body = {
    name: data.name.trim(),
    img: data.img.trim(),
    ingredients: parseMultiline(data.ingredients),
    steps: parseMultiline(data.steps),
  };

  try {
    const url = "http://localhost:3030/data/recipes";

    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      throw new Error("You must be logged in to post!");
    }

    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": userData.accessToken,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    window.location = "index.html";
  } catch (error) {
    alert(error.message);
  }
}

function parseMultiline(data) {
  return data
    .split("\n")
    .map((r) => r.trim())
    .filter((r) => r);
}
