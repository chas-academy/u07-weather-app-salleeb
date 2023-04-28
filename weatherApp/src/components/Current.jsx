import React from "react";
import './Current.css'

export function Current({current, city}) {
    return (
        <div className="current">
            <h1>{city}</h1>
            <h2>Current weather</h2>
            <div>
                <img src={current.condition.icon} alt={current.condition.text} />
                <span><b>{current.condition.text}</b></span> |
                <span><b>{current.temp_c}°</b></span> |
                <span><b>Wind speed {current.wind_kph}</b></span> |
                <span><b>Humidity {current.humidity}</b></span>
            </div>

        </div>
    )
}

export default Current