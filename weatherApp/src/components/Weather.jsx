/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './Weather.css'

export function Weather({current, city, forecast: {forecastday}}) {
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [newDate, setNewDate] = useState("");
    const [time, setTime] = useState("");
    const [unit, setUnit] = useState(false); 

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

    }, [forecastday]);

    // console.log(forecastday)

    return (
        <div className="weather">

            <button onClick={unitConverter}>C&deg; |  F&deg;</button>

            <h1>{city}</h1>
            <h2>Current weather</h2>
            <div key={current} id={current}>
                <span><p>Sunrise: {forecastday[0].astro.sunrise}</p></span>
                <span><p>Sunset: {forecastday[0].astro.sunset}</p></span>
                <img src={current.condition.icon} alt={current.condition.text} />
                <span><b>{current.condition.text}</b></span> |
                <b>{unit ? current.temp_c + "°C" : current.temp_f + "°F"}</b>
                <span><b>Wind speed {current.wind_kph} km/h</b></span> |
                <span><b>Humidity {current.humidity}%</b></span>

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
                                <span><b>Wind speed {hour.wind_kph} km/h</b></span> |
                                <span><b>Humidity {hour.humidity}%</b></span>
                            </div>
                            );
                        }
                        
                    })}
            </div>            


            <h2>Forecast for {city}</h2>
            {forecastday.map((diffDate) => (
                <div key={diffDate.date} id={diffDate.date}>
                <img src={diffDate.day.condition.icon} alt={diffDate.day.condition.text} />
                <b>{diffDate.date} | </b>
                <b>{diffDate.day.condition.text} | </b>
                <b>{unit ? "Max: " + diffDate.day.maxtemp_c + "°C " + "Min: " + diffDate.day.mintemp_c + "°C" : "Max: " + diffDate.day.maxtemp_f + "°F " + "Min: " + diffDate.day.mintemp_f + "°F" }</b>
                </div>
            ))}
        </div>
    )
}

export default Weather