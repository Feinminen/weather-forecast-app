import React, { memo } from 'react'

import block from 'bem-cn-lite'

import { Forecast } from '../../shared/types'
import { ToggleSwitch } from '../../components/ToggleSwitch'
import { BASE_ICON_URL } from '../../shared/config'

import './index.scss'

const b = block('weather-card')

interface WeatherCardProps {
  forecast: Forecast
  metric: 'celsius' | 'fahrenheit'
  onMetricSwitch: () => void
}

export const WeatherCard = memo(({ forecast, metric, onMetricSwitch }: WeatherCardProps) => (
  <div className={b()}>
    <div className={b('header')}>
      <h3 className={b('title')}>Current weather</h3>
      <ToggleSwitch onClick={onMetricSwitch}>{metric === 'celsius' ? 'C' : 'F'}</ToggleSwitch>
    </div>
    <div className={b('info')}>
      <div className={b('info-main')}>
        <h3 className={b('city')}>{forecast.city}</h3>
        <div className={b('temperature-block')}>
          <img
            width="70px"
            src={`${BASE_ICON_URL}${forecast.weatherList[0].iconId}.png`}
            alt="Weather icon"
          />
          <span className={b('temperature')}>{forecast.weatherList[0].temperature[metric]}</span>
        </div>
        <span>{forecast.weatherList[0].description}</span>
      </div>
      <div className={b('info-side')}>
        <span>{`Feels like: ${forecast.weatherList[0].feelsLikeTemperature[metric]}`}</span>
        <span>{`Cloudiness: ${forecast.weatherList[0].cloudiness}`}</span>
        <span>{`Humidity: ${forecast.weatherList[0].humidity}`}</span>
        <span>{`Pressure: ${forecast.weatherList[0].pressure}`}</span>
        <span>{`Precipitation probability: ${forecast.weatherList[0].precipitationProbability}`}</span>
      </div>
    </div>
  </div>
))

WeatherCard.displayName = 'WeatherCard'
