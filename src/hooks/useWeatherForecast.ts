import { useCallback, useEffect, useRef, useState } from 'react'

import { RequestParams } from '../shared/types'
import { Forecast } from './types'
import { prepareResponse, handleResponse, constructLocation } from './utils'

const API_BASE_PATH = 'https://api.openweathermap.org/data/2.5/forecast'
const API_KEY = '1d1770ec405e1b572ad94521da7da747'

const constructPath = (params: RequestParams) => {
  if (params.city !== undefined) {
    return `${API_BASE_PATH}?q=${params.city}&units=metric&appid=${API_KEY}`
  }
  return `${API_BASE_PATH}?lat=${params.coordinates.lat}&units=metric&lon=${params.coordinates.lon}&appid=${API_KEY}`
}

export const useWeatherForecast = () => {
  const [forecast, setForecast] = useState<Forecast | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const abortController = useRef<AbortController | null>(null)

  const makeForecastRequest = useCallback(async (params: RequestParams) => {
    setForecast(null)
    setIsLoading(true)
    setIsError(false)

    if (abortController.current !== null) {
      abortController.current.abort()
    }

    abortController.current = new AbortController()

    const path = constructPath(params)
    await fetch(path, {
      signal: abortController.current.signal,
    })
      .then(handleResponse)
      .then((res) => {
        const forecastData = prepareResponse(res)

        if (!forecastData) {
          setIsError(true)
        }

        if (forecastData.forecast) {
          localStorage.setItem(constructLocation(params), JSON.stringify(forecastData.forecast))
        }

        setForecast(forecastData.forecast)
        abortController.current = null
        setIsLoading(forecastData.withError)
      })
  }, [])

  useEffect(
    () => () => {
      if (abortController.current) {
        abortController.current.abort()
        abortController.current = null
      }
    },
    []
  )

  return {
    forecast,
    isLoading,
    isError,
    makeForecastRequest,
    setForecast,
  }
}
