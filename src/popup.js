document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.getElementById('searchButton');
  const cityInput = document.getElementById('cityInput');
  const weatherInfo = document.getElementById('weatherInfo');
  const lastUpdated = document.getElementById('lastUpdated');

  // Function to fetch weather data when the user presses Enter
  cityInput.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) { // Enter key
      event.preventDefault();
      searchWeather();
    }
  });

  // Function to fetch weather data when the user clicks the search button
  searchButton.addEventListener('click', searchWeather);

  function searchWeather() {
    const city = cityInput.value.trim();
    if (city !== '') {
      fetchWeather(city);
    }
  }

  function fetchWeather(city) {
    const apiKey = '571a1df27ac8b5151ee3bc7cce5dc929';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const description = data.weather[0].description;
        const temperature = Math.round(data.main.temp);
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const rainfall = data.rain ? data.rain['1h'] : 0;

        weatherInfo.innerHTML = `Temperature: ${temperature}\u00B0C<br>
                                  Rainfall: ${rainfall} mm<br>
                                  Wind Speed: ${windSpeed} m/s<br>
                                  Humidity: ${humidity}%<br>
                                  Weather: ${description}`;

        // Update last updated time
        const date = new Date();
        const time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        lastUpdated.innerText = `Last updated: ${time}`;
      })
      .catch(error => {
        console.error('Error fetching weather:', error);
        weatherInfo.innerHTML = 'Error fetching weather data';
      });
  }
});
