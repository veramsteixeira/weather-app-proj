function formatDate(dateTime) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
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
  let month = months[dateTime.getMonth()];
  let day = dateTime.getDate();
  let weekday = days[dateTime.getDay()];
  let hours = dateTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = dateTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${weekday}, ${month} ${day}, ${hours}:${minutes}`;
}

let mainDate = document.querySelector("#date");
let currentDate = new Date();
mainDate.innerHTML = formatDate(currentDate);

function form(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
}
let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", form);

//week 5
function showWeather(response) {
  let temperatureElement = Math.round(response.data.main.temp);
  document.querySelector(`#city`).innerHTML = response.data.name;
  document.querySelector(`#temp`).innerHTML = temperatureElement;
}
let searching = document.querySelector("form");
searching.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let units = "metric";
  let apiKey = "c15c4d36993e58eb1cbcc771ca3eccb4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
  console.log(apiUrl);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "9eca7aac0b071aa16e3cb063adba0785";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(function (response) {
    let temperature = Math.round(response.data.main.temp);
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temp").innerHTML = temperature;
  });
}
document
  .querySelector("#current-location-button")
  .addEventListener("click", function () {
    navigator.geolocation.getCurrentPosition(showPosition);
  });
