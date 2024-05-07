document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.getElementById('searchButton');
  const cityInput = document.getElementById('cityInput');
  const weatherInfo = document.getElementById('weatherInfo');

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
    const apiKey = '7c4526ce8bb9ad80290a3867fdc6818f';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const description = data.weather[0].description;
        const temperature = Math.round(data.main.temp); // Round the temperature to the nearest integer
        weatherInfo.innerHTML = `Weather: ${description}, Temperature: ${temperature}\u00B0C`;
      })
      .catch(error => {
        console.error('Error fetching weather:', error);
        weatherInfo.innerHTML = 'Error fetching weather data';
      });
  }
});
