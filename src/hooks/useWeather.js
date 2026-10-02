import { useState } from "react"

import { 
  getWeatherByCoordinates, 
  searchCity, 
  getLocationByCoordinates,
  getWeatherByCity} from "../api/weatherApi"

import getErrorMessage from "../utils/errorUtils"

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const resetWeather = () => {
  setWeather(null)
  setLocation(null)
  setError("")
}

const startLoading = () => {
  setLoading(true)
  setError("")
}

 const getWeather = async (city) => {
  if (loading) {
    return null
  }

  if (city.trim() === "") {
    setError("Please enter a city.")
    return null
  }

  try {
    startLoading()

    const {
      locationData,
      weatherData
    } = await getWeatherByCity(city)

    setLocation(locationData)
    setWeather(weatherData)
    setLastUpdated(new Date())

    return locationData

  } catch (error) {
    console.error(error)

    setError(getErrorMessage(error))

    return null
  } finally {
    setLoading(false)
  }
}

const refreshWeather = async () => {
  if (loading || !location) {
    return
  }

  try {
    startLoading()

    const weatherData = await getWeatherByCoordinates(
      location.latitude,
      location.longitude
    )

    setWeather(weatherData)
    setLastUpdated(new Date())

  } catch (error) {
    console.error(error)
    setError(getErrorMessage(error))
  } finally {
    setLoading(false)
  }
}
   
  const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    setError("Geolocation is not supported by your browser.")
    return
  }

  startLoading()

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const { latitude, longitude } = position.coords

        const locationData = await getLocationByCoordinates(
          latitude,
          longitude
        )

        const weatherData = await getWeatherByCoordinates(
          latitude,
          longitude
        )

        setLocation({
          name:
            locationData.address.city ||
            locationData.address.town ||
            locationData.address.municipality ||
            locationData.address.village ||
            "Your Location",
          admin1: locationData.address.state || "",
          country: locationData.address.country || "",
          latitude,
          longitude
        })

        setWeather(weatherData)
        setLastUpdated(new Date())

      } catch (error) {
        console.error(error)
        setError("Unable to get weather data.")
      } finally {
        setLoading(false)
      }
    },
    () => {
      setError("Unable to get your location.")
      setLoading(false)
    }
  )
}

  return {
    weather,
    location,
    loading,
    error,
    lastUpdated,
    getWeather,
    getCurrentLocation,
    resetWeather,
    refreshWeather
  }
}

export default useWeather