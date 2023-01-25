let apiKey = "be1b5ded40845e0479d01eedd998ce1e";
const searchbtn = document.getElementById("searchbtn");
const cityName = document.getElementById("cityName");
var temperature = document.getElementById("temperature");
var wind = document.getElementById("wind");
var humidityEL = document.getElementById("humidity");
const container = document.getElementById("forcastcontainer");
const removeChilds = (parent) => {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
};
var search;
// var units = metrics;
// var { lat } = location;
// var { lon } = location;
function searchWeather() {
  search = document.getElementById("search").value;
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let lat = data[0].lat;
      let lon = data[0].lon;
      console.log(lat);
      console.log(lon);
      fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          removeChilds(container);
          for (i = 0; i < 5; i++) {
            let cards = document.createElement("div");
            cards.className = "qwert";
            let p1 = document.createElement("p");
            let p2 = document.createElement("p");
            let p3 = document.createElement("p");
            let h2 = document.createElement("h2");
            const d = dayjs();
            h2.textContent = d.format("MM/DD/YYYY");
            p1.textContent = "Temp: " + data["daily"][i]["temp"]["day"] + "° F";
            p2.textContent = "Wind: " + data["daily"][i]["wind_speed"] + "MPH";
            p3.textContent = "Humidity: " + data["daily"][i]["humidity"] + "%";
            cards.appendChild(h2);
            cards.appendChild(p1);
            cards.appendChild(p2);
            cards.appendChild(p3);
            container.appendChild(cards);
          }
        });
      // add icons and units
      // localstorage to save searches
      // city name
    });
}
searchbtn.addEventListener("click", searchWeather);
