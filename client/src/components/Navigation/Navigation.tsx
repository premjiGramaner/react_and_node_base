import React from 'react'
import { IDefaultPageProps } from '@Interface/PagesInterface'
import UserEvent from '@Components/UserEvent/UserEvent'
import { URLS } from '@Utils/constants'

const Navigation: React.FC<IDefaultPageProps> = props => {
  return (
    <div className="navigation-container">
      <ul
        className="navigation-links nav nav-pills"
        id="pills-tab"
        role="tablist"
      >
        <li className="nav-item">
          <a
            className="nav-link active"
            id="pills-home-tab"
            data-toggle="pill"
            href="#pills-home"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
            onClick={() => props.navigate(URLS.DASHBOARD)}
          >
            {props.t('navigation.home')}
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="pills-profile-tab"
            data-toggle="pill"
            href="#pills-profile"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
          >
            {props.t('navigation.userEvent')}
          </a>
        </li>
      </ul>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          {props.children}
        </div>
        <div
          className="tab-pane fade"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          <UserEvent {...props} />
        </div>
      </div>
    </div>
  )
}

export default Navigation
