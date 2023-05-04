/* eslint-disable react/prop-types */
import React from 'react';
import { useEffect, useState } from 'react';
import './Current.css'


export function Current({current, city, forecast: {forecastday}}) {
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [newDate, setNewDate] = useState("");
    const [time, setTime] = useState("");
    
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

        setHourlyForecast([...curDay, ...nextDay]);

    }, [forecastday])


    return (
        <div className="current">

            <h1>{city}</h1>
            <h2>Current weather</h2>
            <div>
                <img src={current.condition.icon} alt={current.condition.text} />
                <span><b>{current.condition.text}</b></span> |
                <span className='celsius'><b>{current.temp_c}°C</b></span> |
                <span className='fahrenheit'><b>{current.temp_f}°F</b></span> |
                <span><b>Wind speed {current.wind_kph} km/h</b></span> |
                <span><b>Humidity {current.humidity}%</b></span>

                {hourlyForecast.map((hour, idx) => {
                    const curTime = hour.time;
                    if (curTime >= curDateAndTime) {
                        return (
                            <div key={idx}>
                                <b>{curTime}</b>
                                <img src={hour.condition.icon} alt={hour.condition.text} />
                                <b>{hour.condition.text}</b>
                            </div>
                            );
                        }
                        
                    })}
            </div>            
        </div>
    )
}

export default Current