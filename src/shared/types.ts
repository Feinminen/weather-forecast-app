export type Metric = 'celsius' | 'fahrenheit'

export type UserLocation = {
  lat: number
  lon: number
} | null

export type Day = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export interface TemperatureData {
  celsius: string
  fahrenheit: string
}

export interface ForecastCardData {
  day: Day
  iconId: string
  description: string
  temperature: TemperatureData
}

interface CoordinatesRequestParams {
  coordinates: {
    lon: number
    lat: number
  }
  city?: never
}

interface CityRequestParams {
  city: string
  coordinates?: never
}

export type RequestParams = CoordinatesRequestParams | CityRequestParams
