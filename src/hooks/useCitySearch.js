import { useState } from "react"

const useCitySearch = () => {
    const [city, setCity] = useState("")
    
    const updateCity = (value) => {
        setCity(value)
    }

    const clearCity = () => {
        setCity("")
    }

    return {
        city,
        updateCity,
        clearCity
    }
  
}

export default useCitySearch
