import * as t from 'runtypes'

export const ForecastResponse = t.Record({
  list: t.Array(
    t.Record({
      // Time of data forecasted, unix, UTC
      dt: t.Number,
      main: t.Record({
        // Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
        temp: t.Number,
        // This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
        // eslint-disable-next-line @typescript-eslint/naming-convention
        feels_like: t.Number,
        // Minimum temperature at the moment of calculation. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
        // eslint-disable-next-line @typescript-eslint/naming-convention
        temp_min: t.Number,
        // Maximum temperature at the moment of calculation. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
        // eslint-disable-next-line @typescript-eslint/naming-convention
        temp_max: t.Number,
        // Atmospheric pressure on the sea level by default, hPa
        pressure: t.Number,
        // Humidity, %
        humidity: t.Number,
      }),
      weather: t.Array(
        t.Record({
          // Precise weather condition
          description: t.String,
          // Weather icon id (needed to request a proper icon)
          icon: t.String,
        })
      ),
      clouds: t.Record({
        // Cloudiness, %
        all: t.Number,
      }),
      // Probability of precipitation
      pop: t.Number,
    })
  ),
  city: t.Record({
    name: t.String,
    // Country code (GB, JP etc.)
    country: t.String,
    // Shift in seconds from UTC
    timezone: t.Number,
  }),
})

export type ForecastResponse = t.Static<typeof ForecastResponse>
