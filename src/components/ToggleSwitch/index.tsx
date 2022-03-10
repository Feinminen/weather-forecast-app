import React, { memo } from 'react'

import block from 'bem-cn-lite'

import './index.scss'

const b = block('toggle-switch')

interface ToggleSwitchProps {
  onClick: () => void
  children: React.ReactNode
}

export const ToggleSwitch = memo(({ children, onClick }: ToggleSwitchProps) => (
  <div className={b()} onClick={onClick}>
    <input type="checkbox" className={b('input')} />
    <div className={b('background')} />
    {children}
  </div>
))

ToggleSwitch.displayName = 'ToggleSwitch'
