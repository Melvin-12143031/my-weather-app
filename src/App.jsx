
import useWeather from './hooks/useWeather';
import useRecentSearches from './hooks/useRecentSearches'
import useUnit from './hooks/useUnit';
import useCitySearch from './hooks/useCitySearch';
import useWeatherSearch from './hooks/useWeatherSearch';
import useTheme from './hooks/useTheme';

import './App.css'

import SearchBar from './components/SearchBar';
import RecentSearches from './components/RecentSearches';
import UnitToggle from './components/UnitToggle';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import WeatherResults from './components/WeatherResults';
import EmptyState from './components/EmptyState';

function App() {

  const {
    weather,
    location,
    loading,
    error,
    lastUpdated,
    getWeather,
    getCurrentLocation,
    resetWeather,
    refreshWeather
  } = useWeather();

  const {
    recentSearches,
    addRecentSearch,
    clearRecentSearches
  } = useRecentSearches();

  const {
    unit,
    setUnit
  } = useUnit();

  const {
    theme,
    toggleTheme
  } = useTheme();

  const {
    city,
    updateCity,
    clearCity
  } = useCitySearch();

  const { searchCity } = useWeatherSearch({
    getWeather,
    addRecentSearch
  })

  const handleSearch = async () => {
    const locationData = await searchCity(city)

    if (locationData) {
      clearCity()
    }
  }

  const handleRecentSearch = (search) => {
    searchCity(search)
  }

  const handleSearchChange = (value) => {
    updateCity(value);
    resetWeather();
  }

  return (
    <div className={`app ${theme}`}>
      <main className="container">

        <header className='app-header'>
          <h1>🌤️ Weather App</h1>
          <p>Check the weather anywhere.</p>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          
        </header>

        <SearchBar
          city={city}
          onSearch={handleSearch}
          getCurrentLocation={getCurrentLocation}
          handleSearchChange={handleSearchChange}
          loading={loading}

        />

        <RecentSearches
          searches={recentSearches}
          onSearch={handleRecentSearch}
          onClear={clearRecentSearches}
          loading={loading}
        />

   

          <UnitToggle
            unit={unit}
            setUnit={setUnit}
            loading={loading}
          />


        {loading && <Loading />}

        <ErrorMessage
          message={error}
          onRetry={() => searchCity(city)}
          loading={loading} />

        {!weather && !loading && !error && city === "" && (
          <EmptyState />
        )}

        {weather && !loading && (
          <WeatherResults
            weather={weather}
            location={location}
            unit={unit}
            onRefresh={refreshWeather}
            lastUpdated={lastUpdated}
          />
        )}



      </main>

    </div>
  )
}

export default App
