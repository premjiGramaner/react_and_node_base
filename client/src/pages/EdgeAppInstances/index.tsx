import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

import {
  fetchEdgeNodeApp,
  fetchNetworkData,
} from '@Reducers/edgeNodeAppInstanceReducer'
import { fetchUserEvents } from '@Reducers/userLogEventReducer'
import { IDefaultPageProps, IReducerState } from '@Utils/interface'
import { URLS } from '@Utils/constants'

import Header from '@Components/Header/Header'
import DropDown from '@Components/DropDown/DropDown'
import SearchBox from '@Components/SearchBox/SearchBox'
import Navigation from '@Components/Navigation/Navigation'
import Table from '@Components/Table/Table'

import {
  LeftArrowIcon,
  LeftArrowFirstIcon,
  RightArrowIcon,
  RightLastArrowIcon,
  CloseIcon,
} from '@Assets/images'

const EdgeAppInstancesComponent: React.FC<IDefaultPageProps> = props => {
  const edgeAppData = useSelector(
    (state: IReducerState) => state.edgeNodeAppInstanceReducer
  )
  const edgeNodeData = useSelector(
    (state: IReducerState) => state.edgeNodeReducer
  )

  const [instanceName, setInstanceName] = useState<string>('')
  const [order, setOrder] = useState<string>('ASC')
  const [handlePageCount, setHandlePageCount] = useState<number>(10)
  const [selectedPage, setSelectedPage] = useState<number>(1)
  const [instanceData, setInstanceData] = useState<any>()

  useEffect(() => {
    setInstanceData(edgeAppData?.edgeNodeDataList?.list)
  }, [edgeAppData])

  const tableHeader = [
    {
      key: 'runState',
      name: 'Status',
      status: true,
    },
    {
      key: 'appType',
      name: 'Type',
    },
    {
      key: 'appName',
      name: 'Edge App',
    },
  ]

  const networkTableHeader = [
    {
      key: 'ipAddres',
      name: 'IP Address',
      isSort: true,
    },
    {
      key: 'intfname',
      name: 'Environment Name',
    },
    {
      key: 'protocol',
      name: 'Protocol',
    },
    {
      key: 'host_port',
      name: 'Host Port',
    },
    {
      key: 'lport',
      name: 'Application Port',
    },
  ]

  const handleNavClick = data => {
    props.dispatch(fetchNetworkData(data.id))
    setInstanceName(data.name)
    props.dispatch(
      fetchUserEvents({
        edgeNode: edgeAppData?.edgeNodeInfo?.title,
        name: moment().format('LLL'),
        severity: 'INFO',
        project: edgeNodeData?.edgeNodeInfo?.title,
        appInstance: data.name,
        description: `User ${sessionStorage.getItem(
          'userName'
        )} - selected Edge App '${data.name}' of Edge Node '${
          edgeAppData?.edgeNodeInfo.title
        }' on project '${edgeNodeData?.edgeNodeInfo?.title}'`,
      })
    )
  }

  const matchesData = []

  const networkDataList = edgeAppData?.networkList?.interfaces?.map(
    (d, index) => {
      if (d?.acls?.length > 0) {
        matchesData.push(d.acls)
      }

      const finalData = matchesData[index].map(element => {
        if (element.matches.length) {
          const port = element.matches.find(
            t =>
              t?.type === 'lport' ||
              t?.type === 'protocol' ||
              t?.type === 'host'
          )

          if (port) {
            return {
              intfname: d?.intfname,
              ipAddres: d?.ipInfo?.ipAddrs[0],
              [port.type]: port.value,
            }
          }
        }
      })

      return finalData.filter(Boolean)
    }
  )

  const handleSearch = value => {
    const searchData = edgeAppData?.edgeNodeDataList?.list?.filter(item => {
      return Object.values(item.name)
        .join('')
        .toLowerCase()
        .includes(value.toLowerCase())
    })
    setInstanceData(searchData)
  }

  const sortTable = () => {
    if (order === 'ASC') {
      const sorted = [...instanceData].sort((a, b) =>
        a?.name?.toLowerCase() > b?.name?.toLowerCase() ? 1 : -1
      )
      setInstanceData(sorted)
      setOrder('DSC')
    }
    if (order === 'DSC') {
      const sorted = [...instanceData].sort((a, b) =>
        a?.name?.toLowerCase() < b?.name?.toLowerCase() ? 1 : -1
      )
      setInstanceData(sorted)
      setOrder('ASC')
    }
  }

  const paginationRange = Array.from(
    {
      length: edgeAppData?.edgeNodeDataList?.next?.totalPages,
    },
    (_, i) => i + 1
  )

  const onNext = () => {
    setSelectedPage(selectedPage + 1)
    props.dispatch(
      fetchEdgeNodeApp(
        `next.pageSize=${handlePageCount}&next.pageNum=${
          selectedPage + 1
        }&deviceName=${edgeAppData?.edgeNodeInfo?.title}&projectName=${
          edgeNodeData?.edgeNodeInfo?.title
        }`
      )
    )
  }

  const onPrevious = () => {
    setSelectedPage(selectedPage - 1)
    props.dispatch(
      fetchEdgeNodeApp(
        `next.pageSize=${handlePageCount}&next.pageNum=${
          selectedPage - 1
        }&deviceName=${edgeAppData?.edgeNodeInfo?.title}&projectName=${
          edgeNodeData?.edgeNodeInfo?.title
        }`
      )
    )
  }
  const onFirst = () => {
    setSelectedPage(1)
    props.dispatch(
      fetchEdgeNodeApp(
        `next.pageSize=${handlePageCount}&next.pageNum=${1}&deviceName=${
          edgeAppData?.edgeNodeInfo?.title
        }&projectName=${edgeNodeData?.edgeNodeInfo?.title}`
      )
    )
  }
  const onLast = () => {
    setSelectedPage(paginationRange.length)
    props.dispatch(
      fetchEdgeNodeApp(
        `next.pageSize=${handlePageCount}&next.pageNum=${paginationRange.length}&deviceName=${edgeAppData?.edgeNodeInfo?.title}&projectName=${edgeNodeData?.edgeNodeInfo?.title}`
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
                      fetchEdgeNodeApp(
                        `next.pageSize=${handlePageCount}&next.pageNum=${pageNumber}&deviceName=${edgeAppData?.edgeNodeInfo?.title}&projectName=${edgeNodeData?.edgeNodeInfo?.title}`
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
                  fetchEdgeNodeApp(
                    `next.pageSize=${parseInt(
                      event.target.value
                    )}&next.pageNum=1&deviceName=${
                      edgeAppData?.edgeNodeInfo?.title
                    }&projectName=${edgeNodeData?.edgeNodeInfo?.title}`
                  )
                )
                setHandlePageCount(parseInt(event.target.value))
                setSelectedPage(1)
              }
            }}
          />
          <p className="pagination-total-count">{`${selectedPage}-${handlePageCount} of ${edgeAppData?.edgeNodeDataList?.totalCount}`}</p>
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
              ({edgeNodeData?.edgeNodeInfo?.edgeNodesCount}) -
            </span>
            <span className="edge-node">{edgeAppData?.edgeNodeInfo.title}</span>
            <span className="device-count">
              ({edgeAppData?.edgeNodeDataList?.totalCount})
            </span>
            <img
              src={CloseIcon}
              className="close-icon"
              onClick={() => {
                props.navigate(URLS.EDGENODE),
                  props.dispatch(fetchNetworkData('123'))
              }}
              alt=""
              aria-hidden="true"
            />
          </div>
          <SearchBox
            {...props}
            icon="fa fa-search"
            handleChange={e => handleSearch(e.target.value)}
          />
        </div>
        <DropDown {...props} />

        <div className="navigation-panel d-flex py-4">
          <div className="d-flex row w-100 nav-wrapper">
            {edgeAppData?.edgeNodeDataList?.list?.length > 0 ? (
              <>
                <div className="d-flex nav-content">
                  {edgeAppData?.edgeAppPending ? (
                    <div className="network-spinner d-flex justify-content-center mt-5">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="application-table">
                      <Table
                        {...props}
                        className={`app-instance-table ${
                          networkDataList?.length && 'app-table'
                        }`}
                        column={tableHeader}
                        rowContent={instanceData || []}
                        pageSize={10}
                        navData={data => handleNavClick(data)}
                        isDisplayNavPanel={true}
                        navHeaderName={props.t('edge-nodes.name')}
                        sortHandle={() => sortTable()}
                      />
                      <Pagination />
                    </div>
                  )}

                  {edgeAppData?.networkDataPending ? (
                    <div className="network-spinner d-flex justify-content-center mt-5">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex flex-column app-network-table">
                      <p className="fw-bold network-title">{instanceName}</p>
                      <Table
                        {...props}
                        className="network-table"
                        column={networkTableHeader}
                        rowContent={networkDataList?.flat() || []}
                        pageSize={10}
                        isDisplayNavPanel={false}
                        isPagination={true}
                      />
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="d-flex justify-content-center no-records-found">
                No Records Found
              </div>
            )}
          </div>
        </div>
      </Navigation>
    </div>
  )
}

export default EdgeAppInstancesComponent
