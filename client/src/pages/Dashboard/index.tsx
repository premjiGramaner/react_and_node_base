import React, { useEffect, useState, useMemo } from 'react'
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
import Pagination from '@Components/Pagination/Pagination'

const DashboardComponent: React.FC<IDefaultPageProps> = props => {
  const projectDetails = useSelector(
    (state: IReducerState) => state.dashboardReducer.dashboardData
  )

  const EdgeDetails = useSelector(
    (state: IReducerState) => state.dashboardReducer.EdgeDetails
  )

  const isDashboardPending = useSelector(
    (state: IReducerState) => state.dashboardReducer.dashboardPending
  )
  const [searchInput, setSearchInput] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const pageSize = 10

  useEffect(() => {
    if (!IS_USER_AUTHENTICATED()) {
      props.navigate(URLS.LOGIN)
    }

    props.dispatch(fetchDashboard())
    props.dispatch(fetchEdgeDetails())
    dashboarDetails
  }, [])

  const combinedData = []
  const dashboarDetails = projectDetails?.data?.data?.forEach(data => {
    const projectStatus = EdgeDetails?.list?.filter(d => d.id === data.id)[0]

    const result = {
      title: data.name,
      projectStatus: projectStatus?.status,
      edgeViewStatus: data?.edgeviewPolicy?.edgeviewPolicy?.edgeviewAllow,
      edgeNodes: data.edgeNodeCount,
      edgeAppInstance: data.edgeAppCount,
      info: data.description,
    }
    combinedData.push(result)
  })

  const filteredData = combinedData.filter(item => {
    return Object.values(item)
      .join('')
      .toLowerCase()
      .includes(searchInput.toLowerCase())
  })

  const countEdgeEnable = filteredData
    .filter(d => d.edgeNodes > 0 && d.edgeViewStatus == true)
    .sort((a, b) => a.title.localeCompare(b.title))

  const countEdgeDisable = filteredData
    .filter(d => d.edgeNodes > 0 && d.edgeViewStatus == false)
    .sort((a, b) => a.title.localeCompare(b.title))

  const countDisable = filteredData
    .filter(d => d.edgeNodes === 0)
    .sort((a, b) => a.title.localeCompare(b.title))

  const dashboardData = [
    ...countEdgeEnable,
    ...countEdgeDisable,
    ...countDisable,
  ]

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize
    const lastPageIndex = firstPageIndex + pageSize
    return dashboardData?.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, dashboardData])

  return (
    <div className="dashboard-page-main-container">
      <Header {...props} />
      <Navigation {...props}>
        <div className="d-flex justify-content-between align-items-center searchContainer">
          <SearchBox
            {...props}
            icon="fa fa-search"
            handleChange={e => setSearchInput(e.target.value)}
          />
        </div>
        <DropDown {...props} description={props.t('dashboard.description')} />
        <div className="DashboardCardContainer">
          {isDashboardPending ? (
            <div className="d-flex justify-content-center mt-5">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : dashboardData.length > 0 ? (
            <>
              <DashboardCard {...props} dashboardData={currentData} />
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={dashboardData.length}
                pageSize={pageSize}
                onPageChange={page => setCurrentPage(page)}
                paginationValue={data => data}
              />
            </>
          ) : (
            <div className="d-flex justify-content-center no-records-found mt-5">
              No Records Found
            </div>
          )}
        </div>
      </Navigation>
    </div>
  )
}

export default DashboardComponent
