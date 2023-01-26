let apiKey = "be1b5ded40845e0479d01eedd998ce1e";
const searchbtn = document.getElementById("searchbtn");
const cityName = document.getElementById("cityName");
const container = document.getElementById("forcastcontainer");
const savesearch = document.getElementById("savesearch");
const removeChilds = (parent) => {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
};
// var inputarray = [];
var search;
function searchWeather(event) {
  event.preventDefault();
  search = document.getElementById("search").value;
  //push to local storage or if there's nothing in it create a new array
  if (localStorage.getItem("city name") === null) {
    var inputarray = [];
    inputarray.push(search);
    localStorage.setItem("city name", JSON.stringify(inputarray));
  } else {
    var inputarray = JSON.parse(localStorage.getItem("city name"));
    inputarray.push(search);
    localStorage.setItem("city name", JSON.stringify(inputarray));
  }
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      let lat = data[0].lat;
      let lon = data[0].lon;
      cityName.textContent = data[0]["name"] + " , " + data[0]["country"];
      // var userinput = cityName.textContent;
      // localStorage.setItem("city name", search);
      // var userinput = localStorage.getItem("city name");

      //push to local storage or if there's nothing in it create a new array

      fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
      )
        .then((response) => response.json())
        .then((data) => {
          removeChilds(container);
          for (i = 0; i < 6; i++) {
            // var userinput = cityName;
            // Array.push(userinput);
            // // console.log(Array);
            // localStorage.setItem(Array[i], userinput);
            let cards = document.createElement("div");
            cards.className = "qwert";
            let date = document.createElement("h2");
            let p1 = document.createElement("p");
            let p2 = document.createElement("p");
            let p3 = document.createElement("p");
            let p4 = document.createElement("p");
            const today = data["daily"][i]["dt"];
            let dayofweek = dayjs.unix(today);
            date.textContent = dayofweek.format("DD/MM/YYYY");
            p1.textContent = "Temp: " + data["daily"][i]["temp"]["day"] + "° F";
            p2.textContent = "Wind: " + data["daily"][i]["wind_speed"] + "MPH";
            p3.textContent = "Humidity: " + data["daily"][i]["humidity"] + "%";
            var iconUrl = `http://openweathermap.org/img/wn/${data["daily"][i]["weather"][0]["icon"]}@2x.png`;
            var image = document.createElement("img");
            image.src = iconUrl;
            cards.appendChild(date);
            cards.appendChild(image);
            cards.appendChild(p1);
            cards.appendChild(p2);
            cards.appendChild(p3);
            cards.appendChild(p4);
            container.appendChild(cards);
            if (i === 0) {
              cards.className = "todayforcast";
            }
          }
          // localStorage.setItem("city name", userinput);
          // var userinput = cityName.textContent;
          // localStorage.getItem("city name");
          // cityName.textContent
          // inputarray.push(userinput);

          // localStorage.setItem("city name", search);
          // var userinput = localStorage.getItem("city name");
          // console.log(userinput);
          // var userinput = cityName.textContent;
          // inputarray.push(userinput);
          // savesearch.textContent = userinput;
          // const myJSON = JSON.stringify(inputarray);
          // // for (var i = 0; i < inputarray.length; i++) {
          // localStorage.setItem("city name", myJSON);

          // console.log(inputarray);

          // let text = localStorage.getItem("city name");
          // let = JSON.parse(text);
          savesearch.textContent = inputarray;
        });
    });
}

searchbtn.addEventListener("click", searchWeather);
// add city name to local storage
//style
