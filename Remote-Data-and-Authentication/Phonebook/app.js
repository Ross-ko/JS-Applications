function attachEvents() {
  const url = "http://localhost:3030/jsonstore/phonebook";
  const ulEl = document.querySelector("#phonebook");

  const createBtn = document.querySelector("#btnCreate");
  const loadBtn = document.querySelector("#btnLoad");
  createBtn.addEventListener("click", onCreate);
  loadBtn.addEventListener("click", onLoad);

  async function onCreate(event) {
    let personEl = document.querySelector("#person");
    let phoneEl = document.querySelector("#phone");

    let person = personEl.value;
    let phone = phoneEl.value;

    if (!person || !phone) {
      return;
    }

    let data = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ person, phone }),
    };

    await fetch(url, data);
    personEl.value = "";
    phoneEl.value = "";
    onLoad();
  }

  async function onLoad(event) {
    ulEl.innerHTML = "";

    let response = await fetch(url);
    let data = await response.json();

    Object.values(data).forEach((record) => {
      createAndAppend(record);
    });
  }

  function createAndAppend(record) {
    let li = document.createElement("li");
    li.textContent = `${record.person}: ${record.phone}`;
    let btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.dataset.id = record._id;
    btn.addEventListener("click", onDelete);

    li.appendChild(btn);

    ulEl.appendChild(li);
  }

  async function onDelete(event) {
    let id = event.target.dataset.id;
    await fetch(url + `/${id}`, {
      method: "delete",
    });
    onLoad();
  }
}

attachEvents();
