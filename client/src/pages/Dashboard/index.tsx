import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { IDefaultPageProps, IReducerState } from '@Utils/interface'
import { URLS } from '@Utils/constants'
import { IS_USER_AUTHENTICATED } from '@Utils/storage'

import { fetchDashboard, fetchEdgeDetails } from '@Reducers/index'

import Header from '@Components/Header/Header'
import DashboardCard from '@Components/DashboardCard/DashboardCard'
import DropDown from '@Components/DropDown/DropDown'
import SearchBox from '@Components/SearchBox/SearchBox'
import Navigation from '@Components/Navigation/Navigation'

const DashboardComponent: React.FC<IDefaultPageProps> = props => {
  const projectDetails = useSelector(
    (state: IReducerState) => state.dashboardReducer.dashboardData
  )

  const EdgeDetails = useSelector(
    (state: IReducerState) => state.dashboardReducer.EdgeDetails
  )

  useEffect(() => {
    if (!IS_USER_AUTHENTICATED()) {
      props.navigate(URLS.LOGIN)
    }

    props.dispatch(fetchDashboard())
    props.dispatch(fetchEdgeDetails())
  }, [])

  let dashboardData = []
  const dashboarDetails = projectDetails?.data?.data?.forEach((data, i) => {
    const projectStatus = EdgeDetails?.list?.filter(d => d.id === data.id)[0]

    const result = {
      title: data.title,
      projectStatus: projectStatus?.status,
      edgeViewStatus: data?.edgeviewPolicy?.edgeviewPolicy?.edgeviewAllow,
      edgeNodes: data.edgeNodeCount,
      edgeAppInstance: data.edgeAppCount,
      info: data.description,
    }
    dashboardData.push(result)
  })

  return (
    <div className="dashboard-page-main-container">
      <Header {...props} />
      <Navigation {...props}>
        <div className="d-flex justify-content-between align-items-center searchContainer">
          <div className="endpoint">{props.t('dashboard.endpoint')}</div>
          <SearchBox {...props} icon="fa fa-search" />
        </div>
        <DropDown {...props} />
        <div className="DashboardCardContainer">
          <DashboardCard {...props} dashboardData={dashboardData} />
        </div>
      </Navigation>
    </div>
  )
}

export default DashboardComponent
