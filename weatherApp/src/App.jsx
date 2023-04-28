import { useEffect, useState } from 'react'
import './App.css'
import Current from './components/Current';
// import Geolocation  from './components/Geolocation';
// import Forecast from './components/Forecast';

const apiUrl = 'https://api.weatherapi.com/v1/search.json?key=c9878aaaf99e4cf4b72225648232604&q='

const weatherUrl = (city) => `https://api.weatherapi.com/v1/forecast.json?key=c9878aaaf99e4cf4b72225648232604&q=${city}&days=7&aqi=no&alerts=no`;

const exUrl = 'https://api.weatherapi.com/v1/search.json?key=c9878aaaf99e4cf4b72225648232604&q=48.8567,2.3506&days=1&aqi=no&alerts=no'

const App = () => {
  const [city, setCity] = useState("");
  const [clicked, setClicked] = useState(false);
  const [current, setCurrent] = useState();
  const [forecast, setForecast] = useState();
  const [location, setLocation] = useState("");
  const [citySuggestion, setCitySuggestion] = useState([]);

  // Geolocation
    const [position, setPosition] = useState(undefined);
    const [status, setStatus] = useState("");
    const [currentPosition, setCurrentPosition] = useState(undefined);

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
// const getWeather = async () => {
//   const resp = await fetch(exUrl);
//   const data = await resp.json();
//   console.log(data);
// }

  // Geolocation LÅG HÄR!
  // const GetLocation = () => {
  //   const [status, setStatus] = useState("");
  //   const [position, setPosition] = useState(undefined);

    // const getLocation = () => {
    //   if(!navigator.geolocation) {
    //       setStatus("Geolocation is not supported on your browser.");
    //     } else {
    //       setStatus("Loading...");
    //     }

    //   navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     setStatus("");
    //     setPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
    //     console.log();
    //   },
    //   () => {
    //     setStatus("Unable to retrieve your location");
    //   }
    // );
    // };

    // return (
    //   <button onClick={() => GetLocation()}>Get location</button>
    // )

    ///////////////////////////////////////////////////////////////

    // if(!navigator.geolocation) {
    //   setStatus("Geolocation is not supported by your browser!");
    // } else {
    //   setStatus("Loading...");
    // }

    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     setStatus("");
    //     setLat(position.coords.latitude);
    //     setLng(position.coords.longitude);
    //     console.log(position.coords.latitude, position.coords.longitude);
    //   },
    //   () => {
    //     setStatus("Unable to retrieve your location");
    //   }
    // );
  // };

  // const getLocation = async () => {
  //   console.log(position);
  //   const url = apiUrl + position.lat + "," + position.lng + "&days=1&aqi=no&alerts=no";
  //   const resp = await fetch(url);
  //   const res = await resp.json();
  // console.log(position);
    
  // } 

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log("Everything went well!");
        setPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
        setStatus("");
      },
      () => {
        console.log("Unable to retrieve your location");
        setStatus("Unable to retrieve your location"); // Dubbelkolla så det syns för user!
      }
    );

    // console.log(position);
  // const getLocation = async () => {
  //   console.log(position);
  //   const url = apiUrl + position.lat + "," + position.lng + "&days=1&aqi=no&alerts=no";
  //   const resp = await fetch(url);
  //   const res = await resp.json();
    
  // } 


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
  }, [city])

  const getLocation = async () => {
    console.log(position);
    const url = apiUrl + position.lat + "," + position.lng + "&days=1&aqi=no&alerts=no";
    const resp = await fetch(url);
    const res = await resp.json();
    console.log(position);
    setLocation(res.location);
  } 

  return (
    <>
      <div className="App">
        <div className='app_body'>
        <input type="text"
        className='citytextbox'
        placeholder='Enter the city name'
        value={city}
        onChange={(event) => setCity(event.target.value)}/>
        {citySuggestion.length > 0 && (
          <div>
          {citySuggestion.map(curCity => (
            <div key={curCity} className="suggestion" onClick={() =>
              handleClick(curCity)}>{curCity}</div>
          ))}
          </div>
        )}
        { current && <Current current={current} city={location}/> }
        {/* { forecast && <Forecast forecast={forecast} city={location}/> } */}

        {/* Geolocation */}
        <button onClick={() => getLocation()}>Get current location</button>
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
