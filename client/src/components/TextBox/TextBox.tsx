import React, { FC } from 'react'
import { ITextBoxInterface } from '@Interface/ComponentInterface/TextBoxInterface'

const TextBox: FC<ITextBoxInterface> = props => {
  return (
    <div className={`inputTextField ${props.className}`}>
      <div className="form-group">
        <label className="label-style fs-12">{props.labelName}</label>
        <div className="input-group mb-0">
          <input
            type={props.type}
            name={props.name}
            className="form-control fs-14 w-100 px-0 border-top-0 border-end-0 border-start-0 rounded-0"
            placeholder={props.placeHolder}
            onChange={props.handleInputChange}
          />
          <i className="eye-icon" onClick={props.handleIconClick}>
            <span className={props.icon}></span>
          </i>
        </div>
      </div>
    </div>
  )
}

export default TextBox
