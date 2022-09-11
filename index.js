function formatDate(date) {
  let now = new Date();
  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let year = now.getFullYear();
  let dayofweek = day[now.getDay()];
  let monthofyear = month[now.getMonth()];
  return `${hours}:${minutes} ${dayofweek} ${monthofyear} ${year}`;
}

let date = document.querySelector("#date");
date.innerHTML = formatDate(date);

function showTemperature(response) {
  document.querySelector("#main-temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("#main-condition").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#city").innerHTML = response.data.name;
}

function search(city) {
  let key = "27218fb510ea3727370c3caaa80041fc";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let city = document.querySelector("form");
city.addEventListener("submit", handleSubmit);

function searchCity(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let key = "27218fb510ea3727370c3caaa80041fc";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
  axios.get(url).then(showTemperature);
}
function findCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCity);
}

let current = document.querySelector("#current-input");
current.addEventListener("click", findCurrent);

search("Sudak");
