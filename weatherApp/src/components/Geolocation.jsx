import { useState } from 'react'
import './Geolocation.css'

export function Geolocation() {

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const getLocation = () => {
    if(!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser!");
    } else {
      setStatus("Loading...");
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setStatus("");
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      },
      () => {
        setStatus("Unable to retrieve your location");
      }
    );
  };

  return (
    <div className="App">
    <button onClick={() => getLocation()}>Get location</button>
    {status ? <p>Status: {status}</p> : <></>}
    <p>Latitude: {lat}</p>
    <p>Longitude: {lng}</p>
    </div>
  )
}

export default Geolocation