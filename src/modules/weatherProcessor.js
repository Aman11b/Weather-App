export function processWeatherData(rawData) {
    try {
        if (!rawData || !rawData.days || rawData.days.length === 0) {
            throw new Error('Invalid weather data structure');
        }
        
        const currentDay = rawData.days[0];

        const weatherType = classifyWeatherType(
            currentDay.conditions,
            currentDay.cloudcover,
            currentDay.precipprob
        );

        const processedWeather = {
            location: rawData.resolvedAddress || 'Unknown Location',
            temperature: {
                current: {
                    celsius: currentDay.temp,
                    fahrenheit: convertTemperature(currentDay.temp, 'F')
                },
                feelsLike: {
                    celsius: currentDay.feelslike,
                    fahrenheit: convertTemperature(currentDay.feelslike, 'F')
                },
                max: {
                    celsius: currentDay.tempmax,
                    fahrenheit: convertTemperature(currentDay.tempmax, 'F')
                },
                min: {
                    celsius: currentDay.tempmin,
                    fahrenheit: convertTemperature(currentDay.tempmin, 'F')
                }
            },
            conditions: {
                description: currentDay.conditions || 'No Data',
                icon: currentDay.icon,
                weatherType: weatherType
            },
            humidity: currentDay.humidity,
            windSpeed: currentDay.windspeed,
            precipitation: currentDay.precipprob,
            date: currentDay.datetime || new Date().toISOString(),
            cloudCover: currentDay.cloudcover
        };

        return processedWeather;
    } catch (error) {
        console.error('Error processing weather data: ', error);
        throw new Error('Failed to process weather data');
    }
}

function classifyWeatherType(conditions, cloudCover, precipProbability) {
    const conditionsLower = conditions.toLowerCase();
    
    if (precipProbability > 50) {
        if (conditionsLower.includes('snow')) return 'SNOW';
        if (conditionsLower.includes('rain')) return 'RAIN';
        if (conditionsLower.includes('storm')) return 'STORM';
    }

    if (cloudCover > 70) return 'CLOUDY';
    if (conditionsLower.includes('clear')) return 'CLEAR';
    if (conditionsLower.includes('partly cloudy')) return 'PARTLY_CLOUDY';

    return 'UNKNOWN';
}

export function convertTemperature(temp, unit = 'C') {
    return unit === 'F' 
        ? parseFloat(((temp * 9/5) + 32).toFixed(1)) 
        : parseFloat(temp.toFixed(1));
}