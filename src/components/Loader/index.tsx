import React from 'react'

import block from 'bem-cn-lite'

import './index.scss'

const b = block('loader')

export function Loader() {
  return (
    <div className={b()}>
      <div className={b('first-block')} />
      <div className={b('second-block')} />
      <div />
    </div>
  )
}
