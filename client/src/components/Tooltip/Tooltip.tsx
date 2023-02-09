import React from 'react'
import { ITooltipInterface } from '@Utils/interface/ComponentInterface'
import { InfoIcon } from '@Assets/images'

const Tooltip: React.FC<ITooltipInterface> = props => {
  return (
    <div className="tooltip-border">
      <div className="dropdown" data-tooltip={props.infoData}>
        <img src={InfoIcon} className="infoImage" />
      </div>
    </div>
  )
}

export default Tooltip
