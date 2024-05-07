document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.getElementById('searchButton');
  const cityInput = document.getElementById('cityInput');
  const weatherInfo = document.getElementById('weatherInfo');
  const timeDisplay = document.getElementById('time');

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
    const apiKey = 'YOUR API KEY';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const description = data.weather[0].description;
        const temperature = Math.round(data.main.temp);
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const rainfall = data.rain ? data.rain['1h'] : 0;

        weatherInfo.innerHTML = `Weather: ${description}<br>
                                  Temperature: ${temperature}\u00B0C<br>
                                  Humidity: ${humidity}%<br>
                                  Wind Speed: ${windSpeed} m/s<br>
                                  Rainfall: ${rainfall} mm`;

        // Update time display
        const date = new Date();
        const time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        timeDisplay.innerText = `Last updated: ${time}`;
      })
      .catch(error => {
        console.error('Error fetching weather:', error);
        weatherInfo.innerHTML = 'Error fetching weather data';
      });
  }
});
