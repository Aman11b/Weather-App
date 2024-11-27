import './styles/main.css';
import { fetchWeatherData } from './modules/api';
import { processWeatherData } from './modules/weatherProcessor';
import { createWeatherUI } from './modules/ui';

// Initialize the Weather UI
const weatherUI = createWeatherUI();

// Bind submit event with error handling
weatherUI.bindSubmitEvent(async (location) => {
    try {
        // Fetch raw weather data
        const rawWeatherData = await fetchWeatherData(location);
        
        // Process the raw weather data
        const processedWeather = processWeatherData(rawWeatherData);
        
        // Render the processed weather data
        // IMPORTANT: Fixed the typo here - use processedWeather, not processWeatherData
        weatherUI.renderWeatherData(processedWeather);
    } catch (error) {
        // Show error if anything goes wrong
        weatherUI.showError(error.message);
    }
});