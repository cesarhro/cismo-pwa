const api = {
  key: "64ed82577ced7f69cb1687f0ce536131",
  base: "https://api.openweathermap.org/data/2.5/",
  lang: "pt_br",
  units: "metric",
};

const date = document.querySelector(".date");
const container_img = document.querySelector(".container-img");
const temp_number = document.querySelector(".container-temp");
const weather_t = document.querySelector(".weather");
const low_high = document.querySelector(".low-high");
const cont_rain = document.querySelector(".rain");
const cidade = document.querySelector(".city");

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
  } else {
    alert("navegador não suporta geolozalicação");
  }
  function setPosition(position) {
    console.log(position);
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    coordResults(lat, long);
  }
  function showError(error) {
    alert(`erro: ${error.message}`);
  }
});

function coordResults(lat, long) {
  fetch(
    `${api.base}weather?lat=${lat}&lon=${long}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`http error: status ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      alert(error.message);
    })
    .then((response) => {
      displayResults(response);
    });
}

function displayResults(weather) {
  console.log(weather);

  let iconName = weather.weather[0].icon;
  container_img.innerHTML = `<img src="./assets/img/${iconName}.png">`;

  let weather_tempo = weather.weather[0].description;

  let temperature = `${Math.round(weather.main.temp)}`;
  temp_number.innerHTML = capitalizeFirstLetter(weather_tempo);

  low_high.innerText = `▼ ${Math.round(
    weather.main.temp_min
  )}°c   |   ▲ ${Math.round(weather.main.temp_max)}°c`;

  cidade.innerText = `${weather.name}, ${weather.sys.country}`;

  cont_rain.innerHTML = weather.rain[0] + " mm";
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
