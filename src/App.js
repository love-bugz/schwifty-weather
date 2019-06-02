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
  useEffect(() => {}, []);

  const [zipCode, setZipCode] = useState("");

  const [latitude, setLatitude] = useState("");

  const [longitude, setLongitude] = useState("");

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
                console.log(result);
                setLatitude(result[0]);
                setLongitude(result[1]);
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

export default App;
