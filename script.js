let apiKey = "be1b5ded40845e0479d01eedd998ce1e";
const searchbtn = document.getElementById("searchbtn");
const cityName = document.getElementById("cityName");
const temperatureEL = document.getElementById("temperature");
const Wind = document.getElementById("wind");
const humidityEL = document.getElementById("humidity");
var { lat } = location;
var { lon } = location;
var city;
var search;
function searchWeather() {
  search = document.getElementById("search").value;
  city = location.name;
  var { lat } = location;
  var { lon } = location;
  var city = location.name;
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${search},&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${apiKey}`
        // `https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          //   for (i = 0; i < 5; i++) {
          //     data.current.temperature;
          //   }
        });
      console.log(data);
      //   for (i = 0; i < 5; i++) {
      //     data.current.temperature;}
    });
}
// `https://api.openweathermap.org/data/3.0/onecall?lat=${data["current"][0]["lat"]}&lon=${data["current"][1]["lon"]}&exclude=hourly,daily&appid=${apiKey}`
searchbtn.addEventListener("click", searchWeather);
