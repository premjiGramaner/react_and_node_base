import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

import {
  fetchEdgeNode,
  downloadScript,
  sessionStatus,
  fetchEdgeViewStatus,
} from '@Reducers/index'
import {
  fetchEdgeNodeInfo,
  fetchEdgeNodeApp,
} from '@Reducers/edgeNodeAppInstanceReducer'

import { IDefaultPageProps, IReducerState } from '@Utils/interface'
import { IEdgeNodePageState } from '@Utils/interface/PagesInterface/EdgeNodePageInterface'
import { URLS } from '@Utils/constants'
import { fetchUserEvents } from '@Reducers/userLogEventReducer'

import Header from '@Components/Header/Header'
import DropDown from '@Components/DropDown/DropDown'
import SearchBox from '@Components/SearchBox/SearchBox'
import Navigation from '@Components/Navigation/Navigation'
import Table from '@Components/Table/Table'
import Modal from '@Components/Modal/Modal'

import {
  LeftArrowIcon,
  LeftArrowFirstIcon,
  RightArrowIcon,
  RightLastArrowIcon,
  CloseIcon,
} from '@Assets/images'

const EdgeNodeComponent: React.FC<IDefaultPageProps> = props => {
  const edgeNodeData = useSelector(
    (state: IReducerState) => state.edgeNodeReducer
  )

  const [edgeNodeList, setEdgeNodeList] = useState<IEdgeNodePageState>()
  const [sessionDetails, setSessionDetails] = useState<any>()
  const [edgeViewSessionStatus, setEdgeViewSessionStatus] = useState<string>('')
  const [sessionPending, setSessionPending] = useState<boolean>(false)
  const [statusUpdate, setStatusUpdate] = useState<boolean>(false)
  const [order, setOrder] = useState<string>('ASC')
  const [handlePageCount, setHandlePageCount] = useState<number>(10)
  const [selectedPage, setSelectedPage] = useState<number>(1)
  const [edgeNodeTableData, setEdgeNodeTableData] = useState<any>()

  useEffect(() => {
    setEdgeNodeList(edgeNodeData)
    setSessionPending(edgeNodeData?.sessionPending)
    setEdgeNodeTableData(edgeNodeData?.deviceList?.list)
  }, [edgeNodeData])

  useEffect(() => {
    setEdgeViewSessionStatus(edgeNodeData?.edgeSessionStatus)
  }, [edgeNodeData?.edgeSessionStatus])

  const tableHeader = [
    {
      key: 'runState',
      name: 'Status',
      status: true,
    },
    {
      key: 'eveImageName',
      name: 'EVE Image Version',
    },
    {
      key: 'location',
      name: 'Location',
    },
    {
      key: 'status',
      name: 'Edge View Sessions',
      cell: data => {
        setSessionDetails(data),
          props.dispatch(fetchEdgeViewStatus(data.id)),
          setStatusUpdate(false)
      },
    },
  ]

  const handleDownloadScript = () => {
    props.dispatch(downloadScript(sessionDetails?.id))
    props.dispatch(
      fetchUserEvents({
        edgeNode: sessionDetails.name,
        name: moment().format('LLL'),
        severity: 'INFO',
        project: edgeNodeData?.edgeNodeInfo?.title,
        description: `User ${sessionStorage.getItem('userName')} - EdgeNode '${
          sessionDetails.name
        }' script download successfully on project  '${
          edgeNodeData?.edgeNodeInfo?.title
        }'`,
      })
    )
  }

  const handleDeactiveSession = () => {
    props.dispatch(sessionStatus(`${sessionDetails?.id}/disable`))
    setTimeout(() => {
      if (!sessionPending) {
        props.dispatch(fetchEdgeViewStatus(sessionDetails?.id))
      }
    }, 1000)
    props.dispatch(
      fetchUserEvents({
        edgeNode: sessionDetails.name,
        name: moment().format('LLL'),
        severity: 'INFO',
        project: edgeNodeData?.edgeNodeInfo?.title,
        description: `User ${sessionStorage.getItem('userName')} - EdgeNode '${
          sessionDetails.name
        }' is deactivated on project '${edgeNodeData?.edgeNodeInfo?.title}'`,
      })
    )
    setStatusUpdate(true)
  }

  const handleActivateSession = () => {
    props.dispatch(sessionStatus(`${sessionDetails?.id}/enable`))
    setTimeout(() => {
      if (!sessionPending) {
        props.dispatch(fetchEdgeViewStatus(sessionDetails?.id))
      }
    }, 1000)
    props.dispatch(
      fetchUserEvents({
        edgeNode: sessionDetails.name,
        name: moment().format('LLL'),
        severity: 'INFO',
        project: edgeNodeData?.edgeNodeInfo?.title,
        description: `User ${sessionStorage.getItem('userName')} - EdgeNode '${
          sessionDetails.name
        }' is activated on project '${edgeNodeData?.edgeNodeInfo?.title}'`,
      })
    )
    setStatusUpdate(true)
  }

  const handleNavClick = data => {
    props.dispatch(
      fetchEdgeNodeInfo({
        title: data.name,
      })
    )
    props.dispatch(
      fetchEdgeNodeApp(
        `next.pageSize=10&next.pageNum=1&appName=${data.name}&projectName=${edgeNodeData?.edgeNodeInfo?.title}`
      )
    )
    props.dispatch(
      fetchUserEvents({
        edgeNode: data.name,
        name: moment().format('LLL'),
        severity: 'INFO',
        project: edgeNodeData?.edgeNodeInfo?.title,
        description: `User ${sessionStorage.getItem('userName')} - EdgeNode '${
          data.name
        }' is selected`,
      })
    )
    props.navigate(URLS.EDGEAPPINSTANCES)
  }

  const handleRefreshClick = () => {
    props.dispatch(fetchEdgeViewStatus(sessionDetails?.id))
  }

  const popupClose = () => {
    statusUpdate &&
      props.dispatch(
        fetchEdgeNode(
          `next.pageSize=10&next.pageNum=1&projectName=${edgeNodeData?.edgeNodeInfo?.title}`
        )
      )
  }

  const handleSearch = e => {
    const searchData = edgeNodeData?.deviceList?.list?.filter(item => {
      return Object.values(item.name)
        .join('')
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    })
    setEdgeNodeTableData(searchData)
  }
  const sortTable = () => {
    if (order === 'ASC') {
      const sorted = [...edgeNodeTableData].sort((a, b) =>
        a?.name?.toLowerCase() > b?.name?.toLowerCase() ? 1 : -1
      )
      setEdgeNodeTableData(sorted)
      setOrder('DSC')
    }
    if (order === 'DSC') {
      const sorted = [...edgeNodeTableData].sort((a, b) =>
        a?.name?.toLowerCase() < b?.name?.toLowerCase() ? 1 : -1
      )
      setEdgeNodeTableData(sorted)
      setOrder('ASC')
    }
  }

  const paginationRange = Array.from(
    { length: edgeNodeData?.deviceList?.next?.totalPages },
    (_, i) => i + 1
  )

  const onNext = () => {
    setSelectedPage(selectedPage + 1)
    props.dispatch(
      fetchEdgeNode(
        `next.pageSize=${handlePageCount}&next.pageNum=${
          selectedPage + 1
        }&projectName=${edgeNodeData?.edgeNodeInfo?.title}`
      )
    )
  }

  const onPrevious = () => {
    setSelectedPage(selectedPage - 1)
    props.dispatch(
      fetchEdgeNode(
        `next.pageSize=${handlePageCount}&next.pageNum=${
          selectedPage - 1
        }&projectName=${edgeNodeData?.edgeNodeInfo?.title}`
      )
    )
  }
  const onFirst = () => {
    setSelectedPage(1)
    props.dispatch(
      fetchEdgeNode(
        `next.pageSize=${handlePageCount}&next.pageNum=${1}&projectName=${
          edgeNodeData?.edgeNodeInfo?.title
        }`
      )
    )
  }
  const onLast = () => {
    setSelectedPage(paginationRange.length)
    props.dispatch(
      fetchEdgeNode(
        `next.pageSize=${handlePageCount}&next.pageNum=${paginationRange.length}&projectName=${edgeNodeData?.edgeNodeInfo?.title}`
      )
    )
  }

  const Pagination = () => {
    return (
      <>
        <div className="pagination-wrapper d-flex justify-content-end align-items-center pt-3">
          <ul className={`pagination-container`}>
            <li
              className={`pagination-item ${selectedPage === 1 && 'pe-none'}`}
              onClick={onFirst}
              aria-hidden="true"
            >
              <img
                src={LeftArrowFirstIcon}
                className="pagination-nav-arrow"
                alt=""
              />
            </li>
            <li
              className={`pagination-item ${selectedPage === 1 && 'pe-none'}`}
              onClick={onPrevious}
              aria-hidden="true"
            >
              <img
                src={LeftArrowIcon}
                className="pagination-nav-arrow"
                alt=""
              />
            </li>
            {paginationRange.map((pageNumber: number, index) => {
              return (
                <li
                  className={`pagination-number ${
                    pageNumber === selectedPage && 'selected'
                  }`}
                  key={index}
                  onClick={() => {
                    setSelectedPage(pageNumber)
                    props.dispatch(
                      fetchEdgeNode(
                        `next.pageSize=${handlePageCount}&next.pageNum=${pageNumber}&projectName=${edgeNodeData?.edgeNodeInfo?.title}`
                      )
                    )
                  }}
                  aria-hidden="true"
                >
                  {pageNumber}
                </li>
              )
            })}
            <li
              onClick={onNext}
              className={`${
                selectedPage === paginationRange.length && 'pe-none'
              }`}
              aria-hidden="true"
            >
              <img
                src={RightArrowIcon}
                className="pagination-nav-arrow"
                alt=""
              />
            </li>
            <li
              className={`pagination-item ${
                selectedPage === paginationRange.length && 'pe-none'
              }`}
              onClick={onLast}
              aria-hidden="true"
            >
              <img
                src={RightLastArrowIcon}
                className="pagination-nav-arrow"
                alt=""
              />
            </li>
          </ul>
          <input
            type="number"
            className="page-count mx-3"
            onBlur={event => {
              if (event.target.value !== '') {
                props.dispatch(
                  fetchEdgeNode(
                    `next.pageSize=${parseInt(
                      event.target.value
                    )}&next.pageNum=1&projectName=${
                      edgeNodeData?.edgeNodeInfo?.title
                    }`
                  )
                )
                setHandlePageCount(parseInt(event.target.value))
                setSelectedPage(1)
              }
            }}
          />
          <p className="pagination-total-count">{`${selectedPage}-${handlePageCount} of ${edgeNodeData?.deviceList?.totalCount}`}</p>
        </div>
      </>
    )
  }

  return (
    <div className="edge-nodes-container">
      <Header {...props} />
      <Navigation {...props}>
        <div className="d-flex justify-content-between align-items-center searchContainer">
          <div className="endpoint">
            {edgeNodeData?.edgeNodeInfo?.title} -
            <span className="edge-node">{props.t('dashboard.edgeNodes')}</span>
            <span className="device-count">
              ({edgeNodeData?.edgeNodeInfo?.edgeNodesCount})
            </span>
            <img
              src={CloseIcon}
              className="close-icon"
              alt=""
              onClick={() => props.navigate(URLS.DASHBOARD)}
              aria-hidden="true"
            />
          </div>
          <SearchBox
            {...props}
            icon="fa fa-search"
            handleChange={e => handleSearch(e)}
          />
        </div>
        <DropDown {...props} />
        <div className="navigation-panel d-flex py-4">
          <div className="d-flex row w-100 nav-wrapper">
            {edgeNodeList?.deviceList?.list?.length > 0 && (
              <>
                {edgeNodeData.edgeNodePending ? (
                  <div className="d-flex justify-content-center mt-5">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <Table
                      {...props}
                      className="edgeNode-table"
                      column={tableHeader}
                      rowContent={edgeNodeTableData || []}
                      navData={data => handleNavClick(data)}
                      isDisplayNavPanel={true}
                      navHeaderName={props.t('edge-nodes.name')}
                      sortHandle={() => sortTable()}
                    />
                    <Pagination />
                  </>
                )}
              </>
            )}
          </div>

          <Modal
            {...props}
            headerName={sessionDetails?.name}
            status={edgeViewSessionStatus}
            statusColor={sessionDetails?.sessionActive}
            handleDownload={handleDownloadScript}
            deActivateSession={handleDeactiveSession}
            handleRefresh={handleRefreshClick}
            handleActivateSession={handleActivateSession}
            reactiveSession={handleActivateSession}
            popupClose={popupClose}
          />
        </div>
      </Navigation>
    </div>
  )
}

export default EdgeNodeComponent
