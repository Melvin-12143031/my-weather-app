import WeatherCard from "./WeatherCard";
import Forecast from "./Forecast";

const WeatherResults = ({ weather, location, unit, onRefresh, lastUpdated, loading }) => {

    if (!weather || !location) {
        return null
    }

    return (
        <>
            <WeatherCard
                weather={weather}
                location={location}
                unit={unit}
                onRefresh={onRefresh}
                lastUpdated={lastUpdated}
                loading={loading}
            />

            <Forecast
                daily={weather.daily}
                unit={unit}
            />

        </>
    )
}

export default WeatherResults
