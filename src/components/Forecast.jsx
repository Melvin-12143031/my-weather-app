import { getWeatherInfo, convertTemperature } from "../utils/weatherUtils"

const Forecast = ({ daily, unit }) => {

  if (!daily) {
    return null
  }

  const formatTime = (time) => {
    if (!time) {
      return "-"
    }

    return new Date(time).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit"
    })

  }


  return (
    <div className="forecast">

      <p className="forecast-subtitle">
        5-day forecast
      </p>

      <h2>Forecast</h2>

      <div className="forecast-grid">

        {daily.time.map((date, index) => {

          const weatherCode = daily.weather_code[index]
          const maxTemperature = daily.temperature_2m_max[index]
          const minTemperature = daily.temperature_2m_min[index]

          const weatherInfo = getWeatherInfo(weatherCode)

          const dayName =
            index === 0
              ? "Today"
              : new Date(date).toLocaleDateString("en-US", {
                weekday: "short"
              })

          return (
            <div
              className={`forecast-card ${index === 0 ? "today" : ""
                }`}
              key={date}
            >

              <h3>{dayName}</h3>

              <div
                className={`forecast-icon ${daily.weather_code[index] >= 51 &&
                    daily.weather_code[index] <= 82
                    ? "rain-icon"
                    : daily.weather_code[index] >= 95
                      ? "storm-icon"
                      : ""
                  }`}
              >
                {getWeatherInfo(
                  daily.weather_code[index]
                ).icon}
              </div>

              <p>
                {weatherInfo.description}
              </p>

              <p className="forecast-precipitation">
                💧 {daily.precipitation_probability_max[index]}%
              </p>

              <div className="forecast-sun">
                <span>
                  🌅 {formatTime(daily.sunrise[index])}
                </span>

                <span>
                  🌇 {formatTime(daily.sunset[index])}
                </span>
              </div>

              <div className="forecast-temperature">

                <div className="forecast-temp-item">
                  <small>HIGH</small>

                  <span className="forecast-high">
                    {convertTemperature(
                      daily.temperature_2m_max[index],
                      unit
                    ).toFixed(1)}°{unit}
                  </span>
                </div>


                <div className="forecast-temp-item">
                  <small>LOW</small>

                  <span className="forecast-low">
                    {convertTemperature(
                      daily.temperature_2m_min[index],
                      unit
                    ).toFixed(1)}°{unit}
                  </span>
                </div>

              </div>

            </div>
          )
        })}

      </div>

    </div>
  )
}

export default Forecast