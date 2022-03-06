import React, { useCallback, useEffect, useState } from 'react'

import { Header } from '../../components/Header'
import { SearchForm } from '../../components/SearchForm'
import { Loader } from '../../components/Loader'
import { RequestParams, useWeatherForecast } from '../../hooks/useWeatherForecast'
import './index.scss'

export type UserLocation = {
  lat: number
  lon: number
} | null

export function App() {
  const { makeForecastRequest, isLoading } = useWeatherForecast()
  const [userLocation, setUserLocation] = useState<UserLocation>(null)

  const handleFormSubmit = useCallback((params: RequestParams) => {
    makeForecastRequest(params)
  }, [])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) =>
      setUserLocation({ lon: longitude, lat: latitude })
    )
  }, [])

  useEffect(() => {
    if (userLocation !== null) {
      makeForecastRequest({
        coordinates: { lat: userLocation.lat, lon: userLocation.lon },
      })
    }
  }, [userLocation])

  return (
    <div className="app">
      <Header />
      {isLoading ? (
        <div className="app__loader">
          <Loader />
        </div>
      ) : (
        <div className="app__form">
          <SearchForm onSubmit={handleFormSubmit} userLocation={userLocation} />
        </div>
      )}
    </div>
  )
}
