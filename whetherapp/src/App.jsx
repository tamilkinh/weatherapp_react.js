import { useState, useSyncExternalStore } from 'react'
import './App.css'
import searchIcon from './assets/search.png'
import clearIcon from './assets/clear.png'
import cloudIcon from './assets/clouds.png'
import drizzleIcon from './assets/drizzle.png'
import rainIcon from './assets/rain.png'
import windIcon from './assets/wind.png'
import snowIcon from './assets/snow.png'
import humidityIcon from './assets/humidity.png'

const WheatherDetails = ({ icon, temp, city, contry, lat, log, humidity, wind }) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="" />
      </div>
      <h2 className='temp'>{Math.floor(temp)}°C</h2>
      <h2 className='city'>{city}</h2>
      <h3 className='contry'>{contry}</h3>
      <div className="card">
        <div>
          <span className='lat'>Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className='lat'>Longitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="" className='icon' />
          <div className="data">
            <div className="humidity-percentage">%{humidity} </div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={windIcon} alt="" className='icon' />
          <div className="data">
            <div className="humidity-percentage">{wind} km/h </div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>


    </>
  )
}

function App() {
  const [icon, setIcon] = useState(clearIcon)
  const [temp, setTemp] = useState("0")
  const [city, setCity] = useState("")
  const [country, setContry] = useState("IN")
  const [lat, setLat] = useState("0")
  const [log, setLog] = useState("0")
  const [humidity, setHumidity] = useState("80")
  const [wind, setWind] = useState("5")
  const [text, setText] = useState("chennai")
  const [cityNotFound, setCityNotFound] = useState(false)
  const [loading, setLoading] = useState(false)

  const weatherIconMap = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
    "50d": drizzleIcon

  }

  const handleClick = async () => {
    setLoading(true)
    setCityNotFound(false)
    try {
      const apikey = "f60e884e3c9b1e8fff8313e0f9db3a63"
      const response = await
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apikey}&units=Metric`)
      const data = await response.json()
      if (data.cod === "404") {
        console.error("City Not Found")
        setCityNotFound(true)
        setLoading(false)
      }
      setHumidity(data.main.humidity)
      setTemp(data.main.temp)
      setCity(data.name)
      setWind(data.wind.speed)
      setLat(data.coord.lat)
      setLog(data.coord.lon)
      setContry(data.sys.country)
      const weatherIcon = data.weather[0].icon
      setIcon(weatherIconMap[weatherIcon] || clearIcon)


    } catch (error) {
      console.error(`Error :${error.message}`)


    } finally {
      setLoading(false)
      


    }

  }





  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type="text" className='cityInput' placeholder='Search City' value={text} onChange={(e) => setText(e.target.value)} />
          <div className="serch-icon" onClick={handleClick}>
            <img src={searchIcon} alt="" />
          </div>
        </div>
        


        {loading && <div className="loading-message">Loading Please Wait...</div>}

        {cityNotFound && <div className="city-not-found">City Not Found...</div>}

        {!loading && !cityNotFound && < WheatherDetails icon={icon} temp={temp} city={city} contry={country}
          lat={lat} log={log} humidity={humidity} wind={wind} text={text} />}
      </div>



    </>
  )
}

export default App