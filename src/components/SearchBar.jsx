const SearchBar = ({
  city,
  onSearch,
  getCurrentLocation,
  handleSearchChange,
  loading
}) => {
  return (
    <div className="search-section">

      <input
        className="input"
        type="text"
        value={city}
        disabled={loading}
        onChange={(e) => {
          handleSearchChange(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch()
          }
        }}
        placeholder="Search a city..."
      />

      <button
        className="btn"
        onClick={onSearch}
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>

      <button
        className="btn location-btn"
        onClick={getCurrentLocation}
        disabled={loading}
      >
        📍 Use My Location
      </button>

    </div>
  )
}

export default SearchBar