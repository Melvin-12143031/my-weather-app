import useLocalStorage from './useLocalStorage'

const useUnit = () => {
const [unit, setUnit] = useLocalStorage("temperatureUnit", "C")

    return {
        unit,
        setUnit
    }

}

export default useUnit
