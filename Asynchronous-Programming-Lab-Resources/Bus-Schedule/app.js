function solve() {
  const url = "http://localhost:3030/jsonstore/bus/schedule/";

  const spanEl = document.querySelector(".info");
  const departBtn = document.querySelector("#depart");
  const arriveBtn = document.querySelector("#arrive");

  const stop = {
    currStop: "",
    nextStop: "depot",
  };

  async function depart() {
    try {
      const response = await fetch(url + stop.nextStop);
      const data = await response.json();
      stop.currStop = data.name;
      stop.nextStop = data.next;
      spanEl.textContent = `Next stop ${stop.currStop}`;
      departBtn.disabled = true;
      arriveBtn.disabled = false;
    } catch (error) {
      spanEl.textContent = "Error";
      departBtn.disabled = true;
      arriveBtn.disabled = true;
    }
  }

  function arrive() {
    try {
      spanEl.textContent = `Arriving at ${stop.currStop}`;
      departBtn.disabled = false;
      arriveBtn.disabled = true;
    } catch (error) {
      spanEl.textContent = "Error";
      departBtn.disabled = true;
      arriveBtn.disabled = true;
    }
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
