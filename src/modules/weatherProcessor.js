// Weather Data Processing Module

// Function to extract and transform weather data

export function processWeatherData(rawData){
    
    // Step 1: Log the raw data to understand its structure
    // console.log('Raw Weather Data to process: ',rawData);

    try {
        // Current day's weather details
        if(!rawData || !rawData.days || rawData.days.length===0){
            throw new Error('Invalid weather data structure');
        }
        const currentDay=rawData.days[0];
        // console.log(currentDay);

        const weatherType=classifyWeatherType(
            currentDay.conditions,
            currentDay.cloudcover,
            currentDay.precipprob
        );

        // Step 3: Create a structured weather object
        const processedWeather={
            location: rawData.resolvedAddress || 'Unknown Location',

            // Temperature data
            temperature:{
                current:currentDay.temp,
                feelsLike:currentDay.feelslike,
                max:currentDay.tempmax,
                min:currentDay.tempmin
            },

            // Conditions
            conditions:{
                description:currentDay.conditions || 'No Data',
                icon:currentDay.icon,
                weatherType:weatherType
            },
            // Additional details
            humidity: currentDay.humidity,
            windSpeed: currentDay.windspeed,
            precipitation: currentDay.precipprob,
            date: currentDay.datetime || new Date().toISOString(),
            cloudCover:currentDay.cloudcover
        };

        console.log('Processed Weather Data->: ',processedWeather);
        return processedWeather;
        
    } catch (error) {
        console.log('Error processing weather data: ',error);
        throw new Error('Failed to process weather data');
        
    }

}
function classifyWeatherType(conditions,cloudCover,precipProbability){

    const conditionsLower = conditions.toLowerCase();
    // Precipitation Check
    if (precipProbability > 50) {
        if (conditionsLower.includes('snow')) return 'SNOW';
        if (conditionsLower.includes('rain')) return 'RAIN';
        if (conditionsLower.includes('storm')) return 'STORM';
    }

    // Cloud Cover Check
    if (cloudCover > 70) return 'CLOUDY';

    // Temperature and Sun Conditions
    if (conditionsLower.includes('clear')) return 'CLEAR';
    if (conditionsLower.includes('partly cloudy')) return 'PARTLY_CLOUDY';

    return 'UNKNOWN';

}
export function convertTemperature(temp,unit='C'){
    if(unit==='F'){
        return (temp*9/5)+32;
    }
    return temp;
}