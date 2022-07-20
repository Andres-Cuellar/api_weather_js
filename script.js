let dataTemp;
let city;

function searchCity() {
  city = document.querySelector(".city").value;
  if (city == "") {
    alert("Debes escribir una ciudad");
  } else {
    fetchAPI(city);
  }
}

const fetchAPI = async function (city) {
  let urlAPI = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&APPID=b7d956b76a51e345c53b4e557d4b389b`;
  let dataTemp = await fetch(urlAPI);
  let res = await dataTemp.json();
  return temperatureHTML(res);
};

async function temperatureHTML(res) {
  console.log(res);
  let lat = res.coord.lat;
  let lon = res.coord.lon;

  let temp = res.main.temp;
  let tempMax = res.main.temp_max;
  let tempMin = res.main.temp_min;
  let cityResult = res.name;
  let humidity = res.main.humidity;

  let weather = res.weather[0].description;
  let weatherIcon = res.weather[0].icon;

  let date = new Date();
  console.log(date.toLocaleDateString());

  let country = res.sys.country;

  let windSpeed = res.wind.speed;
  let windDeg = res.wind.deg;

  let html = `
  <div class="card__weather__row-text rain">
    <h2 class="card__weather__temp"> ${temp}°C</h2>
    <div class="card__weather__temp__row"><p>${weather}</p> 
    <img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png">
    </div>    
    <br />
    <hr />
    <br />
    <h2>${cityResult}, ${country}</h2>
    <p>Martes, 19 Junio 2022</p>
  </div>
  <div class="card__weather__row-map">
    <div id="map" class="map"></div>
    <div class="card__weather__temp__row">
      <p>Temperatura mínima</p>
      <p>Temperatura máxima</p>
    </div>
    <div class="card__weather__temp__row">
      <h3 class="card__weather__temp__min">${tempMin}°C</h3>
      <h3 class="card__weather__temp__max">${tempMax}°C</h3>
    </div>
    <div class="card__weather__temp__row--background">
      <h4>Humedad ${humidity}%</h4>
      <h4>Viento ${windSpeed} km/h | Direccion ${windDeg}°</h4>
    </div>
  </div>`;

  let card__weather = document.querySelector("#card__weather");
  card__weather.classList.add("card__weather");
  card__weather.innerHTML = html;

  showMap(lat, lon);

  emptyInput();
}

function emptyInput() {
  document.querySelector(".city").value = "";
}

function showMap(lat, lon) {
  var map = L.map("map").setView([lat, lon], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);
}
