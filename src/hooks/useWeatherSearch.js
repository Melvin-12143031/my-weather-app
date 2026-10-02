import { useCallback } from "react"

const useWeatherSearch = ({getWeather,addRecentSearch}) => {
  
    const searchCity = useCallback(async (city) => {
        const locationData = await getWeather(city)

        if (!locationData) {
        return null
        }
            addRecentSearch(locationData.name)
            return locationData
    }, [getWeather, addRecentSearch])

    return {
        searchCity
    }
}

export default useWeatherSearch
