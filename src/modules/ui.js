export const createWeatherUI = () => {
    const locationForm = document.getElementById('location-form');
    const locationInput = document.getElementById('location-input');
    const weatherResultsContainer = document.getElementById('weather-results');
    const celsiusToggle = document.getElementById('celsius-toggle');
    const fahrenheitToggle = document.getElementById('fahrenheit-toggle');

    let currentTemperatureUnit = 'C';
    let currentWeatherData = null;

    // More Vibrant and Diverse Gradients
    const weatherGradients = {
        'CLEAR': 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
        'CLOUDY': 'linear-gradient(135deg, #5D6D7E, #34495E)',
        'RAIN': 'linear-gradient(135deg, #2980B9, #6DD5FA)',
        'STORM': 'linear-gradient(135deg, #141E30, #243B55)',
        'SNOW': 'linear-gradient(135deg, #83A4D4, #B0CBE3)',
        'PARTLY_CLOUDY': 'linear-gradient(135deg, #FFC300, #FF5733)',
        'UNKNOWN': 'linear-gradient(135deg, #ECF0F1, #BDC3C7)'
    };

    // Text Color Mapping based on Gradient
    const getTextColor = (weatherType) => {
        const colorMap = {
            'CLEAR': '#FFFFFF', // White text for bright/warm gradients
            'CLOUDY': '#F0F0F0', // Light gray for darker gradients
            'RAIN': '#E0E0E0',   // Soft light gray for rainy gradients
            'STORM': '#FFFFFF',  // White for dark storm gradients
            'SNOW': '#2C3E50',   // Dark text for light snow gradients
            'PARTLY_CLOUDY': '#FFFFFF', // White for sunny gradients
            'UNKNOWN': '#2C3E50' // Default dark text
        };
        return colorMap[weatherType] || '#2C3E50';
    };

    const createWeatherCard = (weatherData) => {
        const { weatherType } = weatherData.conditions;
        const gradient = weatherGradients[weatherType] || weatherGradients['UNKNOWN'];
        const textColor = getTextColor(weatherType);
        
        const temperature = currentTemperatureUnit === 'C' 
            ? weatherData.temperature.current.celsius 
            : weatherData.temperature.current.fahrenheit;

        const feelsLike = currentTemperatureUnit === 'C' 
            ? weatherData.temperature.feelsLike.celsius 
            : weatherData.temperature.feelsLike.fahrenheit;

        return `
            <div class="weather-card" style="
                background: ${gradient}; 
                background-size: 400% 400%; 
                animation: gradientAnimation 15s ease infinite;
                color: ${textColor};
            ">
                <div class="weather-card-header" style="color: ${textColor};">
                    <h2 class="location-name" style="color: ${textColor};">${weatherData.location}</h2>
                    <p class="weather-date" style="color: ${textColor};">${new Date().toLocaleDateString()}</p>
                </div>
                
                <div class="weather-card-main">
                    <div class="temperature-section">
                        <h3 class="main-temperature" style="color: ${textColor};">
                            ${temperature.toFixed(1)}°${currentTemperatureUnit}
                        </h3>
                        <p class="feels-like" style="color: ${textColor};">
                            Feels like ${feelsLike.toFixed(1)}°${currentTemperatureUnit}
                        </p>
                        <p class="weather-type" style="color: ${textColor};">
                            ${weatherType.replace('_', ' ')}
                        </p>
                    </div>
                    
                    <div class="weather-details">
                        <div class="detail-item" style="color: ${textColor};">
                            <span class="detail-icon">💧</span>
                            <span class="detail-value" style="color: ${textColor};">
                                ${weatherData.humidity}%
                            </span>
                            <span class="detail-label" style="color: ${textColor};">
                                Humidity
                            </span>
                        </div>
                        
                        <div class="detail-item" style="color: ${textColor};">
                            <span class="detail-icon">🌬️</span>
                            <span class="detail-value" style="color: ${textColor};">
                                ${weatherData.windSpeed} km/h
                            </span>
                            <span class="detail-label" style="color: ${textColor};">
                                Wind Speed
                            </span>
                        </div>
                        
                        <div class="detail-item" style="color: ${textColor};">
                            <span class="detail-icon">☁️</span>
                            <span class="detail-value" style="color: ${textColor};">
                                ${weatherData.conditions.description}
                            </span>
                            <span class="detail-label" style="color: ${textColor};">
                                Conditions
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    // Temperature Toggle Setup
    const setupTemperatureToggle = () => {
        celsiusToggle.addEventListener('click', () => {
            currentTemperatureUnit = 'C';
            celsiusToggle.classList.add('active');
            fahrenheitToggle.classList.remove('active');
            if (currentWeatherData) renderWeatherData(currentWeatherData);
        });

        fahrenheitToggle.addEventListener('click', () => {
            currentTemperatureUnit = 'F';
            fahrenheitToggle.classList.add('active');
            celsiusToggle.classList.remove('active');
            if (currentWeatherData) renderWeatherData(currentWeatherData);
        });
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

    const renderWeatherData = (weatherData) => {
        currentWeatherData = weatherData;
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

    // Initialize temperature toggle
    setupTemperatureToggle();

    return {
        renderWeatherData,
        bindSubmitEvent,
        showError,
        showLoading
    };
};