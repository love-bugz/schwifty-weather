import React from "react";

function Weather({ weather }) {
  return (
    <div className="weather">
      <h3>Here's the weather</h3>
      {weather.alerts.length > 0 && <h5>Caution: {weather.alerts[0].title}</h5>}
      <h5>Temperature: {Math.round(weather.currently.temperature)}°F</h5>
      <h5>Skies: {weather.currently.summary}</h5>
      <h5>Wind: {Math.round(weather.currently.windSpeed)}mph</h5>
      <h5>Forecast: {weather.hourly.summary}</h5>
    </div>
  );
}

export default Weather;
