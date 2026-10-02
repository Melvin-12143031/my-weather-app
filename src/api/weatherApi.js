const WEATHER_API =
  "https://api.open-meteo.com/v1/forecast"

const GEOCODING_API =
  "https://geocoding-api.open-meteo.com/v1/search"

  
  const fetchData = async (url, errorMessage) => {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(errorMessage)
    }

    return await response.json()

  }


const getWeatherByCoordinates = async (latitude, longitude) => {

    const params = new URLSearchParams({
        latitude,
        longitude,
        current: 
            "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation,weather_code",
        daily:
            "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max",
        forecast_days: 5,
        timezone: "auto"
    })

return await fetchData(
    `${WEATHER_API}?${params}`,
     "Unable to get weather data."
)
}

const searchCity = async (city) => {

    const params = new URLSearchParams({
        name: city,
        count: 1
    })

  const data = await fetchData(
    `${GEOCODING_API}?${params}`,
    "Unable to search for the city.")

  if (!data.results || data.results.length === 0) {
     throw new Error("City not found.")
  }

  return data.results[0]
}


const getLocationByCoordinates = async (latitude, longitude) => {
  return await fetchData(
  `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
  "Unable to get your location.")
}


const getWeatherByCity = async (city) => {
    const locationData = await searchCity(city)

    const weatherData = await getWeatherByCoordinates(
        locationData.latitude,
        locationData.longitude
    )

    return {
        locationData,
        weatherData
    }
}

export {
  getWeatherByCoordinates,
  searchCity,
  getLocationByCoordinates,
  getWeatherByCity
}