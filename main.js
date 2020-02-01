//select elements
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// further explanation on queryselector
// https://www.w3schools.com/jsref/met_document_queryselector.asp
// querySelectorAll()
// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_document_queryselectorall_class

// App data
const weather = {};

weather.temperature = {
    unit: "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
//API key
const key = "853b5d2ce3bb8180f0b86df75c062cd5";

//check if browser support geolocation
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
    //exp for this, very important, navigator, geolocation, getCurrentlocation
    // https://www.w3schools.com/html/html5_geolocation.asp
    // explanation in operator
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

//Set users functionn
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

//show error when there is an issue with geolocation service
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

//get weather from api provider
function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function () {
            displayWeather();
        });
}

// display weather
function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// C to F conversion
function celsiusToFahrenhiet(temperature) {
    return (temperature * 9 / 5) + 32;
}

//when the user clicks on the tempearature element
tempElement.addEventListener("click", function () {           //exp on event listner
    if (weather.temperature.value === undefined)
        return;
    if (weather.temperature.unit == 'celsius') {
        let fahrenheit = celsiusToFahrenhiet(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}0<span>C</span>`;
        weather.temperature.unit = "fahrenheit";
    } else {
        weather.innerHTML = `${weather.temperature.value}0<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});


// understanding promise
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises