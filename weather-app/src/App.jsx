import React, { useState } from 'react';
import SearchBar from './components/SearchBar';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state
  const [error, setError] = useState(''); // New error state

  const fetchWeather = async (city) => {
    const API_KEY = "d7d0bcb09492f1cd50087a3d3f64fd55";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    setLoading(true); // Show loading indicator
    setError(''); // Clear previous errors

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (response.ok) {
        setWeather({
          city: data.name,
          temperature: data.main.temp,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          pressure: data.main.pressure,
        });
      
      } else {
        setError('City not found!');
        setWeather(null);
      }
    } catch (error) {
      setError('Failed to fetch weather data. Please try again later.');
      setWeather(null); 
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const handleSearch = (city) => {
    fetchWeather(city);
  };

  return (
    <div className="min-h-screen bg-purple-700 flex flex-col items-center justify-center">
      <h1 className="text-4xl text-purple-100 font-bold mb-8  ">KNOWEATHER</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p className="text-purple-500 mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {weather && (
        <div className="mt-8 p-6 bg-purple-600 text-purple-100 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold">{weather.city}</h2>
          <p className="text-lg">Temperature: {weather.temperature}°F</p>
          <p className="text-lg">Description: {weather.description}</p>
          <p className="text-lg">Humidity: {weather.humidity}%</p>
          <p className="text-lg">Wind Speed: {weather.windSpeed} m/s</p>
          <p className="text-lg">Pressure: {weather.pressure} mb</p>
          <img
            className="mx-auto mt-4 text-9xl"
            src={`http://openweathermap.org/img/w/${weather.icon}.png`}
            alt="weather icon"
          />
        </div>
      )}
    </div>
  );
};

export default App;