import React from 'react'
import { IDefaultPageProps } from '@Interface/PagesInterface'
import { ISVGInterface } from '@Interface/ComponentInterface/SVGInterface'

const SVG: React.FC<IDefaultPageProps & ISVGInterface> = props => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox={props.viewBox}
      className={props.className}
      version="1.1"
    >
      {props.children}
    </svg>
  )
}

export default SVG
