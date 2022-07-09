// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80,
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50,
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20,
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100,
//   },
//   moscow: {
//     temp: -5,
//     humidity: 20,
//   },
// };

// function capitalizeFirstLetter(string) {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }

// let city = prompt("Enter a city, please");
// city = city.toLowerCase();
// city = city.trim();

// i = 0;
// for (const name in weather) {
//   if (name == city) {
//     alert(
//       `It is currently ${Math.round(
//         weather[name].temp
//       )}°C in ${capitalizeFirstLetter(city)} with a humidity of ${Math.round(
//         weather[name].humidity
//       )}%`
//     );
//     i = 1;
//     break;
//   }
// }

// if (i == 0) {
//   alert(
//     "Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+" +
//       city
//   );

function titleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
}
console.log(titleCase("DKJfcdjd jdvjvd EEJEJJE cdcm"));

// function getDay(currentDate) {
//   let days = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   let day = currentDate.getDay();
//   return days[day];
// }
// let now = new Date();
// let currentDay = getDay(now);
// let currentHours = now.getHours();
// let currentMinutes = now.getMinutes();
// let date = document.querySelector(".current-date");
// if (currentMinutes < 10) {
//   date.innerHTML = `${currentDay} ${currentHours}:0${currentMinutes}`;
// } else {
//   date.innerHTML = `${currentDay} ${currentHours}:${currentMinutes}`;
// }

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search");
  let city = document.querySelector(".current-city");
  if (searchInput.value) {
    let searchInput = document.getElementById("search").value;
    searchInput = titleCase(searchInput);
    city.innerHTML = searchInput;
    getTemp(searchInput);
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

  tempElement.innerHTML = Math.round(response.data.main.temp);
  weatherElement.innerHTML = titleCase(response.data.weather[0].description);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  timeElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

getTemp("Milan");
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

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
// let converter = document.querySelector(".convert-temperature");
// converter.addEventListener("click", convert);
