window.addEventListener('load', () => {
  let long; // longitude
  let lat; // latitude
  let temperatureDescription = document.querySelector(
    '.temperature-description'
  );
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const PROXY = 'https://cors-anywhere.herokuapp.com/';
      const API = `${PROXY}https://api.darksky.net/forecast/95b3e84185bd3be62d8a2802d19e7cf2/${lat},${long}`;
      // retrieve info from API
      fetch(API)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { temperature, summary } = data.currently;
          // Set DOM elements from API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
        });
    });
  }
});
