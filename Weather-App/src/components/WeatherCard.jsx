import React from 'react';

function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <div>
      <h3>{weather.location.name}</h3>
      <p>Temperature: {weather.current.temp_c}°C</p>
      <p>Humidity: {weather.current.humidity}%</p>
      <p>Wind Speed: {weather.current.wind_kph} kph</p>
    </div>
  );
}

export default WeatherCard;
