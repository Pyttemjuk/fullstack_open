import axios from "axios";
import React, { useState, useEffect } from "react";

const Country = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}`
        )
        .then((response) => {
          setWeather(response.data);
        });
    } catch (error) {
      console.log("error: weather not available");
    }
  }, []);

  const Weather = () => {
    if (weather.length !== 0) {
      return (
        <div>
          <p>{`temperature ${(weather.main.temp - 273).toFixed(1)} Celcius`}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather image"
          ></img>
          <p>{`wind ${weather.wind.speed.toFixed(1)} m/s`}</p>
        </div>
      );
    }
  };

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <h3>Languages</h3>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
      <img src={country.flags.png}></img>
      <h2>{`Weather in ${country.capital}`}</h2>
      <Weather></Weather>
    </div>
  );
};

export default Country;
