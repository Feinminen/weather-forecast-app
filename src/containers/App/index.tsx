import React, { useCallback, useEffect, useState } from 'react'

import block from 'bem-cn-lite'

import { Header } from '../../components/Header'
import { SearchForm } from '../../components/SearchForm'
import { Loader } from '../../components/Loader'
import { WeatherCard } from '../../components/WeatherCard'
import { RequestParams, useWeatherForecast } from '../../hooks/useWeatherForecast'
import { UserLocation, Metric } from '../../shared/types'

import './index.scss'

const b = block('app')

export function App() {
  const { makeForecastRequest, isLoading, forecast } = useWeatherForecast()
  const [userLocation, setUserLocation] = useState<UserLocation>(null)
  const [metric, setMetric] = useState<Metric>('celsius')

  const handleFormSubmit = useCallback(
    (params: RequestParams) => {
      void makeForecastRequest(params)
    },
    [makeForecastRequest]
  )

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) =>
      setUserLocation({ lon: longitude, lat: latitude })
    )
  }, [])

  const handleMetricSwitch = useCallback(() => {
    setMetric((prev) => (prev === 'celsius' ? 'fahrenheit' : 'celsius'))
  }, [])

  return (
    <div className={b()}>
      <Header />
      <div className={b('content', { 'is-initial': forecast === null })}>
        <div className={b('form', { disabled: isLoading })}>
          <SearchForm onSubmit={handleFormSubmit} userLocation={userLocation} />
        </div>
        {isLoading && (
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
          </div>
        )}
      </div>
    </div>
  )
}
