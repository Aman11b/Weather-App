export const createWeatherUI = () => {
    const locationForm = document.getElementById('location-form');
    const locationInput = document.getElementById('location-input');
    const weatherResultsContainer = document.getElementById('weather-results');
    const body = document.body;

    // Weather Type to Gradient Mapping
    const weatherGradients = {
        'CLEAR': 'var(--gradient-clear)',
        'CLOUDY': 'var(--gradient-cloudy)',
        'RAIN': 'var(--gradient-rainy)',
        'STORM': 'var(--gradient-stormy)',
        'SNOW': 'linear-gradient(135deg, #A1C4FD, #C2E9FB)',
        'PARTLY_CLOUDY': 'var(--gradient-sunny)',
        'UNKNOWN': 'linear-gradient(135deg, #ECF0F1, #BDC3C7)'
    };

    const createWeatherCard = (weatherData) => {
        const { weatherType } = weatherData.conditions;
        
        // Apply gradient background
        body.style.background = weatherGradients[weatherType] || weatherGradients['UNKNOWN'];
        body.style.backgroundSize = '400% 400%';
        body.style.animation = 'gradientAnimation 15s ease infinite';

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
                        <p class="weather-type">${weatherType.replace('_', ' ')}</p>
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

    // Rest of the code remains the same as previous implementation
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

    return {
        renderWeatherData,
        bindSubmitEvent,
        showError,
        showLoading
    };
};