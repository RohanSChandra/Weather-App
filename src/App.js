import "./App.css";
import React, { useState } from "react";
import moment from "moment";

function App() {
  const apiKey = "4856d71a9297ddfb8f3214ae678713af";
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");

  const formattedDate = moment().format("h:mm a - dddd, Do MMMM YYYY ");

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
          <div>
            <p>
              {weatherData.name}, {weatherData.sys.country}
            </p>
            <p>{Math.round(weatherData.main.temp)}°c </p>
            <p>Humidity: {weatherData.main.humidity}</p>
            <p> {formattedDate}</p>
            <ul>
              {weatherData.weather.map((weather) => {
                return (
                  <li key={weather}>
                    <p>
                      {weather.main}, {weather.description}
                    </p>
                    <img
                      src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                      alt="weathericon"
                    ></img>
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
