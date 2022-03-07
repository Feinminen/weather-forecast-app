interface TemperatureProps {
  celsius: string
  fahrenheit: string
}

interface WeatherProps {
  time: number
  temperature: TemperatureProps
  feelsLikeTemperature: TemperatureProps
  minTemperature: TemperatureProps
  maxTemperature: TemperatureProps
  pressure: string
  humidity: string
  description: string
  iconId: string
  cloudiness: string
  precipitationProbability: string
}

export interface Forecast {
  weatherList: WeatherProps[]
  city: string
  countryCode: string
  timezoneShift: number
}
