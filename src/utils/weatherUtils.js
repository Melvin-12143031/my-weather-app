  const getWeatherInfo = (code) => {
  switch (true) {
    case code === 0:
      return {
        description: "Clear sky",
        icon: "☀️"}

    case code === 1:
      return {
        description: "Mainly clear",
        icon: "🌤️"}

    case code === 2:
      return {
        description: "Partly cloudy",
        icon: "⛅"}

    case code === 3:
      return {
        description: "Overcast",
        icon: "☁️"}

    case code >= 51 && code <= 57:
      return {
        description: "Drizzle",
        icon: "🌦️"}

    case code >= 61 && code <= 67:
      return {
        description: "Rain",
        icon: "🌧️"}

    case code >= 71 && code <= 77:
      return {
        description: "Snow",
        icon: "❄️"}

    case code >= 80 && code <= 82:
      return {
        description: "Rain Shower",
        icon: "🌦️"}

    case code >= 95 && code <= 99:
      return {
        description: "Thunderstorm",
        icon: "⛈️"}

    default:
      return {
        description: "Unknown",
        icon: "🌤️"
      }
  }
}


const getWeatherTheme = (code) =>{

  if (code === 0) {
    return "sunny"
  }

  if (code >= 1 && code <= 3) {
    return  "cloudy"
  }

  if ((code >= 51 && code <= 67) ||
    (code >= 80 && code <= 82)) {
      return "rainy"
    }

  if (code >= 95 && code <= 99) {
    return  "stormy"
  }

    if (code >= 71 && code <= 77) {
    return  "snowy"
  }

  return "default"
}

const isDayTime = (currentTime, sunrise, sunset) => {
  const current = currentTime.substring(11, 16)
  const sunriseTime = sunrise.substring(11, 16)
  const sunsetTime = sunset.substring(11, 16)

  return current >= sunriseTime && current < sunsetTime
}

const getWindDirection = (degrees) => {
  if (degrees == null) {
    return "—"
  }

  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW"
  ]

  const index = Math.round(degrees / 22.5) % 16

  return directions[index]
}


const convertTemperature = (temperature, unit) => {
    if(unit === "C") {
      return temperature
    }

    return (temperature * 9 / 5 ) + 32
}

const convertWindSpeed = (speed, unit) => {
  if (unit === "F") {
    return speed * 0.621371
  }

  return speed
}

export {
getWeatherInfo,
getWeatherTheme,
isDayTime,
getWindDirection,
convertTemperature,
convertWindSpeed

}