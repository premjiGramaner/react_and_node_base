import React, { useEffect, useState } from 'react'

import { IS_USER_AUTHENTICATED } from '@Utils/storage'
import { IHeaderInterface } from '@Utils/interface/ComponentInterface/HeaderInterface'
import { IDefaultPageProps } from '@Interface/PagesInterface'
import { userLogout } from '@Reducers/loginReducer'
import { URLS } from '@Utils/constants'

import { HelpIcon, HeaderLogo } from '@Assets/images'

const Header: React.FC<IDefaultPageProps & IHeaderInterface> = props => {
  const handleLogout = () => {
    props.dispatch(userLogout())

    props.navigate(URLS.DEFAULT)
  }

  const [userName, setUserName] = useState<string>('')

  useEffect(() => {
    setUserName(sessionStorage.getItem('userName'))
  }, [])

  return (
    <div className="header-section d-flex py-3 align-items-center justify-content-between">
      <img src={HeaderLogo} className="header-logo" />
      <div className="d-flex align-items-center text-white">
        <p className="user-name mb-0 fw-bold fs-12">
          {props.t('header.welcome', { userName: userName })}
        </p>
        <img src={HelpIcon} className="help-icon" alt="" />
        <i
          className="icon-size las la-sign-out-alt px-2"
          onClick={handleLogout}
        ></i>
      </div>
    </div>
  )
}

export default Header
