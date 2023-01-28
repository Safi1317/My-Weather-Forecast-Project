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
var inputarray = [];
var search = document.getElementById("search");
function searchWeather(search) {
  // event.preventDefault();
  // search = document.getElementById("search").value;
  if (localStorage.getItem("inputarray") === null) {
    inputarray = [];
    if (inputarray.indexOf(search) !== -1) {
      localStorage.setItem("inputarray", JSON.stringify(inputarray));
    } else {
      inputarray.push(search);
      localStorage.setItem("inputarray", JSON.stringify(inputarray));
    }
  } else {
    inputarray = JSON.parse(localStorage.getItem("inputarray"));
    if (inputarray.indexOf(search) !== -1) {
      localStorage.setItem("inputarray", JSON.stringify(inputarray));
    } else {
      inputarray.push(search);
      localStorage.setItem("inputarray", JSON.stringify(inputarray));
    }
  }

  //get from local storage
  var inputarray = JSON.parse(localStorage.getItem("inputarray"));
  console.log(inputarray);
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      let lat = data[0].lat;
      let lon = data[0].lon;
      cityName.textContent = data[0]["name"] + " , " + data[0]["country"];
      fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
      )
        .then((response) => response.json())
        .then((data) => {
          removeChilds(container);
          for (i = 0; i < 6; i++) {
            let cards = document.createElement("div");
            cards.className = "qwert";
            let date = document.createElement("h2");
            let p1 = document.createElement("p");
            // let p1=$("<p>")
            let p2 = document.createElement("p");
            let p3 = document.createElement("p");
            const today = data["daily"][i]["dt"];
            let dayofweek = dayjs.unix(today);
            date.textContent = dayofweek.format("DD/MM/YYYY");
            p1.textContent = "Temp: " + data["daily"][i]["temp"]["day"] + "° F";
            // Jp1.text("Temp: " + data["daily"][i]["temp"]["day"] + "° F")
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
            container.appendChild(cards);
            if (i === 0) {
              cards.className = "todayforcast";
            }
          }
          console.log(inputarray[0]);
          savesearch.innerHTML = "";
          for (i = 0; i < inputarray.length; i++) {
            let btn = document.createElement("button");
            btn.setAttribute("class", "history-btn");
            btn.setAttribute("id", inputarray[i]);
            btn.textContent = inputarray[i];
            savesearch.append(btn);
          }

          // savesearch.textContent = search;
        });
    });
}
function handlesearchform(event) {
  if (!search.value) {
    return;
  }
  event.preventDefault();
  var city = search.value.trim();
  searchWeather(city);
  search.value = "";
}
function handlesearchbutton(event) {
  if (!event.target.matches(".history-btn")) {
    return;
  }
  var btn = event.target;
  var city = btn.getAttribute("id");
  searchWeather(city);
}
function displayhistory() {
  var searchhistory = localStorage.getItem("inputarray");
  if (searchhistory) {
    inputarray = JSON.parse(searchhistory);
  } else {
    inputarray = [];
  }
  savesearch.innerHTML = "";
  for (i = 0; i < inputarray.length; i++) {
    let btn = document.createElement("button");
    btn.setAttribute("class", "history-btn");
    btn.setAttribute("id", inputarray[i]);
    btn.textContent = inputarray[i];
    savesearch.append(btn);
  }
}
displayhistory();
savesearch.addEventListener("click", handlesearchbutton);
searchbtn.addEventListener("click", handlesearchform);
// make info in local storage searchable again
//make city name appear within first card
//style
