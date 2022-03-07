import * as t from 'runtypes'

import { ForecastResponse } from './config'
import { Forecast } from './types'

export function handleResponse(response: Response) {
  if (response.ok) {
    return response.json()
  }
  throw new Error(response.statusText)
}

const getTemperatureProps = (celsiusTemperature: number) => ({
  celsius: `${celsiusTemperature} C`,
  fahrenheit: `${(celsiusTemperature * 9) / 5 + 32} F`,
})

const transformResponseToForecastData = (reqResponse: ForecastResponse): Forecast => ({
  weatherList: reqResponse.list.map((elem) => ({
    time: elem.dt,
    temperature: getTemperatureProps(elem.main.temp),
    feelsLikeTemperature: getTemperatureProps(elem.main.feels_like),
    minTemperature: getTemperatureProps(elem.main.temp_min),
    maxTemperature: getTemperatureProps(elem.main.temp_max),
    pressure: `${elem.main.pressure} hPa`,
    humidity: `${elem.main.humidity} %`,
    description: elem.weather[0].description,
    iconId: elem.weather[0].icon,
    cloudiness: `${elem.clouds.all} %`,
    precipitationProbability: `${elem.pop} %`,
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
