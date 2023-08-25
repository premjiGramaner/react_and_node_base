import React, { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { IDefaultPageProps, IReducerState } from '@Utils/interface'
import { URLS } from '@Utils/constants'
import { IS_USER_AUTHENTICATED } from '@Utils/storage'

import {
  fetchDashboard,
  fetchEdgeDetails,
  termsAndServices,
} from '@Reducers/index'

import Header from '@Components/Header/Header'
import DashboardCard from '@Components/DashboardCard/DashboardCard'
import DropDown from '@Components/DropDown/DropDown'
import SearchBox from '@Components/SearchBox/SearchBox'
import Navigation from '@Components/Navigation/Navigation'
import Pagination from '@Components/Pagination/Pagination'
import Toast from '@Components/Toast/Toast'
import TermsAndServices from '@Components/TermsAndServices/TermsAndServices'

const DashboardComponent: React.FC<IDefaultPageProps> = props => {
  const { isUserTermAgreed, detailedUserId } = useSelector(
    (state: IReducerState) => state.loginReducer
  )
  const projectDetails = useSelector(
    (state: IReducerState) => state.dashboardReducer.dashboardData
  )

  const EdgeDetails = useSelector(
    (state: IReducerState) => state.dashboardReducer.EdgeDetails
  )

  const isDashboardPending = useSelector(
    (state: IReducerState) => state.dashboardReducer.dashboardPending
  )
  const statusResult = useSelector(
    (state: IReducerState) => state.dashboardReducer.statusResult
  )
  const logoutResult = useSelector(
    (state: IReducerState) => state.loginReducer.statusResult
  )

  const agreedTermsAndServiceResult = useSelector(
    (state: IReducerState) => state.dashboardReducer.agreedTermsAndService
  )
  const [searchInput, setSearchInput] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [paginationSize, setPaginationSize] = useState<number>(10)
  const [agree, setAgree] = useState<boolean>(false)
  const pageSize = Number.isNaN(paginationSize) ? 10 : paginationSize
  const handleAgree = () => {
    setAgree(true)
    const termsServicePayload = {
      userID: detailedUserId,
      agreeStatus: true,
    }
    props.dispatch(termsAndServices(termsServicePayload))
  }

  useEffect(() => {
    props.dispatch(fetchDashboard())
    props.dispatch(fetchEdgeDetails())
  }, [props])

  useEffect(() => {
    if (!isUserTermAgreed && !agreedTermsAndServiceResult && agree) {
      toast.error('Failed to update Terms and service, please reach out to SysAdmin', {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [agreedTermsAndServiceResult, agree, isUserTermAgreed])

  const combinedData = []
  projectDetails?.data?.data?.forEach(data => {
    const projectStatus = EdgeDetails?.list?.filter(d => d.id === data.id)[0]
    const result = {
      title: data.name,
      projectStatus: projectStatus?.status,
      edgeViewStatus: !!data?.edgeviewPolicy?.edgeviewPolicy?.edgeviewAllow,
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
  }, [currentPage, dashboardData, pageSize])

  if (!Boolean(IS_USER_AUTHENTICATED()) && window.location.pathname !== URLS.LOGIN) {
    window.location.href = URLS.LOGIN;
    return null;
  }

  return (
    <div className="dashboard-page-main-container">
      {!agreedTermsAndServiceResult && (
        <TermsAndServices
          {...props}
          modal={!isUserTermAgreed}
          handleAgree={handleAgree}
          agree={agree}
        />
      )}
      <Header {...props} />
      <Navigation {...props}>
        <div className="d-flex  justify-content-between align-items-center searchContainer">
          <SearchBox
            {...props}
            icon="fa fa-search"
            handlechange={e => setSearchInput(e.target.value)}
          />
        </div>
        <DropDown {...props} description={props.t('dashboard.description')} />
        <div className="DashboardCardContainer min-scroll-height">
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
                paginationSize={size => setPaginationSize(size)}
                onPageChange={page => setCurrentPage(page)}
              />
            </>
          ) : (
            <div className="d-flex justify-content-center no-records-found mt-5">
              No Records Found
            </div>
          )}
        </div>
      </Navigation>
      {(statusResult || logoutResult) && <Toast {...props} />}
      <ToastContainer />
      <div className="copy-right">
        Copyright © ZEDEDA, 2023 All Rights Reserved
      </div>
    </div>
  )
}

export default DashboardComponent
