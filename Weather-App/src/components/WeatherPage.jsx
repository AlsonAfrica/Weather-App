import React, { useState, useEffect } from 'react';
import { getWeather } from '../services/api';
import WeatherCard from './WeatherCard';

function WeatherPage() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('London');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeather(location);
        setWeather(data);
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    };

    fetchWeather();
  }, [location]);

  return (
    <div>
      <h2>Weather</h2>
      <WeatherCard weather={weather} />
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    </div>
  );
}

export default WeatherPage;
