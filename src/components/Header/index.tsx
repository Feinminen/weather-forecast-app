import React from 'react'

import block from 'bem-cn-lite'

import './index.scss'

const b = block('header')

export function Header() {
  return (
    <div className={b()}>
      <h1 className={b('title')}>Your Weather Forecast</h1>
    </div>
  )
}
