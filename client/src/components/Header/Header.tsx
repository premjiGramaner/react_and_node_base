import React from 'react'
import { IHeaderInterface } from '@Utils/interface/ComponentInterface/HeaderInterface'
const Header: React.FC<IHeaderInterface> = props => {
  return (
    <div className="header-section d-flex py-3 align-items-center justify-content-between">
      <h4 className="mb-0 fw-bold text-white">RAA</h4>
      <div className="d-flex align-items-center text-white">
        <p className="mb-0 fw-bold fs-12">Welcome, {props.userName}</p>
        <i className="icon-size las la-user-circle px-2"></i>
        <i
          className="icon-size las la-sign-out-alt px-2"
          onClick={props.handleLogout}
        ></i>
      </div>
    </div>
  )
}

export default Header
