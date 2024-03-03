function attachEvents() {
  const getWeatherBtn = document.querySelector("#submit");
  getWeatherBtn.addEventListener("click", getWeather);

  const locationInput = document.querySelector("#location");
  const forecastEl = document.querySelector("#forecast");
  const currentForecastEl = document.querySelector("#current");
  const upcomingForecastEl = document.querySelector("#upcoming");

  const baseURL = "http://localhost:3030/jsonstore/forecaster/locations/";
  const todayForecastURL = "http://localhost:3030/jsonstore/forecaster/today/";
  const upcomingForecastURL =
    "http://localhost:3030/jsonstore/forecaster/upcoming/";

  async function getWeather(event) {
    try {
      forecastEl.style.display = "block";

      const input = locationInput.value;

      const request = await fetch(baseURL);
      const response = await request.json();

      const currLocationData = response.find(
        (location) => location.name == input
      );
      await todayForecast(currLocationData.code);
      await upcomingForecast(currLocationData.code);
    } catch (error) {
      forecastEl.textContent = "Erorr";
    }
  }

  async function todayForecast(code) {
    const request = await fetch(todayForecastURL + code);
    const response = await request.json();
    const currForecast = createTodayForecast(response);

    currentForecastEl.appendChild(currForecast);
  }

  function createTodayForecast(data) {
    const container = document.createElement("div");
    container.classList.add("forecast");

    const conditionSymbol = document.createElement("span");
    conditionSymbol.classList.add("condition", "symbol");
    conditionSymbol.innerHTML = symbol(data.forecast.condition);

    container.appendChild(conditionSymbol);

    const conditionContainer = spanCreator(
      "condition",
      'forecast-data',
      data.name,
      data.forecast
    );

    container.appendChild(conditionContainer);

    return container;
  }

  function symbol(condition) {
    switch (condition) {
      case "Sunny":
        return "&#x2600";
      case "Partly sunny":
        return "&#x26C5";
      case "Overcast":
        return "&#x2601";
      case "Rain":
        return "&#x2614";
      case "Degrees":
        return "&#176";
      default:
        return condition;
    }
  }

  async function upcomingForecast(code) {
    const request = await fetch(upcomingForecastURL + code);
    const response = await request.json();
    const upcomingForecast = createUpcomingForecast(response);

    upcomingForecastEl.appendChild(upcomingForecast);
  }

  function createUpcomingForecast(data) {
    const container = document.createElement("div");
    container.classList.add("forecast-info");
    const dayOne = spanCreator("upcoming", 'symbol', data.name, data.forecast[0]);
    const dayTwo = spanCreator("upcoming", 'symbol', data.name, data.forecast[1]);
    const dayThree = spanCreator("upcoming", 'symbol', data.name, data.forecast[2]);

    container.appendChild(dayOne);
    container.appendChild(dayTwo);
    container.appendChild(dayThree);

    return container;
  }

  function spanCreator(currClass, classSpan, name, data) {
    const conditionContainer = document.createElement("span");
    conditionContainer.classList.add(currClass);

    const spanName = document.createElement("span");
    spanName.classList.add(classSpan);
    classSpan == 'symbol' ? spanName.innerHTML = symbol(data.condition) : spanName.textContent = name;

    const degree = document.createElement("span");
    degree.classList.add("forecast-data");
    degree.innerHTML = `${data.low + symbol("Degrees")}/${
      data.high + symbol("Degrees")
    }`;

    const condition = document.createElement("span");
    condition.classList.add("forecast-data");
    condition.textContent = data.condition;

    conditionContainer.appendChild(spanName);
    conditionContainer.appendChild(degree);
    conditionContainer.appendChild(condition);

    return conditionContainer;
  }
}

attachEvents();
