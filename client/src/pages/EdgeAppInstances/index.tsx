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
      key: 'ip_address',
      name: 'IP Address',
      isSort: true,
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
      key: 'app_port',
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
        )} - selected Edge App '${data.name}' on project '${
          edgeNodeData?.edgeNodeInfo?.title
        }'`,
      })
    )
  }

  const networkDataList =
    edgeAppData?.networkList?.data?.data?.ipInfo.length > 0 &&
    edgeAppData.networkList?.data?.data?.ipInfo?.map((ip, i) => {
      const getName = edgeAppData?.networkList?.data?.data?.ipInfo?.filter(
        e => e?.up == true
      )[i]?.ifName

      const getInterface =
        edgeAppData?.networkList?.data?.data?.interfaces?.filter(
          name => name?.intfname === getName
        )[i]?.acls

      const getHostPort = getInterface?.map(host =>
        host?.matches.find(t => t?.type === 'host')
      )[1]?.value

      const getAppPort = getInterface?.map(port =>
        port?.matches.find(port => port?.type === 'lport')
      )[2]?.value

      const getProtocol = getInterface?.map(port =>
        port?.matches.find(t => t?.type === 'protocol')
      )[2]?.value

      return {
        ip_address: ip.ipAddrs[0],
        host_port: getHostPort,
        app_port: getAppPort,
        protocol: getProtocol,
      }
    })

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
        }&appName=${edgeAppData?.edgeNodeInfo?.title}&projectName=${
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
        }&appName=${edgeAppData?.edgeNodeInfo?.title}&projectName=${
          edgeNodeData?.edgeNodeInfo?.title
        }`
      )
    )
  }
  const onFirst = () => {
    setSelectedPage(1)
    props.dispatch(
      fetchEdgeNodeApp(
        `next.pageSize=${handlePageCount}&next.pageNum=${1}&appName=${
          edgeAppData?.edgeNodeInfo?.title
        }&projectName=${edgeNodeData?.edgeNodeInfo?.title}`
      )
    )
  }
  const onLast = () => {
    setSelectedPage(paginationRange.length)
    props.dispatch(
      fetchEdgeNodeApp(
        `next.pageSize=${handlePageCount}&next.pageNum=${paginationRange.length}&appName=${edgeAppData?.edgeNodeInfo?.title}&projectName=${edgeNodeData?.edgeNodeInfo?.title}`
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
                        `next.pageSize=${handlePageCount}&next.pageNum=${pageNumber}&appName=${edgeAppData?.edgeNodeInfo?.title}&projectName=${edgeNodeData?.edgeNodeInfo?.title}`
                      )
                    )
                  }}
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
            value={handlePageCount}
            onChange={event => {
              setTimeout(() => {
                setHandlePageCount(parseInt(event.target.value))
              }, 2000)
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
              onClick={() => props.navigate(URLS.EDGENODE)}
              alt=""
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
                  <div className="application-table">
                    <Table
                      {...props}
                      className="app-instance-table"
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
                        rowContent={networkDataList || []}
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
