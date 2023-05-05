import { useEffect, useState } from 'react'
import './App.css'
import Current from './components/Current';
import Forecast from './components/Forecast';

const apiKey = import.meta.env.VITE_APP_KEY;
const apiUrl = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=`;
const weatherUrl = (city) => `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no&alerts=no`;

const App = () => {
  // const [units, setUnits] = useState(Boolean);
  const [city, setCity] = useState("");
  const [clicked, setClicked] = useState(false);
  const [current, setCurrent] = useState();
  const [forecast, setForecast] = useState(undefined);
  const [location, setLocation] = useState("");
  const [citySuggestion, setCitySuggestion] = useState([]);
  const [hour, setHour] = useState([]);

  // const handleUnits = (e) => {
  //   const selectedUnit = e.currentTarget.name;
  //   if (units !== selectedUnit) setUnits(selectedUnit);
  // }

  const handleClick = async (clickedCity) => {
    setCity(clickedCity);
    setClicked(true);

    const resp = await fetch(weatherUrl(city));
    const data = await resp.json();
    setCurrent(data.current);
    setForecast(data.forecast);
    setLocation(data.location.name);
    setHour(data.forecast.hour);
  }

  // Geolocation
  const handleLocationClick = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const curPosition = lat + "," + lng

        const resp = await fetch(weatherUrl(curPosition));
        const data = await resp.json();
        setCurrent(data.current);
        setForecast(data.forecast);
        setLocation(data.location.name);
        setHour(data.forecast.hour);
      })
    }
  }

  // Fixa att förslagsalternativ user klickat på är kvar efter clicked
    // och fixa error

  useEffect(() => {
    const getDataAfterTimeout = setTimeout(() => {
      const fetchCitySuggestion = async () => {

        const resp = await fetch(apiUrl + city);
        const data = await resp.json();
        const citySuggestionData = data.map(curData => 
          `${curData.name}, ${curData.region}, ${curData.country}`
          );
        setCitySuggestion(citySuggestionData);
      };
      if (!clicked && city.length > 2) {
        fetchCitySuggestion();
      }
      else {
        setCitySuggestion([]);
        setClicked(false);
      }
    }, 1000); // Ändra sekunder?

    return () => clearTimeout(getDataAfterTimeout);
  }, [city, clicked])

  return (
    <>
      <div className="App">

        {/* <button name="celsius" onClick={handleUnits}>C</button>
        <button name="fahrenheit" onClick={handleUnits}>F</button> */}

        <div className='app_body'>
        <input type="text"
        className='userInput'
        placeholder='Enter your position'
        value={city}
        onChange={(event) => setCity(event.target.value)}/>
                
        <button onClick={() => handleLocationClick()}>Get current position</button>

        {citySuggestion.length > 0 && (
          <div>
          {citySuggestion.map(curCity => (
            <div key={curCity} className="suggestion" onClick={() =>
              handleClick(curCity)}>{curCity}</div>
          ))}
          </div>
        )}

        { current && <Current current={current} city={location} forecast={forecast} hour={hour}/> }
        { forecast && <Forecast forecast={forecast} city={location}/> }

        </div>
      </div>
    </>
  )
}

export default App