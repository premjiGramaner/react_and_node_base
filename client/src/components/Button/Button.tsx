import React from 'react'
import { IButtonInterface } from '@Interface/ComponentsInterface/ButtonInterface'

const Button: React.FC<IButtonInterface> = props => {
  const { handleButtonClick, className, children } = props
  return (
    <button className={`border-0 ${className}`} onClick={handleButtonClick}>
      {children}
    </button>
  )
}

export default Button
