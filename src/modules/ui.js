// UI Module using Factory Function Pattern

export const createWeatherUI = () => {
    // Private elements
    const locationForm = document.getElementById('location-form');
    const locationInput = document.getElementById('location-input');
    const weatherResultsContainer = document.getElementById('weather-results');
  
    // Private methods
    const createWeatherCard = (weatherData) => {
      return `
        <div class="weather-card">
          <div class="weather-card-header">
            <h2 class="location-name">${weatherData.location}</h2>
            <p class="weather-date">${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="weather-card-main">
            <div class="temperature-section">
              <h3 class="main-temperature">${weatherData.temperature.current.toFixed(1)}°C</h3>
              <p class="feels-like">Feels like ${weatherData.temperature.feelsLike.toFixed(1)}°C</p>
            </div>
            
            <div class="weather-details">
              <div class="detail-item">
                <span class="detail-icon">💧</span>
                <span class="detail-value">${weatherData.humidity}%</span>
                <span class="detail-label">Humidity</span>
              </div>
              
              <div class="detail-item">
                <span class="detail-icon">🌬️</span>
                <span class="detail-value">${weatherData.windSpeed} km/h</span>
                <span class="detail-label">Wind Speed</span>
              </div>
              
              <div class="detail-item">
                <span class="detail-icon">☁️</span>
                <span class="detail-value">${weatherData.conditions.description}</span>
                <span class="detail-label">Conditions</span>
              </div>
            </div>
          </div>
        </div>
      `;
    };
  
    const showLoading = () => {
      weatherResultsContainer.innerHTML = `
        <div class="loading-spinner">
          <div class="spinner"></div>
          <p>Fetching weather data...</p>
        </div>
      `;
    };
  
    const showError = (message) => {
      weatherResultsContainer.innerHTML = `
        <div class="error-card">
          <p>❌ ${message}</p>
        </div>
      `;
    };
  
    // Public methods
    const renderWeatherData = (weatherData) => {
      weatherResultsContainer.innerHTML = createWeatherCard(weatherData);
    };
  
    const bindSubmitEvent = (callback) => {
      locationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const location = locationInput.value.trim();
        
        if (!location) {
          showError('Please enter a location');
          return;
        }
        
        showLoading();
        callback(location);
      });
    };
  
    // Return public interface
    return {
      renderWeatherData,
      bindSubmitEvent,
      showError,
      showLoading
    };
  };