import useLocalStorage from "./useLocalStorage"

const useRecentSearches = () => {
  const [recentSearches, setRecentSearches, removeRecentSearches] = useLocalStorage("recentSearches",[])

 
  const addRecentSearch = (city) => {
    setRecentSearches((previousSearches) => {

      return [city, ...previousSearches.filter((search) => search !== city)].slice(0,5)

    })
  }

  const clearRecentSearches = () => {
    removeRecentSearches()
  }

  return {
    recentSearches,
    addRecentSearch,
    clearRecentSearches
  }
}

export default useRecentSearches