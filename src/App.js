import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const apiKey = "733bc26ccf6f1f62a51e07402f57b58b"; // Replace with your OpenWeatherMap API key

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching the weather data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 text-white">
      <h1 className="text-4xl font-bold mb-4">Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="mb-4 p-2 rounded text-black w-64"
      />
      <button
        onClick={fetchWeather}
        className="mb-4 px-4 py-2 bg-white text-blue-600 rounded shadow-lg hover:bg-gray-200"
      >
        Get Weather
      </button>
      {weather && (
        <div className="bg-white p-4 rounded shadow-lg text-center text-blue-600">
          <h2 className="text-2xl font-bold">{weather.name}</h2>
          <p className="text-xl">{weather.weather[0].description}</p>
          <p className="text-xl">{weather.main.temp}°C</p>
          <p className="text-lg">Humidity: {weather.main.humidity}%</p>
          <p className="text-lg">Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
