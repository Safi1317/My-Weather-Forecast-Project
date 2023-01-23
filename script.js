let apiKey = "be1b5ded40845e0479d01eedd998ce1e";
const searchbtn = document.getElementById("searchbtn");
// const cityName = document.getElementById("cityName");
const temperatureEL = document.getElementById("temperature");
const Wind = document.getElementById("wind");
const humidityEL = document.getElementById("humidity");
var city;

function searchWeather() {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //   for (i = 0; i < 5; i++) {
      //     data.current.temperature;}
    });
}

searchbtn.addEventListener("click", searchWeather);
