import axios from "axios";
import { useEffect, useState } from "react";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newCountry, setNewCountry] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleCountryChange = (event) => {
    setNewCountry(event.target.value);
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      )
    );
  };

  const chooseCountryWith = (cca3) => {
    setFilteredCountries(countries.filter((country) => country.cca3 === cca3));
    setNewCountry(
      countries.find((country) => country.cca3 === cca3).name.common
    );
  };

  return (
    <div>
      <div>
        find countries{" "}
        <input value={newCountry} onChange={handleCountryChange}></input>
      </div>
      <Countries
        countries={filteredCountries}
        chooseCountry={chooseCountryWith}
      ></Countries>
    </div>
  );
};

export default App;
