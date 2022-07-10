function titleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
}
console.log(titleCase("DKJfcdjd jdvjvd EEJEJJE cdcm"));

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search");
  let city = document.querySelector(".current-city");
  if (searchInput.value) {
    let searchInput = document.getElementById("search").value;
    searchInput = titleCase(searchInput);
    city.innerHTML = searchInput;
    getTemp(searchInput);
    searchInput.value = "";
  } else {
    city.innerHTML = `Please, enter a city`;
  }
}

function formatDate(timestamp) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = date.getDay();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${days[day]} ${hours}:${minutes}`;
}

function getTemp(cityName) {
  let apiKey = "9772c374ca9f7d4036d601b4a27496d0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function displayTemp(response) {
  console.log(response.data);
  let tempElement = document.querySelector(".temperature-value");
  let weatherElement = document.querySelector("#current-weather");
  let humidityElement = document.querySelector("#current-humidity");
  let windElement = document.querySelector("#current-wind");
  let timeElement = document.querySelector("#date");
  let iconElement = document.querySelector("#main-icon");

  celsiusTemperature = response.data.main.temp;

  tempElement.innerHTML = Math.round(celsiusTemperature);
  weatherElement.innerHTML = titleCase(response.data.weather[0].description);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  timeElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function displayFtemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let tempElement = document.querySelector(".temperature-value");
  let fahrenheitTemperature = celsiusTemperature * 1.8 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCtemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let tempElement = document.querySelector(".temperature-value");
  tempElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFtemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCtemperature);

getTemp("Milan");
//CONVERTER
// function convert() {
//   let value = document.querySelector(".temperature-value");
//   temp = parseInt(value);
//   let degrees = document.querySelector(".temperature-degrees");
//   console.log(degrees.textContent);
//   if (degrees.textContent === "°C") {
//     value.innerHTML = value.textContent * 1.8 + 32;
//     degrees.innerHTML = "°F";
//   } else {
//     console.log("Convert to C");
//     value.innerHTML = (value.textContent - 32) / 1.8;
//     degrees.innerHTML = "°C";
//   }
// }
