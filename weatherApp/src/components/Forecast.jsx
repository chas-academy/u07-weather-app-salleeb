/* eslint-disable react/prop-types */
import './Forecast.css'

export function Forecast({city, forecast: {forecastday}}) {
    // console.log(forecastday);

    return (
        <div>
            <h2>Forecast for {city}</h2>
            {forecastday.map((diffDate) => (
                <div key={diffDate}>
                <img src={diffDate.day.condition.icon} alt={diffDate.day.condition.text} />
                <b>{diffDate.date} | </b>
                <b>{diffDate.day.condition.text} | </b>
                <b>Max: {diffDate.day.maxtemp_c}°C | Min: {diffDate.day.mintemp_c}°C</b>
                <p>Chance of rain: {diffDate.day.daily_chance_of_rain}%</p>
                </div>
            ))}
        </div>
    )
}

export default Forecast