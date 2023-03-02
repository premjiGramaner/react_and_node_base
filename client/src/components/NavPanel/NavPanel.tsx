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
    <div className="nav-link-container w-100">
      {props.navigationList?.length > 0 && (
        <div className="tabs-panel">
          <div className="nav-header">
            {props.t('edge-nodes.name')}
            <img src={SortIcon} className="sort-icon" />
          </div>
          {props.navigationList?.map((data, index) => {
            return (
              <div
                key={index}
                className="tabs"
                onClick={() => {
                  toggleTab(index),
                    props.navigatePage && props.navigate(URLS.EDGEAPPINSTANCES),
                    props.handleDeviceData(data.id),
                    props.handleListCount()
                }}
              >
                {data?.name}
              </div>
            )
          })}
        </div>
      )}
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
