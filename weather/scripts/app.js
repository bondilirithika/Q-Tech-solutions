// OpenWeatherMap API Key
const apiKey = "3266920e5fc2d8e908eaec74584e045f"; 

// DOM Elements
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherDetails = document.getElementById("weather-details");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const description = document.getElementById("description");

// Fetch Weather Data
async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

// Display Weather Data
function displayWeather(data) {
    weatherDetails.style.display = "block";
    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    description.textContent = `Description: ${data.weather[0].description}`;

    // Update Background
    updateBackground(data.weather[0].main.toLowerCase());
}

// Update Background Image
function updateBackground(weatherType) {
    const body = document.body;
    switch (weatherType) {
        case "clear":
            body.style.backgroundImage = "url('assets/backgrounds/sunny.jpg')";
            break;
        case "clouds":
            body.style.backgroundImage = "url('assets/backgrounds/cloudy.jpg')";
            break;
        
        case "drizzle":
            body.style.backgroundImage = "url('assets/backgrounds/rainy.jpg')";
            break;
        default:
            body.style.backgroundImage = "url('assets/backgrounds/default.jpg')";
            break;
    }
}

// Event Listener
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
});
