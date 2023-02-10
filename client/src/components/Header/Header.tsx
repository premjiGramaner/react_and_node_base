import React from 'react'
import { IHeaderInterface } from '@Utils/interface/ComponentInterface/HeaderInterface'
import { IDefaultPageProps } from '@Interface/PagesInterface'

import { HelpIcon, HeaderLogo } from '@Assets/images'

const Header: React.FC<IDefaultPageProps & IHeaderInterface> = props => {
  return (
    <div className="header-section d-flex py-3 align-items-center justify-content-between">
      <img src={HeaderLogo} className="header-logo" />
      <div className="d-flex align-items-center text-white">
        <p className="user-name mb-0 fw-bold fs-12">
          {props.t('header.welcome', { userName: props.userName })}
        </p>
        <img src={HelpIcon} className="help-icon" alt="" />
        <i
          className="icon-size las la-sign-out-alt px-2"
          onClick={props.handleLogout}
        ></i>
      </div>
    </div>
  )
}

export default Header
