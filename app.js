//API Key
const apiKey = '6dc677dca00447d1f965df89aa62c00f';
//Fetching data from API key 
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityElem = document.getElementById('city');
const temperatureElem = document.getElementById('temperature');
const conditionElem = document.getElementById('condition');
const humidityElem = document.getElementById('humidity');
const windSpeedElem = document.getElementById('wind-speed');
const precipitationElem = document.getElementById('precipitation');

// Function to fetch weather data
async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.cod === '404') {
            alert('City not found!');
            return;
        }

        // Updating the UI with the fetched weather data
        cityElem.textContent = data.name;
        temperatureElem.textContent = `${Math.round(data.main.temp)}°C`;
        conditionElem.textContent = data.weather[0].description;
        humidityElem.textContent = `${data.main.humidity}%`;
        windSpeedElem.textContent = `${data.wind.speed} km/h`;
        precipitationElem.textContent = `${data.clouds.all}%`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Event listener for the search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});

// Auto-fetch weather on pressing Enter key
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    }
});
