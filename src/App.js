
// Icons downloaded from <a target="_blank" href="https://icons8.com/icon/VQOfeAx5KWTK/info">Info</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

import React,{useState,useEffect} from 'react'
import axios from 'axios'
import icon_clear from './assets/clear_weather.png'
import icon_cloudy from './assets/cloudy_weather.png'
import icon_drizzle from './assets/drizzle_weather.png'
import icon_rainy from './assets/rainy_weather.png'
import icon_snowy from './assets/snowy_weather.png'
import information from './assets/information_icon.png'


function App() {
  const [data,setWeatherData]=useState(false)
  const [location,setCity] = useState('')
  const [error, setError] = useState(null)
  const [showContent, setShowContent] = useState(false);
  const api_key='46fa04d10d8f0318603a4bdf75f69e01'
  const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${api_key}`
  
  const weather_icons = {
    "01d": icon_clear,
    "01n": icon_clear,
    "02d": icon_cloudy,
    "02n": icon_cloudy,
    "03d": icon_cloudy,
    "03n": icon_cloudy,
    "04d": icon_drizzle,
    "04n": icon_drizzle,
    "09d": icon_rainy,
    "09n": icon_rainy,
    "10d": icon_rainy,
    "10n": icon_rainy,
    "13d": icon_snowy,
    "13n": icon_snowy,
  }

  useEffect(() => {
    getCurrentLocationWeatherInfo()
  }, [])

  const getCurrentLocationWeatherInfo = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          getWeather(latitude, longitude)
        },
        (err) => {
          console.error("Unable to retrieve your current location")
        }
      )
    } else {
      console.error("Geolocation is not supported ")
    }
  }
  const getWeather = (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${api_key}`
    
    axios.get(url)
      .then((response) => {
        setWeatherData(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error in fetching weather data")
      })
  }
  const searchCityWeather=(event)=> {
    if (event.key==='Enter') {
      axios.get(url).then((response)=>{
        setWeatherData(response.data)
        console.log(response.data)
      })
      setCity('')
    }
  }
  
  return (
    <div className="app">
      <div className="locationSearch">
      <img className="information_icon" src={information} alt="Search Icon" onClick={() => setShowContent(!showContent)} />
      {showContent ? <p className="company_info">
        <h2>Product Manager Accelerator</h2><br />
        The Product Manager Accelerator Program is designed to support PM professionals through every stage of their career. From students looking for entry-level jobs to Directors looking to take on a leadership role, our program has helped over hundreds of students fulfill their career aspirations.
        <br /><br />
        Our Product Manager Accelerator community are ambitious and committed. Through our program they have learnt, honed and developed new PM and leadership skills, giving them a strong foundation for their future endeavours.
        <br /><br />
        Learn product management for free today on our YouTube channel <br />
        <a href="https://www.youtube.com/c/drnancyli?sub_confirmation=1">https://www.youtube.com/c/drnancyli?sub_confirmation=1</a>
        <br /><br />
        Interested in PM Accelerator Pro? <br />
        Step 1️⃣: Attend the Product Masterclass to learn more about the program details, price, different packages, and stay until the end to get FREE  AI Course. 
        <br />
        Learn how to create a killer product portfolio 2 two weeks that will help you land any PM job( traditional or AI) even if you were laid off or have zero PM experience
        <br />
        <a href="https://www.drnancyli.com/masterclass">https://www.drnancyli.com/masterclass</a>
        <br /><br />
        Step 2️⃣: Reserve your early bird ticket and submit an application to talk to our Head of Admission
        <br /><br />
        Step 3️⃣: Successful applicants join our PMA Pro community to receive customized coaching!
      </p>:<></>}
      <div><h4 className="developed_by">Developed by: Nishika Sankuri</h4></div>
        <input
        value={location}
        onChange={event=>setCity(event.target.value)}
        onKeyPress={searchCityWeather}
        placeholder='Type city and hit enter'
        type="text"/>
      </div>
      <div className="container">
          <div className="top">
            <div className="temperature">
              {data.main ?<h1>{data.main.temp.toFixed()}°F</h1> :null}
            </div>
            <div className="city">
              <h2>{data.name}</h2>
            </div>
            <div className="description">
            {data.weather ?<p className='weathertype'>{data.weather[0].main}</p> :null}
            </div>
            {data && <img src={weather_icons[Object.keys(weather_icons).includes(data?.weather[0]?.icon) ? data?.weather[0]?.icon : "01d"]} alt="Clear weather" className='weather-icon' />}
            </div>
          
         
         {data.name !=undefined && 
          <div className="bottom">
              <div className="feels like">
              {data.main ?<p className='bold'>{data.main.feels_like.toFixed()}°F</p> :null}
                <p>Feels Like</p>
              </div>
              <div className="visibility">
              {data.main ?<p className='bold'>{(data.visibility/1609.34).toFixed()} Miles</p> :null}
                <p> Visibility </p>
              </div>
              <div className="min temp">
              {data.main ?<p className='bold'>{data.main.temp_min.toFixed()}°F</p> :null}
                <p> Min Temp</p>
              </div>
              <div className="max temp">
              {data.main ?<p className='bold'>{data.main.temp_max.toFixed()}°F</p> :null}
                <p> Max Temp</p>
              </div>
              <div className="humidity">
              {data.main ?<p className='bold'>{data.main.humidity}%</p> :null}
                <p>Humidity</p>
              </div>
              <div className="wind speed">
              {data.main ?<p className='MPH' >{data.wind.speed} MPH</p> :null}
                <p> Wind Speed</p>
              </div>
             
            </div>
}
      </div>
      
    </div>
  );
}

export default App;
