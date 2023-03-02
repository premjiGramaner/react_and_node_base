import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { IDefaultPageProps, IReducerState } from '@Utils/interface'
import { URLS } from '@Utils/constants'
import { IS_USER_AUTHENTICATED, getToken } from '@Utils/storage'

import {
  fetchDashboard,
  fetchEdgeDetails,
  fetchProjectInfo,
} from '@Reducers/index'

import Header from '@Components/Header/Header'
import DashboardCard from '@Components/DashboardCard/DashboardCard'
import DropDown from '@Components/DropDown/DropDown'
import SearchBox from '@Components/SearchBox/SearchBox'
import Navigation from '@Components/Navigation/Navigation'

const DashboardComponent: React.FC<IDefaultPageProps> = props => {
  const { userName, token } = useSelector(
    (state: IReducerState) => state.loginReducer
  )
  const projectDetails = useSelector(
    (state: IReducerState) => state.dashboardReducer.dashboardData
  )

  const EdgeDetails = useSelector(
    (state: IReducerState) => state.dashboardReducer.EdgeDetails
  )

  let dashboardData = []
  const dashboarDetails = projectDetails?.data?.data?.forEach((data, i) => {
    const result = {
      title: data.title,
      edgeNodeStatus: EdgeDetails?.list[i]?.status,
      enabled: EdgeDetails?.list[i].status,
      projectType: EdgeDetails?.list[i].type,
      edgeNodes: data.edgeNodeCount,
      edgeAppInstance: data.edgeAppCount,
      info: data.description,
    }
    dashboardData.push(result)
  })

  useEffect(() => {
    if (!IS_USER_AUTHENTICATED()) {
      props.navigate(URLS.LOGIN)
    }

    props.dispatch(fetchDashboard())
    props.dispatch(fetchEdgeDetails())
  }, [])

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
          <DashboardCard
            {...props}
            dashboardData={dashboardData}
            projectInfo={data => {
              props.dispatch(fetchProjectInfo({ title: data.title }))
            }}
          />
        </div>
      </Navigation>
    </div>
  )
}

export default DashboardComponent
