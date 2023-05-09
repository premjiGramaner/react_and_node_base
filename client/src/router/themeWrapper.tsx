import React, { createContext, useState } from 'react'

export const ThemeColors = {
  primary: 'brown',
  blue: 'blue',
  red: 'red',
  purple: 'purple',
  orange: 'orange',
  green: 'green',
}

export const ThemeColorContext = createContext({
  color: ThemeColors.blue,
})

export const ThemeColorWrapper = props => {
  const [color] = useState(ThemeColors.blue)

  const Component = props.component
  if (!Component) {
    return null
  }
  return (
    <ThemeColorContext.Provider value={{ color: color }}>
      <Component color={color} />
    </ThemeColorContext.Provider>
  )
}
