// import { useEffect, useState } from 'react'
// import Current from './Current';
// import Forecast from './Forecast';
// import './Converter.css'

// export function Converter() {
//     const [unit, setUnit] = useState(false);

//     const unitConverter = props => {
//         setUnit(!unit)
//     }

//     return (
//         <>
//             <button onClick={props.test}>C&deg; |  F&deg;</button>
//         </>
//     )

//     // useEffect(() => {
//     //     if (unit) {
        
//     //     }
//     // }, [unit])

//     // return (
//     //     <>
//     //     <button onClick={unitConverter}>C&deg; |  F&deg;</button>
//     //     </>
//     // )
// }

// export default Converter

// const Converter = () => {
//     const [unit, setUnit] = useState(false);

//     const unitConverter = () => {
//         setUnit((unit) => !unit)
//     };

//     useEffect(() => {
//         if (unit) {

//         }
//     }, [unit])

//     return (
//         <>
//         <button onClick={unitConverter}>C&deg; |  F&deg;</button>
//         </>
//     )

// }

// export default Converter


// constructor() {
//     super();
//     this.state = {
//       isShowBody: false
//     };
//   }

//   handleClick = event => {
//     this.setState({ isShowBody: !this.state.isShowBody });
//   };

//   checkbox = () => {
//     return (
//       <div>
//         <span className="switch switch-sm">
//           <label>
//             <input
//               type="checkbox"
//               name="select"
//               onClick={this.handleClick.bind(this)}
//             />
//             <span />
//           </label>
//         </span>
//       </div>
//     );
//   };        

//   render() {
//     return (
//       <div>
//         {this.checkbox()}
//         {this.state.isShowBody && <ContentComponent />}
//       </div>
//     );
//   }
// }


// import React, { useState } from "react";
// import "./CelsiusToFahrenheit.css";

// function CelsiusToFahrenheit() {
//   const [celsius, setCelsius] = useState("");
//   const [fahrenheit, setFahrenheit] = useState("");

//   function convertCelsiusToFahrenheit() {
//     const tempInFahrenheit = (parseFloat(celsius) * 1.8) + 32;
//     setFahrenheit(tempInFahrenheit.toFixed(1));
//   }

//   return (
//     <div className="celsius-to-fahrenheit-container">
//       <h2 className="celsius-to-fahrenheit-title">Celsius to Fahrenheit Conversion</h2>
//       <div className="celsius-to-fahrenheit-input">
//         <label className="celsius-to-fahrenheit-label">Celsius:</label>
//         <input type="number" value={celsius} onChange={(e) => setCelsius(e.target.value)} />
//       </div>
//       <button className="celsius-to-fahrenheit-button" onClick={convertCelsiusToFahrenheit}>Convert</button>
//       {fahrenheit && <p className="celsius-to-fahrenheit-result">{celsius} degrees Celsius is equal to {fahrenheit} degrees Fahrenheit.</p>}
//     </div>
//   );
// }