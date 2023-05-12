import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import './Location.css'
import Weather from './Weather';

const apiKey = import.meta.env.VITE_APP_KEY;
const apiUrl = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=`;
const weatherUrl = (city) => `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no&alerts=no`;

export function Location() {
  const [city, setCity] = useState("");
  const [clicked, setClicked] = useState(false);
  const [current, setCurrent] = useState();
  const [forecast, setForecast] = useState(undefined);
  const [location, setLocation] = useState("");
  const [citySuggestion, setCitySuggestion] = useState([]);
  const [hour, setHour] = useState([]);

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
        clearTimeout()
      })
    }
  }

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
    }, 100);

    return () => clearTimeout(getDataAfterTimeout);
  }, [city])

 return (
    <>
      <div className="location flex justify-center text-center">
        <div className="body w-8/12 bg-cyan-600 opacity-75 rounded-lg">
        <div className='inline-block'>
        <input type="text"
        className='userInput'
        placeholder='Enter your position'
        value={city}
        onChange={(event) => setCity(event.target.value)}/>
                
        <div className='posBtn'>
          <button className='searchBtn flex' onClick={() => handleLocationClick()}>
          <Icon icon="ep:position" />
            Get current position</button>
        </div>

        {citySuggestion.length > 0 && (
          <div className='suggestion'>
          {citySuggestion.map(curCity => (
            <div key={curCity} className="hover:bg-slate-400 hover:text-white hover:cursor-pointer" onClick={() =>
              handleClick(curCity)}>{curCity}</div>
          ))}
          </div>
        )}
        </div>

        { current && forecast && <Weather current={current} city={location} forecast={forecast} hour={hour}/> }

        </div>
      </div>
    </>
  )
}

export default Location