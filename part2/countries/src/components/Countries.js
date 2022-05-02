import React from "react";
import Country from "./Country";

const Countries = ({ countries, chooseCountry }) => {
  if (countries.length === 1) {
    const country = countries[0];
    return <Country country={country}></Country>;
  } else if (countries.length <= 10) {
    return countries.map((country) => (
      <div key={country.cca3}>
        {country.name.common}{" "}
        <button onClick={() => chooseCountry(country.cca3)}>show</button>
      </div>
    ));
  }

  return <p>Too many matches, specify another filter</p>;
};

export default Countries;
