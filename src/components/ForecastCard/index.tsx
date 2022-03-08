import React from 'react'

import block from 'bem-cn-lite'

import { BASE_ICON_URL } from '../../shared/config'
import { ForecastCardData, Metric } from '../../shared/types'

import './index.scss'

const b = block('forecast-card')

interface ForecastCardProps extends ForecastCardData {
  metric: Metric
}

export const ForecastCard = ({
  day,
  iconId,
  description,
  temperature,
  metric,
}: ForecastCardProps) => (
  <div className={b()}>
    <h4 className={b('day')}>{day}</h4>
    <img
      className={b('icon')}
      height="50px"
      src={`${BASE_ICON_URL}${iconId}.png`}
      alt="Weather icon"
    />
    <span className={b('description')}>{description}</span>
    <span>{temperature[metric]}</span>
  </div>
)
