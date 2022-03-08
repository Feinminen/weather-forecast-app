import React, { useCallback, useState } from 'react'

import block from 'bem-cn-lite'

import { UserLocation, RequestParams } from '../../shared/types'
import './index.scss'

interface SearchFormProps {
  userLocation: UserLocation
  withError: boolean
  onSubmit: (requestParams: RequestParams) => void
}

const EMPTY_INPUT_VALUE = ''
const ERROR_TEXT = 'The entered city was not found, please try to enter another city'

const b = block('search-form')

export const SearchForm = ({ onSubmit, userLocation, withError }: SearchFormProps) => {
  const [city, setCity] = useState(EMPTY_INPUT_VALUE)

  const handleFormSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (city !== '') {
        event.preventDefault()
        onSubmit({ city })
        setCity(EMPTY_INPUT_VALUE)
      }
    },
    [city, onSubmit]
  )

  const handleButtonClick = useCallback(() => {
    if (userLocation !== null) {
      onSubmit({ coordinates: userLocation })
    }
  }, [userLocation, onSubmit])

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value)
  }, [])

  return (
    <form onSubmit={handleFormSubmit} className={b({ 'with-error': withError })}>
      <input
        className={b('input')}
        aria-label="city"
        type="text"
        placeholder="Type required city:"
        required
        value={city}
        onChange={handleInputChange}
      />

      <div className={b('buttons')}>
        <button
          className={b('button')}
          type="submit"
          onClick={handleFormSubmit}
          disabled={city === EMPTY_INPUT_VALUE}
        >
          search
        </button>

        <button
          className={b('button')}
          type="button"
          onClick={handleButtonClick}
          disabled={userLocation === null}
        >
          use location
        </button>
      </div>
      {withError && <div className={b('error')}>{ERROR_TEXT}</div>}
    </form>
  )
}
