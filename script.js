// Event Listener to get the location input
document.getElementById("get-weather-btn").addEventListener('click', async () => {

    //get the user entered location
    const location = document.getElementById("location-input").value.trim();

    //fetch the weather data
    const weatherData = await getweatherData(location);

    //Display the weather data on the page
    displayWeatherData(weatherData);
});

const getweatherData = async (location) => {
    if(!location){
        return{};
    }
    
    const apiKey='dbed773b69b0006961293ee48560c6f9';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);
    return data;
}

function getBackgroundColor(temperature) {
    if(temperature < 0) {
        return 'lightblue';
    }else if(temperature < 10){
        return 'lightgreen';
    }else if(temperature < 20){
        return 'lightyellow';
    }else if(temperature < 30){
            return 'lightsalmon';
   }else{
      return 'lightcoral';
    }
}

const displayWeatherData = (data) => {
    const weatherDataElement = document.getElementById('weather-data');

    // Handle empty input
    if (!data || Object.keys(data).length === 0) {
        weatherDataElement.innerHTML = "Please enter a location";
        weatherDataElement.style.backgroundColor = 'lightgray';
        return;
    }

    // Handle API error response (e.g., invalid location)
    if (data.cod !== 200) {
        weatherDataElement.innerHTML = `Location not found. Please check the spelling or try a nearby city`;

        weatherDataElement.style.backgroundColor = 'lightgray';
        return;
    }

    // Convert temperature from Kelvin to Celsius
    const temperatureCelsius = Math.floor(data.main.temp - 273.15);
    const backgroundColor = getBackgroundColor(temperatureCelsius);

    // Display weather data
    weatherDataElement.style.backgroundColor = backgroundColor;
    weatherDataElement.innerHTML = `
        <h3>${data.name}</h3>
        <p>Temperature: ${temperatureCelsius}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
};


window.onload = async () => {
    console.log("hai");
    // Optional: set a default location like "London"
    const defaultLocation = "Dubai";
    const weatherData = await getweatherData(defaultLocation);
    displayWeatherData(weatherData);
}

/* What is data.main?
When you call the OpenWeatherMap API for current weather data, it sends back a JSON object like this (simplified for clarity):
{
    "name": "London",
    "main": {
      "temp": 289.5,
      "feels_like": 287.4,
      "temp_min": 288.71,
      "temp_max": 290.93,
      "pressure": 1012,
      "humidity": 82
    },
    "wind": {
      "speed": 4.1
    },
    ...
  }*/ 
  
















