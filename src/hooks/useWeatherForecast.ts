import { useCallback, useEffect, useRef, useState } from 'react'

import { Forecast } from './types'
import { prepareResponse, handleResponse } from './utils'

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

const API_BASE_PATH = 'https://api.openweathermap.org/data/2.5/forecast'
const API_KEY = '1d1770ec405e1b572ad94521da7da747'

const constructPath = (params: RequestParams) => {
  if (params.city !== undefined) {
    return `${API_BASE_PATH}?q=${params.city}&appid=${API_KEY}`
  } else {
    return `${API_BASE_PATH}?lat=${params.coordinates.lat}&lon=${params.coordinates.lon}&appid=${API_KEY}`
  }
}

export const useWeatherForecast = () => {
  const [forecast, setForecast] = useState<Forecast | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const abortController = useRef<AbortController | null>(null)

  const makeForecastRequest = useCallback(async (params: RequestParams) => {
    if (abortController.current !== null) {
      abortController.current.abort()
    }

    abortController.current = new AbortController()
    setIsLoading(true)
    setIsError(false)

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

        setForecast(forecastData.forecast)
        abortController.current = null
        setIsLoading(forecastData.withError)
      })
  }, [])

  useEffect(() => {
    return () => {
      if (abortController.current) {
        abortController.current.abort()
        abortController.current = null
      }
    }
  }, [])

  return {
    forecast,
    isLoading,
    isError,
    makeForecastRequest,
  }
}
