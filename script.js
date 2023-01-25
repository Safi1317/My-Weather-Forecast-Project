let apiKey = "be1b5ded40845e0479d01eedd998ce1e";
const searchbtn = document.getElementById("searchbtn");
const cityName = document.getElementById("cityName");
var temperature = document.getElementById("temperature");
var wind = document.getElementById("wind");
var humidityEL = document.getElementById("humidity");
const today = document.getElementById("todayforcast");
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
      cityName.textContent = data[0]["name"] + " , " + data[0]["country"];
      console.log(cityName);
      console.log(lat);
      console.log(lon);
      fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          removeChilds(container);
          for (i = 0; i < 6; i++) {
            let cards = document.createElement("div");
            cards.className = "qwert";
            const d = dayjs();
            const today = data["daily"][i];
            console.log(today);
            let dayofweek = document.createElement("h2");
            dayofweek.textContent = d.today;
            // document.createElement("h2");

            let p1 = document.createElement("p");
            let p2 = document.createElement("p");
            let p3 = document.createElement("p");
            let p4 = document.createElement("p");

            // const d = dayjs();
            // const today = data["daily"][i] ["dt"];
            // h2.textContent = d.today.format("MM/DD/YYYY");
            // // h2.textContent = d.format("MM/DD/YYYY");

            p1.textContent = "Temp: " + data["daily"][i]["temp"]["day"] + "° F";
            p2.textContent = "Wind: " + data["daily"][i]["wind_speed"] + "MPH";
            p3.textContent = "Humidity: " + data["daily"][i]["humidity"] + "%";
            var iconUrl = `http://openweathermap.org/img/wn/${data["daily"][i]["weather"][0]["icon"]}@2x.png`;
            var image = document.createElement("img");
            image.src = iconUrl;
            cards.appendChild(image);
            // cards.appendChild(h2);
            cards.appendChild(p1);
            cards.appendChild(p2);
            cards.appendChild(p3);
            cards.appendChild(p4);
            cards.appendChild(dayofweek);

            console.log(p4);

            container.appendChild(cards);
            if (i === 0) {
              cards.className = "todayforcast";
            }
          }
        });
      // add icons and units
      //timeloop
      // localstorage to save searches
      // city name
    });
}
searchbtn.addEventListener("click", searchWeather);
