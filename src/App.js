import "./App.css";
import React, { useState } from "react";
import moment from "moment";
import apiKey from "./API_KEY";

function App() {
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");

  const formattedDate = moment().format("h:mm a - dddd, Do MMMM 'YY ");

  const getWeather = async (e) => {
    if (e.key === "Enter") {
      const longlat = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${e.target.value}&limit=5&appid=${apiKey}`
      );
      const longlatresponse = await longlat.json();
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${longlatresponse[0].lat}&lon=${longlatresponse[0].lon}&appid=${apiKey}&units=metric`
      );
      const weather = await weatherResponse.json();
      console.log(weather);
      setCity("");
      setWeatherData(weather);
    }
  };
  return (
    <div className="container">
      <div className="left">
        {!weatherData.main ? (
          <div>
            <p>
              Welcome to my Weather App! Please enter a City to get the weather
            </p>
          </div>
        ) : (
          <div className="sideProfile">
            <div className="degreesStyle">
              <h1 className="degrees">
                {Math.round(weatherData.main.temp)}°c{" "}
              </h1>
            </div>
            <div>
              <p className="weatherName">{weatherData.name}</p>
              {/* <p>Humidity: {weatherData.main.humidity}</p> */}
              <p> {formattedDate}</p>
            </div>
            <ul>
              {weatherData.weather.map((weather) => {
                return (
                  <li key={weather}>
                    <img
                      src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                      alt="weathericon"
                    ></img>
                    <p>{weather.main}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      <div className="right">
        <input
          className="input"
          placeholder="Another location"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          onKeyPress={getWeather}
        />
      </div>
    </div>
  );
}

export default App;
