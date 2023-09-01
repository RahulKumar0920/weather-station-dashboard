import React, { useState } from "react";
import axios from "axios";
import "../components/Dashboard.css";
import Globe from "./Globe";
import logo from "../assets/not-found.png";

function DashBoard() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "d832bf1f121bb3fe2fd2dc1a6e3b4523"; 

  //Function : To fetch weather & city data from the api
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`, //API
      );
      setWeatherData(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError("City not found or an error occurred.");
      setWeatherData(null);
    }
  };

  return (
    //Implementaion of UI
    <div className="App"> 
      <h1>Weather DashBoard</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeatherData}>Get Weather</button>

      {error && (
        <div>
          <div className="error">{error}</div>
          <img className="error-img" src={logo}></img>
        </div>
      )}

      {weatherData && (
        <div className="weather-info">
          <div className="city-name">
            {weatherData.name}, {weatherData.sys.country}
          </div>
          <div className="weather-grid">
            <div className="weather-box temperature-box">
              <h2>Temperature</h2>
              <p>{weatherData.main.temp}°C</p>
            </div>
            <div className="weather-box humidity-box">
              <h2>Humidity</h2>
              <p>{weatherData.main.humidity}%</p>
            </div>
            <div className="weather-box wind-box">
              <h2>Wind Speed</h2>
              <p>{weatherData.wind.speed} m/s</p>
            </div>
            <div className="weather-box condition-box">
              <h2>Weather Condition</h2>
              <p>{weatherData.weather[0].main}</p>
            </div>
          </div>
        </div>
      )}
      <Globe />
    </div>
  );
}

export default DashBoard;
