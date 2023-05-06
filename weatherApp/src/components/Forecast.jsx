/* eslint-disable react/prop-types */
import './Forecast.css'

export function Forecast({city, forecast: {forecastday}}) {

    return (
        <div>
            <h2>Forecast for {city}</h2>
            {forecastday.map((diffDate) => (
                <div key={diffDate.date} id={diffDate.date}>
                <img src={diffDate.day.condition.icon} alt={diffDate.day.condition.text} />
                <b>{diffDate.date} | </b>
                <b>{diffDate.day.condition.text} | </b>
                <span className='celsius'><b>Max: {diffDate.day.maxtemp_c}°C | Min: {diffDate.day.mintemp_c}°C</b></span>
                <span className='fahrenheit'><b>Max: {diffDate.day.maxtemp_f}°F | Min: {diffDate.day.mintemp_f}°F</b></span>
                {/* <p>Chance of rain: {diffDate.day.daily_chance_of_rain}%</p> */}
                </div>
            ))}
        </div>
    )
}

export default Forecast