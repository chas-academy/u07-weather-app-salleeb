/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './Current.css'


export function Current({current, city, forecast: {forecastday}}) {
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [newDate, setNewDate] = useState("");

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
    }, [])
    console.log(newDate);

    useEffect(() => {
        // Check if it is after 23:00
        const isAfter23 = new Date().getHours() >= 23;
    
        // Get the forecast data for the next day
        const forecastData = forecastday[isAfter23 ? 1 : 0];
    
        // Get the hourly forecast data for the next day
        const hourlyData = forecastData.hour;
    
        // Filter the hourly data to only show the next 10 hours
        const filteredHourlyData = hourlyData.filter((hour, index) => index < 10);
    
        // Set the hourly forecast state
        setHourlyForecast(filteredHourlyData);
      }, [forecastday]);
      
    

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

                <div className='hourly-forecast'>
                {hourlyForecast.map((hour) => {
                    const hourTime = new Date(hour.time).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                    });
                    const currentTime = new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                    });
                    if (hourTime > currentTime) {
                    return (
                        <div key={hour.time}>
                        <span>{hourTime}</span> |{' '}
                        <span className='celsius'>
                            <b>{hour.temp_c}°C</b>
                        </span>{' '}
                        |{' '}
                        <span className='fahrenheit'>
                            <b>{hour.temp_f}°F</b>
                        </span>{' '}
                        | <span><b>{hour.condition.text}</b></span>
                        <img src={hour.condition.icon} alt={hour.condition.text} />
                        </div>
                    );
                    } else {
                    return null;
                    }
                })}
                </div>

            </div>            
        </div>
    )
}

export default Current

// /* eslint-disable react/prop-types */
// import './Current.css'


// export function Current({current, city, forecast: {forecastday}}) {
//     forecastday = Object.entries(forecastday).slice(0, -6).map(res => res[1]);

//     useEffect(() => {
//         let todayDate = new Date(),
//         year = todayDate.getFullYear(),
//         month = "" + (todayDate.getMonth() + 1),
//         date = "" + todayDate.getDate();

//         if (month.length < 2) {
//             month = "0" + month;
//         }
//         if (date.length < 2) {
//             date = "0" + date;
//         }
//         setNewDate([year, month, date].join("-"));
//     }, [])
    
//     // const curTime = Date().toString().slice(16, -43)
//     // let nowDateAndTime = date + " " + curTime // Datum & tid, user


//     // function ChangeTemp() {
//     //     const [active, setActive] = useState(false);
//     //     const handleClick = () =>{
//     //       setActive(!active);
//     //     }
//     //   }

//     return (
//         <div className="current">

//     {/* <button onClick={ChangeTemp()}>
//       </button> */}

//             <h1>{city}</h1>
//             <h2>Current weather</h2>
//             <div>
//                 <img src={current.condition.icon} alt={current.condition.text} />
//                 <span><b>{current.condition.text}</b></span> |
//                 <span className='celsius'><b>{current.temp_c}°C</b></span> |
//                 <span className='fahrenheit'><b>{current.temp_f}°F</b></span> |
//                 <span><b>Wind speed {current.wind_kph} km/h</b></span> |
//                 <span><b>Humidity {current.humidity}%</b></span>


//                 {forecastday.map((forecastHour) => {

//                     // console.log(forecastday);

//                     const { hour } = forecastHour;
//                     // console.log(hour);
//                     return (
//                         <>
//                             {hour.map(curHourForecast => {
//                                 const curTime = Date().toString().slice(16, -43)
//                                 // console.log(curTime) // Aktuell tid
//                                 let today = new Date()
//                                 let date = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + today.getDate();
//                                 // console.log(date) // Aktuellt datum
//                                 const dayHour = curHourForecast.time.toString().slice(11)
//                                 // console.log(dayHour); // Tider väderprognos (00-23) x 2?

//                                 const dayDate = curHourForecast.time.toString().slice(0, -6)
//                                 // console.log(dayDate) // Aktuellt datum från väderprognos
//                                 // const midnight = "00:00"
//                                 // const nextDay = dayHour.filter(midnight)
//                                 if (dayHour >= curTime || date == dayDate) {
//                                     return (
//                                         <>
//                                         <b>{dayHour} | </b>
//                                         <b>{curHourForecast.time}°C</b>
//                                         <b>{curHourForecast.temp_c}°C</b>
//                                         <img src={curHourForecast.condition.icon} alt={curHourForecast.condition.text} />
//                                         </>
//                                     )
//                                 }
//                             })}
//                         </>
//                     )
//                 })}


//             </div>            
//         </div>
//     )
// }

// export default Current