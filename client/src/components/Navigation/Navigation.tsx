import React from 'react'
import { IDefaultPageProps } from '@Interface/PagesInterface'

const Navigation: React.FC<IDefaultPageProps> = props => {
  return (
    <div className="navigation-container d-flex">
      <div className="navigation-txt">{props.t('navigation.home')}</div>
      <div className="navigation-txt selectedLink px-4">
        {props.t('navigation.userEvent')}
      </div>
    </div>
  )
}

export default Navigation
