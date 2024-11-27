const API_KEY='4VZN4YQXUHN67JFE8ZFW6SXDZ'
const BASE_URL='https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';


export async function fetchWeatherData(location){

    // Step 1: Construct the full URL
    const url=`${BASE_URL}${location}?key=${API_KEY}`;

    // Step 2: Log the URL to understand what we're sending
    console.log('Requesting URL: ',url);

    try{
        // Step 3: Make the API request
        const response=await fetch(url);

        // Step 4: Log the raw response to see what we get
        console.log('Raw Response: ',response);

        // Step 5: Check if the response is okay
        if(!response.ok){
            console.error('API Response Error: ',response.status,response.statusText);
            throw new Error('Weather data fetch failed');
        }

        // Step 6: Parse the JSON response
        const data=await response.json();

        // Step 7: Log the parsed data to inspect its structure
        console.log('Parsed Weather Data: ',data);

        // Return the data for further processing
        return data;
    }catch(error){

        // Step 8: Handle any errors that occur during the fetch
        console.log('Error fetching weather data:', error);
        throw error;
    }
}