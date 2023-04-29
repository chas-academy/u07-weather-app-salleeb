import { useEffect, useState } from 'react'
import './App.css'
import Current from './components/Current';
import Forecast from './components/Forecast';
// import Geolocation  from './components/Geolocation';

const apiKey = import.meta.env.VITE_APP_KEY;
const apiUrl = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=`;
const weatherUrl = (city) => `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no&alerts=no`;

const App = () => {
  const [city, setCity] = useState("");
  const [clicked, setClicked] = useState(false);
  const [current, setCurrent] = useState();
  const [forecast, setForecast] = useState(undefined);
  const [location, setLocation] = useState("");
  const [citySuggestion, setCitySuggestion] = useState([]);

  // Geolocation
  const [currentForecast, setCurrentForecast] = useState(undefined);
  const [position, setPosition] = useState(undefined);

  // const [lat, setLat] = useState(null);
  // const [lng, setLng] = useState(null);
  // const [status, setStatus] = useState(null);
  // const [nearestCity, setNearestCity] = useState(""); // ?

  const handleClick = async (clickedCity) => {
    console.log(clickedCity);
    setCity(clickedCity);
    setClicked(true);

    const resp = await fetch(weatherUrl(city));
    const data = await resp.json();
    setCurrent(data.current);
    setForecast(data.forecast);
    setLocation(data.location.name);
    // setNearestCity(data.location.name); // ?
    // console.log(setNearestCity);       // ?

  }

  // Geolocation
  const getWeather =  async () => {
    console.log(position);
    const url = apiUrl + position.lat + ',' + position.lng + '&days=1&aqi=no&alerts=no';
    const response = await fetch(url);
    const result = response.json();
    setCurrentForecast(result);
    console.log(url);
  }

  useEffect(() => {
  // Geolocation
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log("Smooth sailing");
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude});
      },
      () => {
        console.log("Fail");
        setStatus("Unable to retrieve your location"); // Dubbelkolla så det syns för user!
      }
    );

    const getDataAfterTimeout = setTimeout(() => {
      const fetchCitySuggestion = async () => {

        const resp = await fetch(apiUrl + city);
        const data = await resp.json();
        const citySuggestionData = data.map(curData => 
          `${curData.name},
          ${curData.region},
          ${curData.country}`
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
        <div className='app_body'>
        <input type="text"
        className='userInput'
        placeholder='Enter your position'
        value={city}
        onChange={(event) => setCity(event.target.value)}/>
                
        <button onClick={() => getWeather()}>Get current position</button>

        {citySuggestion.length > 0 && (
          <div>
          {citySuggestion.map(curCity => (
            <div key={curCity} className="suggestion" onClick={() =>
              handleClick(curCity)}>{curCity}</div>
          ))}
          </div>
        )}
        { current && <Current current={current} city={location}/> }
        { forecast && <Forecast forecast={forecast} city={location}/> }

        {/* Geolocation */}
        {/* {current && <Current current={current} city={location}/> } */}
        {/* {status ? <p>Status: {status}</p> : <></>}
        <p>Latitude: {lat}</p>
        <p>Longitude: {lng}</p> */}
        </div>
      </div>
    </>
  )
}

export default App
