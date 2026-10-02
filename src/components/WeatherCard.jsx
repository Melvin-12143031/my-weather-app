import {
    getWeatherInfo,
    getWeatherTheme,
    isDayTime,
    convertTemperature
} from "../utils/weatherUtils"

import WeatherDetails from "./WeatherDetails"

const WeatherCard = ({
    weather,
    location,
    unit,
    onRefresh,
    lastUpdated,
    loading
}) => {
    const weatherInfo = getWeatherInfo(
        weather?.current?.weather_code
    )

    const weatherTheme = getWeatherTheme(
        weather?.current?.weather_code
    )

    const daytime =
        weather?.current?.time &&
            weather?.daily?.sunrise?.[0] &&
            weather?.daily?.sunset?.[0]
            ? isDayTime(
                weather.current.time,
                weather.daily.sunrise[0],
                weather.daily.sunset[0]
            )
            : false

    const temperature = convertTemperature(
        weather.current.temperature_2m,
        unit
    )

    const feelsLike = convertTemperature(
        weather.current.apparent_temperature,
        unit
    )

    return (
        <section
            className={`weather-card ${weatherTheme} ${daytime ? "day" : "night"
                }`}
        >

            <div className="weather-header">

                <div className="location">
                    <h2>{location.name}</h2>

                    <p>
                        {location.admin1 &&
                            `${location.admin1}, `}
                        {location.country}
                    </p>
                </div>

                <div className="day-status">
                    {daytime
                        ? "☀️ Daytime"
                        : "🌙 Nighttime"}
                </div>

            </div>


            <div className="weather-main">

                <div className="weather-icon">
                    {weatherInfo.icon}
                </div>

                <div className="temperature-wrapper">

                    <div className="temperature">
                        {temperature.toFixed(1)}°{unit}
                    </div>

                    <span className="temperature-label">
                        CURRENT
                    </span>

                </div>

            </div>


            <div className="weather-summary">

                <p className="weather-condition">
                    {weatherInfo.description}
                </p>

                <p className="feels-like">
                    Feels like {feelsLike.toFixed(1)}°{unit}
                </p>

            </div>


            <WeatherDetails
                humidity={
                    weather?.current?.relative_humidity_2m
                }
                windSpeed={
                    weather?.current?.wind_speed_10m
                }
                windGusts={
                    weather?.current?.wind_gusts_10m
                }
                windDirection={
                    weather?.current?.wind_direction_10m
                }
                precipitation={
                    weather?.current?.precipitation
                }

                sunrise={weather?.daily?.sunrise?.[0]}
                sunset={weather?.daily?.sunset?.[0]}
                unit={unit}
            />


            <div className="weather-footer">

                <p className="last-updated">
                    🕐 Updated{" "}
                    {lastUpdated
                        ? lastUpdated.toLocaleTimeString(
                            "en-US",
                            {
                                hour: "numeric",
                                minute: "2-digit"
                            }
                        )
                        : "—"}
                </p>

                <button
                    className="refresh-button"
                    onClick={onRefresh}
                    disabled={loading}
                >
                    {loading
                        ? "⟳ Refreshing..."
                        : "↻ Refresh"}
                </button>

            </div>

        </section>
    )
}

export default WeatherCard