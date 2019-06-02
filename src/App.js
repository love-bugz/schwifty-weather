import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Schwifty Weather</h1>
      </header>
      <Home />
    </div>
  );
}

function Home() {
  const [zipCode, setZipCode] = useState("");

  const [latitude, setLatitude] = useState("");

  const [longitude, setLongitude] = useState("");

  const [store, setStore] = useState({ weatherData: null });

  useEffect(() => {
    if (latitude !== "" && longitude !== "") {
      Axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${
          process.env.REACT_APP_DARKSKY_KEY
        }/${latitude},${longitude}`,
        {
          headers: { "X-Requested-With": "XMLHttpRequest" }
        }
      )
        .then(res => {
          console.log(res.data);
          setStore({ ...store, weatherData: res.data });
        })
        .catch(console.error);
    } else {
      console.log("Hello!");
    }
  }, [latitude, longitude]);

  // useEffect(() => {
  //   store.weatherData !== null && displayData();
  // }, store.weatherData);

  // function displayData() {}

  if (store.weatherData) {
    return (<>
    <button onClick={ (e) => {
      e.preventDefault();
      setStore({ ...store, weatherData: null })}}>Back</button>
    <Weather weather={store.weatherData} />
    </>);
  }
  return (
    <div>
      <h2>Home</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          Axios.get(
            `https://data.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude%40public&q=${zipCode}&facet=dst&facet=state&facet=timezone`
          )
            .then(res => {
              if (res.data.records.length > 0) {
                const result = res.data.records[0].geometry.coordinates;
                setLongitude(result[0]);
                setLatitude(result[1]);
              } else {
                alert("Invalid ZIP Code");
              }
            })
            .catch(err => console.error(err));
        }}
      >
        <input
          type="text"
          value={zipCode}
          onChange={e => setZipCode(e.target.value)}
        />
      </form>
      <h3>Latitude: {latitude}</h3>
      <h3>Longitude: {longitude}</h3>
    </div>
  );
}

function Weather({ weather }) {
  return (
    <div className="weather">
      <h3>Here's the weather</h3>
      {weather.alerts.length > 0 && alert(weather.alerts[0].title)}
    </div>
  );
}

export default App;
