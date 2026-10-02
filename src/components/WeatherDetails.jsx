import {
    getWindDirection,
    convertWindSpeed
} from "../utils/weatherUtils"

const WeatherDetails = ({
    humidity,
    windSpeed,
    windGusts,
    windDirection,
    precipitation,
    sunrise,
    sunset,
    unit
}) => {

    const direction =
        getWindDirection(windDirection)


    const directionAngles = {
        N: 0,
        NNE: 22.5,
        NE: 45,
        ENE: 67.5,
        E: 90,
        ESE: 112.5,
        SE: 135,
        SSE: 157.5,
        S: 180,
        SSW: 202.5,
        SW: 225,
        WSW: 247.5,
        W: 270,
        WNW: 292.5,
        NW: 315,
        NNW: 337.5
    }

    const formatTime = (time) => {
        if (!time) {
            return "—"
        }

        return new Date(time).toLocaleTimeString(
            "en-US",
            {
                hour: "numeric",
                minute: "2-digit"
            }
        )


    }

    const convertedWindSpeed = convertWindSpeed(
        windSpeed,
        unit
    )

    const convertedWindGusts = convertWindSpeed(
        windGusts,
        unit
    )



    return (
        <>
            <div className="details-header">
                <h3>Current Condition</h3>
            </div>

            <div className="weather-details">

                <div className="weather-stat">
                    <div className="stat-icon">
                        💧
                    </div>

                    <div className="stat-info">
                        <span className="stat-label">
                            Humidity
                        </span>

                        <strong>
                            {humidity ?? "-"} {humidity != null && "%"}
                        </strong>
                    </div>
                </div>


                <div className="weather-stat">
                    <div className="stat-icon">
                        💨
                    </div>

                    <div className="stat-info">
                        <span className="stat-label">
                            Wind
                        </span>

                        <strong>
                            {windSpeed != null
                                ? `${convertedWindSpeed.toFixed(1)} ${unit === "F" ? "mph" : "km/h"
                                }`
                                : "—"}
                        </strong>

                        <small>
                            Gusts{" "}
                            {windGusts != null
                                ? `${convertedWindGusts.toFixed(1)} ${unit === "F" ? "mph" : "km/h"
                                }`
                                : "—"}
                        </small>


                    </div>
                </div>


                <div className="weather-stat">
                    <div className="stat-icon">
                        🧭
                    </div>

                    <div className="stat-info">
                        <span className="stat-label">
                            Direction
                        </span>

                        <strong>
                            {windDirection != null ? direction : "—"}
                        </strong>

                        {windDirection != null && (
                            <small>
                                {windDirection}°
                            </small>
                        )}
                    </div>

                    {windDirection != null && (
                        <div
                            className="wind-arrow"
                            style={{
                                transform: `rotate(${directionAngles[direction]}deg)`
                            }}
                        >
                            ↑
                        </div>
                    )}
                </div>


                <div className="weather-stat">
                    <div className="stat-icon">
                        🌧️
                    </div>

                    <div className="stat-info">
                        <span className="stat-label">
                            Precipitation
                        </span>

                        <strong>
                            {precipitation != null
                                ? `${precipitation} mm`
                                : "—"}
                        </strong>
                    </div>
                </div>

            </div>


            <div className="sun-times">

                <div className="sun-time">
                    <span>🌅</span>

                    <div>
                        <small>Sunrise</small>
                        <strong>
                            {formatTime(sunrise)}
                        </strong>
                    </div>
                </div>


                <div className="sun-time">
                    <span>🌇</span>

                    <div>
                        <small>Sunset</small>
                        <strong>
                            {formatTime(sunset)}
                        </strong>
                    </div>
                </div>

            </div>
        </>
    )
}

export default WeatherDetails