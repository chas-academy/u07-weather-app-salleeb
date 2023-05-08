import './App.css'
import Location from './components/Location';
import video from './assets/Clouds.mp4';

const App = () => {

  return (
    <>
      <div className="App">
        <video className='background' src={video} type="video/mp4" autoPlay muted loop></video>
        <Location/>
      </div>
    </>
  )
}

export default App