import { useRef, useEffect, useState } from 'react'
import './Weather.css'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import wind from '../assets/wind.png'
import humidity from '../assets/humidity.png'
import '@fortawesome/free-regular-svg-icons'

const Weather = () => {

  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03n": cloud,
    "03d": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  }

  const search = async (city) => {
    if (city === "") {
      alert("Please enter a city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();

      if(!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);
      const iconUrl = allIcons[data.weather[0].icon] || clear;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temp: Math.floor(data.main.temp),
        city: data.name,
        condition: data.weather[0].main,
        icon: iconUrl
      })

    } catch (error) {
      setWeatherData(false);
      console.error("Error fetching weather data:", error);
      alert("Could not fetch weather data. Please try again later.");
    }
  }
  
  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Enter city name" />
        <button onClick={() => search(inputRef.current.value)}><i className="fa-solid fa-magnifying-glass"></i></button>
      </div>
      {weatherData ? <>
        <img src={weatherData.icon} alt="" srcSet="" className='weather-icon'/>
      <p className='temp'>{weatherData.temp}°C</p>
      <p className='location'>{weatherData.city}</p>
      <div className="weather-details">
        <div className="col">
          <img src={humidity} alt="" srcset=""/>
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind} alt="" srcset=""/>
          <div>
            <p>{weatherData.windSpeed} Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
      </> : <></>}
      
    </div>
  )
}

export default Weather

