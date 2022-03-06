interface WeatherProps {
  time: number
  temperature: number
  feelsLikeTemperature: number
  minTemperature: number
  maxTemperature: number
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
