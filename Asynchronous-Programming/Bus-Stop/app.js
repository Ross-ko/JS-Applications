async function getInfo() {
  const stopIdEl = document.querySelector("#stopId");
  const stopId = stopIdEl.value;

  const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

  const stopNameEl = document.querySelector("#stopName");
  const busesEl = document.querySelector("#buses");
  stopNameEl.textContent = "";
  busesEl.innerHTML = "";

  try {
    const response = await fetch(url);
    const data = await response.json();
    stopNameEl.textContent = data.name;
    busLinesGenerator(Object.entries(data.buses));
  } catch (error) {
    stopNameEl.textContent = "Error";
  }

  //   const request = fetch(url);          -----------------          solution with then/catch
  //   request
  //     .then((response) =>
  //       response
  //         .json()
  //         .then((data) => {
  //           stopNameEl.textContent = data.name;
  //           busLinesGenerator(Object.entries(data.buses));
  //         })
  //         .catch((error) => {
  //           stopNameEl.textContent = "Error";
  //         })
  //     )
  //     .catch((error) => {
  //       stopNameEl.textContent = "Error";
  //     });

  function busLinesGenerator(data) {
    for ([bus, time] of data) {
      let li = document.createElement("li");
      li.textContent = `Bus ${bus} arrives in ${time} minutes`;
      busesEl.appendChild(li);
    }
  }
}
