const RecentSearches = ({
  searches,
  onSearch,
  onClear,
  loading
}) => {
  
  if (searches.length === 0) {
    return null
  }

  return (
    <div className="recent-searches">
      <div className="recent-header">
        <h3>Recent Searches</h3>

        <button
          className="clear-recent"
          onClick={onClear}
          disabled={loading}
        >
          Clear
        </button>
      </div>

      <div className="recent-list">
        {searches.map((search) => (
          <button
            key={search}
            onClick={() => onSearch(search)}
            disabled={loading}
          >
            📍 {search}
          </button>
        ))}
      </div>
    </div>
  )
}

export default RecentSearches