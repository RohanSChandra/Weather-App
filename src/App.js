import "./App.css";
import React, { useState } from "react";

function App() {
  const apiKey = "4856d71a9297ddfb8f3214ae678713af";
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");

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
      setCity("");
      console.log(weather);
    }
  };
  return (
    <div className="container">
      <input
        className="input"
        placeholder="Enter City..."
        onChange={(e) => setCity(e.target.value)}
        value={city}
        onKeyPress={getWeather}
      />

      {typeof weatherData.main === "undefined" ? (
        <div>
          <p>
            Welcome to my Weather App! Please enter a City to get the weather
          </p>
        </div>
      ) : (
        <div>
          <p>{weatherData.name}</p>
          <p></p>
          <p></p>
        </div>
      )}
    </div>
  );
}

export default App;
