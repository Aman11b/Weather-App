// Weather Data Processing Module

// Function to extract and transform weather data

export function processWeatherData(rawData){
    
    // Step 1: Log the raw data to understand its structure
    console.log('Raw Weather Data to process: ',rawData);

    try {
        // current day's weather details
        if(!rawData || !rawData.days || rawData.days.length===0){
            throw new Error('Invalid weather data structure');
        }
        const currentDay=rawData.days[0];
        console.log(currentDay);

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
                icon:currentDay.icon
            },
            // Additional details
            humidity: currentDay.humidity,
            windSpeed: currentDay.windspeed,
            precipitation: currentDay.precipprob,
            
            // Date information
            date: currentDay.datetime || new Date().toISOString()
        };

        console.log('Processed Weather Data->: ',processedWeather);
        return processedWeather;
        
    } catch (error) {
        console.log('Error processing weather data: ',error);
        throw new Error('Failed to process weather data');
        
    }

}
export function convertTemperature(temp,unit='C'){
    if(unit==='F'){
        return (temp*9/5)+32;
    }
    return temp;
}