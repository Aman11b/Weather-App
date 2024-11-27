import './styles/main.css';
import { fetchWeatherData } from './modules/api';
import { processWeatherData } from './modules/weatherProcessor';

document.getElementById('location-form').addEventListener('submit',async(e)=>{
    e.preventDefault();

    // Get the location input
    const locationInput=document.getElementById('location-input');
    const location=locationInput.value.trim();

    if(!location){
        console.error('Please enter a location');
        return;
    }

    try{
        // Step 1: Fetch raw weather data
        const rawWeatherData=await fetchWeatherData(location);

        // Step 2: Process the raw data
        const processedWeather=processWeatherData(rawWeatherData);

        // Step 3: Display processed data (we'll create a UI module later)
        displayWeatherData(processedWeather);

    }catch(error){
        console.error('Error in form submission: ',error);
    }
});

function displayWeatherData(weatherData){
    const resultDiv=document.getElementById('weather-results');
    resultDiv.innerHTML=`<h2>Weather in ${weatherData.location}</h2>
    <p>Temperature: ${weatherData.temperature.current}°C</p>
    <p>Conditions: ${weatherData.conditions.description}</p>
    <p>Humidity: ${weatherData.humidity}%</p>
    <p>Wind Speed: ${weatherData.windSpeed} km/h</p>
    `;
}