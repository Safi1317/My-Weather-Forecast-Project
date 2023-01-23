let apiKey = "be1b5ded40845e0479d01eedd998ce1e";
// let weatherbase = "http://api.openweathermap.org/geo/1.0/direct?q=";
let searchmethod = "$q=";
function searchweather() {
  fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q={City name},&appid={apikey}"
  ).then(
    (response) => response.json
    //   console.log(result)
  );
  console.log(response);
}
const searchbtn = document.getElementById("searchbtn");
searchbtn.addEventListener("click", searchweather);
