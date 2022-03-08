import { Day, ForecastCardData } from './../../shared/types'
import { Forecast } from '../../hooks/types'

const MILLISECONDS_MULTIPLIER = 1000
const DATA_HOURS_GAP = 3
const DAYTIME_HOURS = 12
const HOURS_IN_A_DAY = 24
const DAY_DATA_SHIFT = HOURS_IN_A_DAY / DATA_HOURS_GAP

const getPropsFromIndex = (forecast: Forecast, index: number) => {
  const { description, temperature, iconId, time } = forecast.weatherList[index]

  const day = new Date(
    time * MILLISECONDS_MULTIPLIER + forecast.timezoneShift * MILLISECONDS_MULTIPLIER
  ).toLocaleString('en-us', { weekday: 'short' }) as Day

  return {
    description,
    temperature,
    day,
    iconId,
  }
}

export const getForecastCardsData = (forecast: Forecast): ForecastCardData[] => {
  const date = new Date(forecast.weatherList[0].time * MILLISECONDS_MULTIPLIER)
  const utcHours = new Date(
    date.getTime() + forecast.timezoneShift * MILLISECONDS_MULTIPLIER
  ).getUTCHours()

  const firstDataShift = Math.round((HOURS_IN_A_DAY - utcHours + DAYTIME_HOURS) / DATA_HOURS_GAP)

  return new Array(5)
    .fill(0)
    .map((_, index) =>
      getPropsFromIndex(
        forecast,
        index === 0 ? index : firstDataShift + DAY_DATA_SHIFT * (index - 1)
      )
    )
}
