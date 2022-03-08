import React, { useCallback, useEffect, useMemo, useState } from 'react'

import block from 'bem-cn-lite'
import { RouteComponentProps } from 'react-router-dom'

import { Header } from '../../components/Header'
import { SearchForm } from '../../components/SearchForm'
import { Loader } from '../../components/Loader'
import { WeatherCard } from '../../components/WeatherCard'
import { ForecastCard } from '../../components/ForecastCard'
import { useWeatherForecast } from '../../hooks/useWeatherForecast'
import { UserLocation, Metric, RequestParams } from '../../shared/types'
import { constructLocation } from '../../hooks/utils'
import { getForecastCardsData } from './utils'
import './index.scss'

const b = block('app')

export function App({
  history,
  match: {
    params: { location },
  },
}: RouteComponentProps<{ location?: string }>) {
  const [isPageLoading, setIsPageLoading] = useState(true)
  const { makeForecastRequest, setForecast, isLoading, forecast } = useWeatherForecast()
  const [userLocation, setUserLocation] = useState<UserLocation>(null)
  const [metric, setMetric] = useState<Metric>('celsius')

  const handleFormSubmit = useCallback(
    (params: RequestParams) => {
      history.push(`/${constructLocation(params)}`)
      void makeForecastRequest(params)
    },
    [makeForecastRequest, history]
  )

  useEffect(() => {
    if (location && forecast === null) {
      const savedForecast = localStorage.getItem(location)

      if (savedForecast !== null) {
        setForecast(JSON.parse(savedForecast))
      }
    }
  }, [location, forecast, setForecast])

  useEffect(() => {
    const setLoadingToTrue = () => setIsPageLoading(false)
    document.addEventListener('readystatechange', setLoadingToTrue)

    return () => document.removeEventListener('readystatechange', setLoadingToTrue)
  }, [])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) =>
      setUserLocation({ lon: longitude, lat: latitude })
    )
  }, [])

  const handleMetricSwitch = useCallback(() => {
    setMetric((prev) => (prev === 'celsius' ? 'fahrenheit' : 'celsius'))
  }, [])

  const cardsData = useMemo(
    () => (forecast !== null ? getForecastCardsData(forecast) : []),
    [forecast]
  )

  return (
    <div className={b()}>
      {isPageLoading && (
        <div className={b('full-page-loader')}>
          <Loader />
        </div>
      )}
      <Header />
      <div className={b('content')}>
        <div className={b('form', { disabled: isLoading })}>
          <SearchForm onSubmit={handleFormSubmit} userLocation={userLocation} />
        </div>
        {isLoading && forecast === null && (
          <div className={b('loader')}>
            <Loader />
          </div>
        )}
        {forecast !== null && (
          <div className={b('weather')}>
            <div className={b('weather-card')}>
              <WeatherCard
                forecast={forecast}
                metric={metric}
                onMetricSwitch={handleMetricSwitch}
              />
            </div>
            <div className={b('forecast')}>
              <h4 className={b('forecast-title')}>5-day forecast</h4>
              <div className={b('forecast-cards')}>
                {cardsData.map((props, index) => (
                  <ForecastCard key={index} metric={metric} {...props} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
