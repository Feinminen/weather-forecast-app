import { TemperatureData } from '../shared/types'

interface WeatherProps {
  time: number
  temperature: TemperatureData
  feelsLikeTemperature: TemperatureData
  minTemperature: TemperatureData
  maxTemperature: TemperatureData
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
