import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { IDefaultPageProps, IReducerState } from '@Utils/interface'
import { URLS } from '@Utils/constants'
import { IS_USER_AUTHENTICATED, getToken } from '@Utils/storage'

import { fetchDashboard, fetchUsers } from '@Reducers/index'

import Header from '@Components/Header/Header'
import DashboardCard from '@Components/DashboardCard/DashboardCard'
import DropDown from '@Components/DropDown/DropDown'
import SearchBox from '@Components/SearchBox/SearchBox'
import Navigation from '@Components/Navigation/Navigation'

const DashboardComponent: React.FC<IDefaultPageProps> = props => {
  const { userName, token } = useSelector(
    (state: IReducerState) => state.loginReducer
  )
  const dashboardValue = useSelector(
    (state: IReducerState) => state.dashboardReducer.dashboardData
  )

  useEffect(() => {
    if (!IS_USER_AUTHENTICATED()) {
      props.navigate(URLS.LOGIN)
    }
    props.dispatch(fetchDashboard())
  }, [token])

  return (
    <div className="dashboard-page-main-container">
      <Header {...props} userName={userName} />
      <Navigation {...props} />
      <div className="d-flex justify-content-between align-items-center searchContainer">
        <div className="endpoint">{props.t('dashboard.endpoint')}</div>
        <SearchBox {...props} icon="fa fa-search" />
      </div>
      <DropDown {...props} />
      <div className="DashboardCardContainer">
        <DashboardCard {...props} dashboardData={dashboardValue?.data} />
      </div>
    </div>
  )
}

export default DashboardComponent
