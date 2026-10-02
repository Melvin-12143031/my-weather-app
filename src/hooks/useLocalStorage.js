import { useState, useEffect } from "react"

const useLocalStorage = (key, initialValue) => {
  const [value,setValue] = useState(() => {
    const savedValue = localStorage.getItem(key)

    if (savedValue === "") {
        return initialValue
    }

    try {
        return JSON.parse(savedValue)
    } catch (error) {
        console.error("Invalid localStorage data:", error)
      return initialValue
    }

  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  },[value, setValue])

  const removeValue = () => {
    localStorage.removeItem(key)
    setValue(initialValue)
  }

  return [value, setValue, removeValue]

}

export default useLocalStorage
