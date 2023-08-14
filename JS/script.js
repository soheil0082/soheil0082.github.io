const apikey = "53574d2403c018ff382b30bae246ac03";

let form = document.querySelector("form");
let input = document.querySelector("input");
let errorSection = document.querySelector("section");
let cardArchive = document.querySelector(".card-archive");
let currentCity = document.querySelector(".currentCity");
let cities = [];

form.addEventListener("submit", searchCity);
if (JSON.parse(localStorage.getItem("cities")) != null)
  cities = JSON.parse(localStorage.getItem("cities"));
renderCards();

function searchCity(e) {
  e.preventDefault();
  let name = input.value;
  input.value = "";

  renderCards();
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apikey}&units=metric`
  )
    .then((response) => {
      errorSection.innerHTML = "";
      return response.json();
    })
    .then((data) => {
      console.log(data);
      currentCity.innerHTML = `
      <div class="name">
      <img src="Img/${data.weather[0].main.toLowerCase()}.png" class="weather-icon --main" />
      <h2 class="city">${data.name}</h2>
    </div>
    <div class="temp">
      <h3 class="temp">${data.main.temp}°C</h3>
      <div class="minMax">
        <h3 style="color: #b05150">
          <i class="fa-solid fa-angle-down"></i>${data.main.temp_min}°C
        </h3>
        <h3 style="color: #47ae74">
          <i class="fa-solid fa-angle-up"></i> ${data.main.temp_max}°C
        </h3>
      </div>
    </div>
    <div class="details" style="gap: 2rem">
      <div class="col">
        <img src="Img/humidity.png" style="width: 50px" />
        <div>
          <p class="humidity">${data.main.humidity}%</p>
          <p>Humidity</p>
        </div>
      </div>
      <div class="col">
        <img src="Img/wind.png" style="width: 50px" />
        <div>
          <p class="wind">${data.wind.speed} km/h</p>
          <p>Wind Speed</p>
        </div>
      </div>
    </div>
    `;
      let temp = {
        name: data.name,
        temp: data.main.temp,
        min_temp: data.main.temp_min,
        max_temp: data.main.temp_max,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        img: data.weather[0].main,
      };
      cities.push(temp);
      localStorage.setItem("cities", JSON.stringify(cities));
    })
    .catch(function () {
      errorSection.innerHTML = `
      <div class="alert">
       <span class="alert-info">
        <span class="alert-message">
         <div class="icon-container">
           <i
              class="fa-solid fa-triangle-exclamation"
              style="
                color: #272829;
                background-color: #ef974b;
                font-size: 30px;
                padding: 5px;
              "
           ></i>
          </div>
          <span class="error-text"> This city doesn't exist </span>
          <div class="icon-container">
            <i
              class="fa-solid fa-xmark"
              style="color: #ef974b; padding: 12px 11px"
            ></i>
          </div>
        </span>
      </span>
    </div>
`;
    });
}

function renderCards() {
  cardArchive.innerHTML = "";
  cities.forEach((item) => {
    cardArchive.innerHTML += `
    <div class="card">
    <img src="Img/${item.img.toLowerCase()}.png" class="weather-icon" />
    <h2 class="city">${item.name}</h2>
    <h3 class="temp">${item.temp}°C</h3>
    <div class="minMax">
      <h3 style="color: #b05150">
        <i class="fa-solid fa-angle-down"></i> ${item.min_temp}°C
      </h3>
      <h3 style="color: #47ae74">
        <i class="fa-solid fa-angle-up"></i> ${item.max_temp}°C
      </h3>
    </div>
    <div class="details">
      <div class="col">
        <img src="Img/humidity.png" />
        <div>
          <p class="humidity">${item.humidity}%</p>
          <p>Humidity</p>
        </div>
      </div>
      <div class="col">
        <img src="Img/wind.png" />
        <div>
          <p class="wind">${item.wind} km/h</p>
          <p>Wind Speed</p>
        </div>
      </div>
    </div>
  </div>
  `;
  });
}
