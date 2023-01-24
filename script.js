let apiKey = "be1b5ded40845e0479d01eedd998ce1e";
const searchbtn = document.getElementById("searchbtn");
const cityName = document.getElementById("cityName");
var temperature = document.getElementById("temperature");
var wind = document.getElementById("wind");
var humidityEL = document.getElementById("humidity");
const container = document.getElementById("forcastcontainer");
var search;
var { lat } = location;
var { lon } = location;
function searchWeather() {
  search = document.getElementById("search").value;
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${search},&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let lat = data[0].lat;
      let lon = data[0].lon;
      console.log(lat);
      console.log(lon);
      fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          for (i = 0; i < 5; i++) {
            let cards = document.createElement("div");
            let p1 = document.createElement("p");
            let p2 = document.createElement("p");
            let p3 = document.createElement("p");
            p1.textContent = "Temp: " + data["daily"][i]["temp"]["day"];
            p2.textContent = "Wind: " + data["daily"][i]["wind_speed"];
            p3.textContent = "Humidity: " + data["daily"][i]["humidity"] + "%";
            cards.appendChild(p1);
            cards.appendChild(p2);
            cards.appendChild(p3);
            container.appendChild(cards);
          }
        });

      //   for (i = 0; i < 5; i++) {
      //     data.current.temperature;}
      // });
    });
}
searchbtn.addEventListener("click", searchWeather);
