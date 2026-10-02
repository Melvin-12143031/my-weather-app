import useLocalStorage from './useLocalStorage'

const useTheme = () => {

    const [theme, setTheme] = useLocalStorage("theme","dark")

    const toggleTheme = () => {
        setTheme(
            theme === "dark"
            ? "light"
            : "dark"
        )}

     return {
            theme,
            toggleTheme
        }
}


export default useTheme
