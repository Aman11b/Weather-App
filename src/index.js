import './styles/main.css';
import { fetchWeatherData } from './modules/api';

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
        // Fetch weather data
        const weatherData=await fetchWeatherData(location);

        console.log('Weather Data for',location, ':', weatherData);
    }catch(error){
        console.error('Error in form submission: ',error);
    }
});