import React, { FC, useState } from 'react'

import { URLS } from '@Utils/constants'
import { INavPanelInterface } from '@Interface/ComponentInterface'
import { IDefaultPageProps } from '@Interface/PagesInterface'

import { SortIcon } from '@Assets/images'

const NavPanel: FC<INavPanelInterface & IDefaultPageProps> = props => {
  const [toggleState, setToggleState] = useState<number>(0)

  const toggleTab = index => {
    setToggleState(index)
  }

  return (
    <div className="nav-link-container">
      <div className="tabs-panel">
        <div className="nav-header">
          {props.t('edge-nodes.name')}
          <img src={SortIcon} className="sort-icon" />
        </div>
        {props.navigationList?.map((data, index) => {
          return (
            <div
              className={toggleState === index ? 'tabs active-tabs' : 'tabs'}
              onClick={() => {
                toggleTab(index),
                  props.navigatePage && props.navigate(URLS.EDGEAPPINSTANCES)
              }}
            >
              {data?.device}
            </div>
          )
        })}
      </div>

      <div className="content-tabs">
        {props.navigationData?.map((data, index) => {
          return (
            <div
              className={
                toggleState === index ? 'content  active-content' : 'content'
              }
            >
              {props.children}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default NavPanel
