import * as t from 'runtypes'

import { ForecastResponse } from './config'
import { RequestParams, Forecast } from '../../../shared/types'

const getTemperatureData = (celsiusTemperature: number) => ({
  celsius: `${celsiusTemperature} C`,
  fahrenheit: `${parseFloat(((celsiusTemperature * 9) / 5 + 32).toFixed(2))} F`,
})

const transformResponseToForecastData = (reqResponse: ForecastResponse): Forecast => ({
  weatherList: reqResponse.list.map((elem) => ({
    time: elem.dt,
    temperature: getTemperatureData(elem.main.temp),
    feelsLikeTemperature: getTemperatureData(elem.main.feels_like),
    minTemperature: getTemperatureData(elem.main.temp_min),
    maxTemperature: getTemperatureData(elem.main.temp_max),
    pressure: `${elem.main.pressure} hPa`,
    humidity: `${elem.main.humidity} %`,
    description: elem.weather[0].description,
    iconId: elem.weather[0].icon,
    cloudiness: `${elem.clouds.all} %`,
    precipitationProbability: `${Math.round(elem.pop * 100)} %`,
  })),
  city: reqResponse.city.name,
  countryCode: reqResponse.city.country,
  timezoneShift: reqResponse.city.timezone,
})

export const prepareResponse = (response: Response) => {
  let forecast: Forecast
  let withError = false

  try {
    const validResponse = ForecastResponse.check(response)

    forecast = transformResponseToForecastData(validResponse)
  } catch (error) {
    withError = true
    throw error instanceof t.ValidationError
      ? new Error(`${error.name}: ${error.message}; Details: ${JSON.stringify(error.details)}`)
      : error
  }

  return { forecast, withError }
}

export const checkLocalStorageAvailable = () => {
  try {
    return Boolean(localStorage)
  } catch (e) {
    return false
  }
}

export const constructLocation = (params: RequestParams) =>
  params.city !== undefined
    ? `city=${params.city}`
    : `lat=${params.coordinates.lat}?lon=${params.coordinates.lon}`
