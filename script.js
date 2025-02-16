const OPENWEATHER_API_KEY = 'YOUR_API_KEY'; // Replace with your key

async function getCityInfo() {
    const city = document.getElementById('cityInput').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = 'Loading...';

    try {
        // 1. Get country data from RestCountries
        const countryResponse = await fetch(`https://restcountries.com/v3.1/capital/${city}`);
        const countryData = await countryResponse.json();
        
        // 2. Get weather from OpenWeather
        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPENWEATHER_API_KEY}`
        );
        const weatherData = await weatherResponse.json();
        
        // 3. Get Wikipedia summary
        const wikiResponse = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${city}`
        );
        const wikiData = await wikiResponse.json();

        // Display results
        resultsDiv.innerHTML = `
            <h2>${city}</h2>
            <p>Country: ${countryData[0].name.common}</p>
            <p>Population: ${countryData[0].population.toLocaleString()}</p>
            <img src="${countryData[0].flags.png}" alt="Flag" width="100">
            <p>Current Temperature: ${weatherData.main.temp}°C</p>
            <p>Weather: ${weatherData.weather[0].description}</p>
            <p>Wikipedia Summary: ${wikiData.extract}</p>
        `;
    } catch (error) {
        resultsDiv.innerHTML = 'Error fetching data. Please try another city.';
    }
}