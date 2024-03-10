function attachEvents() {
  const sendBtn = document.querySelector("#submit");
  const refreshBtn = document.querySelector("#refresh");
  const textAreaEl = document.querySelector("#messages");

  sendBtn.addEventListener("click", onSend);
  refreshBtn.addEventListener("click", onRefresh);

  const url = "http://localhost:3030/jsonstore/messenger";

  async function onSend(event) {
    let nameEl = document.querySelector("input[name='author']");
    let textEl = document.querySelector("input[name='content']");

    let name = nameEl.value;
    let text = textEl.value;

    let data = {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ author: name, content: text }),
    };

    let response = await fetch(url, data);

    nameEl.value = "";
    textEl.value = "";
  }

  async function onRefresh(event) {
    textAreaEl.value = "";

    let response = await fetch(url);
    let data = await response.json();

    Object.values(data).forEach((record) => {
      textAreaEl.value += `${record.author}: ${record.content}\n`;
    });

    textAreaEl.value = textAreaEl.value.trim();
  }
}

attachEvents();
