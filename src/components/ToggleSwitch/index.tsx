import React from 'react'

import block from 'bem-cn-lite'

import './index.scss'

const b = block('toggle-switch')

interface ToggleSwitchProps {
  onClick: () => void
  children: React.ReactNode
}

export function ToggleSwitch({ children, onClick }: ToggleSwitchProps) {
  return (
    <div className={b()} onClick={onClick}>
      <input type="checkbox" className={b('input')} />
      <div className={b('background')} />
      {children}
    </div>
  )
}
