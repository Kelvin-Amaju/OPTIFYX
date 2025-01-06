const apiKey = ""; // Replace with your OpenWeatherMap API key
const weatherInfo = document.getElementById("weather-info");
const getWeatherButton = document.getElementById("get-weather");
const sidebar = document.getElementById("sidebar");
const closeSidebarButton = document.getElementById("close-sidebar");
const weatherOutput = document.getElementById("weather-output");

getWeatherButton.addEventListener("click", () => {
  const city = document.getElementById("city-input").value.trim();
  if (!city) {
    displayError("Please enter a city name.");
    return;
  }

  fetchWeatherData(city);
});

closeSidebarButton.addEventListener("click", () => {
  sidebar.classList.remove("open");
});

function fetchWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
      openSidebar();
    })
    .catch(error => {
      displayError(error.message);
    });
}

function displayWeather(data) {
  const { name, main, weather } = data;
  weatherOutput.innerHTML = `
    <h2>${name}</h2>
    <p><strong>Temperature:</strong> ${main.temp}°C</p>
    <p><strong>Condition:</strong> ${weather[0].description}</p>
    <p><strong>Humidity:</strong> ${main.humidity}%</p>
  `;
  weatherInfo.classList.remove("error");
}

function displayError(message) {
  weatherOutput.innerHTML = `<p>${message}</p>`;
  weatherInfo.classList.add("error");
  openSidebar();
}

function openSidebar() {
  sidebar.classList.add("open");
}