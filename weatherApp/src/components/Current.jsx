/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
// import {Converter} from './Converter';
import './Current.css'

export function Current( {current, city, forecast: {forecastday}}) {
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [newDate, setNewDate] = useState("");
    const [time, setTime] = useState("");

    const [unit, setUnit] = useState(false); 
    // const [unit, setUnit ] = useState("C");

    // const unitConverter = unit ? "C" : "F";
    // const [chanceOfRain, setChanceOfRain] = useState([]);

    const unitConverter = () => {
        setUnit(!unit)
    }
    
    const curDateAndTime = newDate + " " + time;

    useEffect(() => {
        let todayDate = new Date(),
        year = todayDate.getFullYear(),
        month = "" + (todayDate.getMonth() + 1),
        date = "" + todayDate.getDate();

        if (month.length < 2) {
            month = "0" + month;
        }
        if (date.length < 2) {
            date = "0" + date;
        }
        setNewDate([year, month, date].join("-"));

        const curTime = Date().toString().slice(16, -43);
        setTime(curTime);

        const curDay = forecastday[0].hour;
        const nextDay = forecastday[1].hour;
        const curHours = [...curDay, ...nextDay];
        setHourlyForecast(curHours);

        // const rainForecast = hourlyForecast.map((res) => {
        //     const rainHourly = res.chance_of_rain
        //     console.log(rainHourly)
        // })
        // setChanceOfRain(rainForecast);

    }, [forecastday]);


    console.log(forecastday)
    // console.log(hourlyForecast)
    // console.log(chanceOfRain)

    // state = {
    //     fahrenheit: `<span className='fahrenheit'><b>{current.temp_f}°F</b></span>`
    // };

    // changeToFahrenheit = (fahrenheit) => {
    //     this.setState({fahrenheit});
    // }

    return (
        <div className="current">

            <button onClick={unitConverter}>C&deg; |  F&deg;</button>

            <h1>{city}</h1>
            <h2>Current weather</h2>
            <div key={current} id={current}>
                <span><p>Sunrise: {forecastday[0].astro.sunrise}</p></span>
                <span><p>Sunset: {forecastday[0].astro.sunset}</p></span>
                <img src={current.condition.icon} alt={current.condition.text} />
                <span><b>{current.condition.text}</b></span> |
                <b>{unit ? current.temp_c + "°C" : current.temp_f + "°F"}</b>
                
                {/* <span className='celsius'><b>{Converter ? current.temp_c + "°C" : current.temp_f + "°F"}</b></span> */}
                
                {/* <span className='celsius'><b>{unitConverter ? current.temp_c + "°C" : current.temp_f + "°F"}</b></span> | */}
                {/* <span className='celsius'><b>{current.temp_c}°C</b></span> |
                <span className='fahrenheit'><b>{current.temp_f}°F</b></span> | */}
                <span><b>Wind speed {current.wind_kph} km/h</b></span> |
                <span><b>Humidity {current.humidity}%</b></span>
                {/* <p>Chance of rain: {current.daily_chance_of_rain}%</p> */}

                {hourlyForecast.map((hour) => {
                    const curTime = hour.time;
                    const hours = curTime.toString().slice(11);
                    if (curTime > curDateAndTime) {
                        return (
                            <div key={hour.time} id={hour.time}>
                                <b>{hours}</b>
                                <img src={hour.condition.icon} alt={hour.condition.text} />
                                <b>{hour.condition.text}</b>

                                <b>{unit ? hour.temp_c + "°C" : hour.temp_f + "°F"}</b>

                                {/* <span className='celsius'><b>{hour.temp_c}°C</b></span> | */}
                                {/* <span className='fahrenheit'><b>{hour.temp_f}°F</b></span> | */}
                                <span><b>Wind speed {hour.wind_kph} km/h</b></span> |
                                <span><b>Humidity {hour.humidity}%</b></span>
                                {/* <p>Chance of rain: {hour.chance_of_rain}%</p> */}
                            </div>
                            );
                        }
                        
                    })}
            </div>            
        </div>
    )
}

export default Current