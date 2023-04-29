/* eslint-disable react/prop-types */
import './Current.css'


export function Current({current, city, forecast: {forecastday}}) {
    forecastday = Object.entries(forecastday).slice(0, -5).map(res => res[1]);
    const curTime = Date().toString().slice(16, -43)
    
    return (
        <div className="current">
            <h1>{city}</h1>
            <h2>Current weather</h2>
            <div>
                <img src={current.condition.icon} alt={current.condition.text} />
                <span><b>{current.condition.text}</b></span> |
                <span><b>{current.temp_c}°C</b></span> |
                <span><b>Wind speed {current.wind_kph} km/h</b></span> |
                <span><b>Humidity {current.humidity}%</b></span>


                {forecastday.map((forecastHour) => {

                    console.log(forecastday);

                    const { hour } = forecastHour;
                    return (
                        <>
                            {hour.map(curHourForecast => {
                                const dayHour = curHourForecast.time.toString().slice(11)
                                // console.log(dayHour);
                                // const midnight = "00:00"
                                // const nextDay = dayHour.filter(midnight)
                                if (dayHour >= curTime) {
                                    return (
                                        <>
                                        <b>{dayHour} | </b>
                                        <b>{curHourForecast.temp_c}°C</b>
                                        <img src={curHourForecast.condition.icon} alt={curHourForecast.condition.text} />
                                        </>
                                    )
                                }
                            })}
                        </>
                    )
                })}


            </div>            
        </div>
    )
}

export default Current