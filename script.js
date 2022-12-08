let weather = {
  apiKey: "b703101a361c8b2a93636e1ba44fa28f",
  fetchdata: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.fetchWeather(data));
  },

  fetchWeather: function (data) {
    const { name } = data;
    const { temp, humidity } = data.main;
    const { description, icon } = data.weather[0];
    const { speed } = data.wind;
    console.log(name, temp, humidity, description, speed);
    document.querySelector(".cityname").innerText = name;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind Speed: " + speed + "km/hr";
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/random/1920x1080/?" + name + "')";
  },

  search: function () {
    this.fetchdata(document.querySelector(".cityinput").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".cityinput")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
