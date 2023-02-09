import React from 'react'
import { ITooltipInterface } from '@Utils/interface/ComponentInterface'

const Tooltip: React.FC<ITooltipInterface> = props => {
  return (
    <div className="tooltip-border">
      <div className="dropdown" data-tooltip={props.infoData}>
        <i className="fa fa-info-circle infoImage" aria-hidden="true"></i>
      </div>
    </div>
  )
}

export default Tooltip
