//Statics
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let units = "metric";
let apiKey = "0f2fe65450d1f47efc01eb6a5ed904a1";
let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";

//Functions
function updateDate(currDate) {
  let weekDay = weekDays[currDate.getDay()];
  let hour = currDate.getHours();
  let min = currDate.getMinutes();

  let dateLabel = document.querySelector(".current-date");
  dateLabel.innerHTML = `${weekDay} ${hour}h${min}`;
}

function updateTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let temperatureContainer = document.querySelector("#current-temperature");
  temperatureContainer.innerHTML = `${temperature} ºC`;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${response.data.name}`;
}

function updateCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  let apiUrl = `${apiEndpoint}q=${city.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(updateTemperature);
}

function getTemperaturePosition(position) {
  let lat = Math.round(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);
  let apiUrl = `${apiEndpoint}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(updateTemperature);
}

function getCurrentTemperature() {
  navigator.geolocation.getCurrentPosition(getTemperaturePosition);
}

//JS flow
let currDate = new Date();
updateDate(currDate);

/* Search Input */
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", updateCity);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", updateCity);

/* Current Location Button */
let currentLocation = document.querySelector("#my-location");
currentLocation.addEventListener("click", getCurrentTemperature);
