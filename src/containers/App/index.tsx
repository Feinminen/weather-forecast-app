import React, { useCallback, useEffect, useMemo, useState } from 'react'

import block from 'bem-cn-lite'

import { Header } from '../../components/Header'
import { SearchForm } from '../../components/SearchForm'
import { Loader } from '../../components/Loader'
import { WeatherCard } from '../../components/WeatherCard'
import { ForecastCard } from '../../components/ForecastCard'
import { RequestParams, useWeatherForecast } from '../../hooks/useWeatherForecast'
import { UserLocation, Metric } from '../../shared/types'
import { getForecastCardsData } from './utils'
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

  const cardsData = useMemo(
    () => (forecast !== null ? getForecastCardsData(forecast) : []),
    [forecast]
  )

  return (
    <div className={b()}>
      <Header />
      <div className={b('content')}>
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
