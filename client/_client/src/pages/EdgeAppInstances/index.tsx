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
import Toast from '@Components/Toast/Toast'

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
  const logoutResult = useSelector(
    (state: IReducerState) => state.loginReducer.statusResult
  )

  const [displayNetworkTable, setDisplayNetworkTable] = useState<boolean>(false)
  const [instanceName, setInstanceName] = useState<string>('')
  const [order, setOrder] = useState<string>('ASC')
  const [handlePageCount, setHandlePageCount] = useState<number>(10)
  const [selectedPage, setSelectedPage] = useState<number>(1)
  const [instanceData, setInstanceData] = useState<any>()
  const [networkDataList, setNetworkDataList] = useState<any>([])

  useEffect(() => {
    setNetworkDataList([])
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
      key: 'ipAddrs',
      name: 'IP Address',
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
      key: 'lport',
      name: 'Device Port',
    },
    {
      key: 'appPort',
      name: 'Application Port',
    },
  ]

  const handleNavClick = data => {
    if (data.isTagInfo) {
      setNetworkDataList([data])
    } else {
      props.dispatch(fetchNetworkData(data.id))
    }

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
        )} - selected Edge App '${data.name}' 
        of Edge Node '${edgeAppData?.edgeNodeInfo.title}' on project '${
          edgeNodeData?.edgeNodeInfo?.title
        }'`,
      })
    )
    setDisplayNetworkTable(true)
  }

  const getNetworkData = () => {
    const interfaces = edgeAppData?.networkList?.interfaces
    const tableListFormat = []

    const getTableData = data => {
      const tableData = []
      if (data.kind === 'NETWORK_INSTANCE_KIND_SWITCH') {
        const tableItem = { intfname: '', ipAddrs: '', appPort: '' }
        tableItem.intfname = data?.intfname
        tableItem.ipAddrs = data?.ipAddrs
        tableData.push(tableItem)
      } else {
        data?.aclsMatches?.forEach(matchItem => {
          const tableItem = { intfname: '', ipAddrs: '', appPort: '' }
          if (matchItem?.actions?.length > 0) {
            matchItem?.matches?.forEach(x => {
              tableItem.intfname = data?.intfname
              tableItem[x.type] = x?.value
              tableItem.ipAddrs = data?.ipAddrs
            })
            matchItem?.actions?.forEach(x => {
              tableItem.appPort = x?.mapparams?.port
            })
          }
          Object.keys(tableItem).length > 3 && tableData.push(tableItem)
        })
      }

      return tableData
    }

    interfaces?.forEach((x, i) => {
      tableListFormat?.push({
        intfname: x?.intfname,
        ipAddrs:
          x?.['network-kind']?.kind === 'NETWORK_INSTANCE_KIND_SWITCH'
            ? x?.ipInfo[i].ipAddrs[0]
            : x?.ipInfo && x?.ipInfo?.ipAddrs?.[0],
        kind: x?.['network-kind']?.kind,
        aclsMatches: x?.acls.map(x => x),
      })
    })

    const finalData = tableListFormat
      .map(x => {
        return getTableData(x)
      })
      .flat()
    return finalData
  }

  useEffect(() => {
    setNetworkDataList(getNetworkData())
  }, [edgeAppData.networkList])

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

  const paginationRange = Array?.from(
    { length: edgeAppData?.edgeNodeDataList?.next?.totalPages },
    (_, i) => i + 1
  )

  const onNext = () => {
    setSelectedPage(selectedPage + 1)

    props.dispatch(
      fetchEdgeNodeApp(
        `next.pageSize=${handlePageCount}&next.pageNum=${selectedPage + 1}
        &deviceName=${edgeAppData?.edgeNodeInfo?.title}&projectName=${
          edgeNodeData?.edgeNodeInfo?.title
        }`
      )
    )

    setDisplayNetworkTable(false)
  }

  const onPrevious = () => {
    setSelectedPage(selectedPage - 1)

    props.dispatch(
      fetchEdgeNodeApp(
        `next.pageSize=${handlePageCount}&next.pageNum=${selectedPage - 1}
        &deviceName=${edgeAppData?.edgeNodeInfo?.title}&projectName=${
          edgeNodeData?.edgeNodeInfo?.title
        }`
      )
    )

    setDisplayNetworkTable(false)
  }

  const onFirst = () => {
    setSelectedPage(1)
    props.dispatch(
      fetchEdgeNodeApp(
        `next.pageSize=${handlePageCount}&next.pageNum=${1}&deviceName=${
          edgeAppData?.edgeNodeInfo?.title
        }
        &projectName=${edgeNodeData?.edgeNodeInfo?.title}`
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

    setDisplayNetworkTable(false)
  }

  const Pagination = () => {
    return (
      <div className="pt-2">
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
                    setDisplayNetworkTable(false)
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
                    }
                    &projectName=${edgeNodeData?.edgeNodeInfo?.title}`
                  )
                )
                setHandlePageCount(parseInt(event.target.value))
                setSelectedPage(1)
              }
            }}
          />
          <p className="pagination-total-count">{`${selectedPage}-${handlePageCount} of ${edgeAppData?.edgeNodeDataList?.totalCount}`}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="edge-nodes-container">
      <Header {...props} />
      <Navigation {...props}>
        <div className="d-flex justify-content-between align-items-center searchContainer">
          <div className="endpoint">
            {edgeNodeData?.edgeNodeInfo?.title} -
            <span className="edge-node"> {props.t('dashboard.edgeNodes')}</span>
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
                props.navigate(URLS.EDGENODE), setNetworkDataList([])
              }}
              alt=""
              aria-hidden="true"
            />
          </div>
          <SearchBox
            {...props}
            icon="fa fa-search"
            handlechange={e => handleSearch(e.target.value)}
          />
        </div>
        <DropDown {...props} description={props.t('edgeApp.description')} />

        <div className="navigation-panel d-flex py-4">
          <div className="d-flex row w-100 nav-wrapper">
            <>
              <div className="d-flex nav-content">
                {edgeAppData?.edgeAppPending ? (
                  <div className="network-spinner d-flex justify-content-center mt-5">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    {instanceData?.length > 0 ? (
                      <>
                        <div className="application-table">
                          <Table
                            {...props}
                            className="app-instance-table"
                            column={tableHeader}
                            rowContent={instanceData || []}
                            navData={data => handleNavClick(data)}
                            isDisplayNavPanel={true}
                            navHeaderName={props.t('edge-nodes.name')}
                            sortHandle={() => sortTable()}
                          />
                          <Pagination />
                        </div>
                      </>
                    ) : (
                      <div className="d-flex justify-content-center no-records-found w-100 mt-3">
                        No Records Found
                      </div>
                    )}
                  </>
                )}

                {edgeAppData?.networkDataPending ? (
                  <div className="network-spinner d-flex justify-content-center mt-5">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  displayNetworkTable && (
                    <div className={`d-flex flex-column app-network-table`}>
                      <p className="fw-bold network-title">{instanceName}</p>
                      <Table
                        {...props}
                        className="network-table"
                        column={networkTableHeader}
                        rowContent={networkDataList || []}
                        isDisplayNavPanel={false}
                        isPagination={true}
                      />
                    </div>
                  )
                )}
              </div>
            </>
          </div>
        </div>
      </Navigation>
      {(edgeAppData?.statusResult || logoutResult) && <Toast {...props} />}
    </div>
  )
}

export default EdgeAppInstancesComponent