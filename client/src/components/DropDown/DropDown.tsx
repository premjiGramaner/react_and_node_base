import React, { useState } from 'react'
import { ExpandIcon, CollapseIcon } from '@Assets/images'
import { IDefaultPageProps } from '@Interface/PagesInterface'

const DropDown: React.FC<IDefaultPageProps> = props => {
  const [show, setShow] = useState<boolean>(false)
  const handleCollapse = () => {
    setShow(!show)
  }
  const showContent = show ? 'show' : ''

  return (
    <div id="accordion" className="dropDownContainer">
      <div className="card cardborder">
        <div className="" id="headingOne">
          <div className="descriptive-insights d-flex justify-content-between mb-0 px-3">
            <button
              className="bg-transparent border-0 fw-bold fs-12"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              {props.t('dropdown.title')}
            </button>

            <img
              src={show ? CollapseIcon : ExpandIcon}
              className="expand-icon"
              onClick={handleCollapse}
              alt=""
            />
          </div>
        </div>

        <div
          id="collapseOne"
          className={`${showContent} collapse`}
          aria-labelledby="headingOne"
          data-parent="#accordion"
        >
          <div className="descriptive-helpertxt card-body px-4">
            {props.t('dropdown.value')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DropDown
