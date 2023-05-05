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
import { URLS } from '@Utils/constants'
import { fetchUserEvents } from '@Reducers/userLogEventReducer'

import Header from '@Components/Header/Header'
import DropDown from '@Components/DropDown/DropDown'
import SearchBox from '@Components/SearchBox/SearchBox'
import Navigation from '@Components/Navigation/Navigation'
import Table from '@Components/Table/Table'
import Modal from '@Components/Modal/Modal'
import Toast from '@Components/Toast/Toast'

import { CloseIcon } from '@Assets/images'

const EdgeNodeComponent: React.FC<IDefaultPageProps> = props => {
  const edgeNodeData = useSelector(
    (state: IReducerState) => state.edgeNodeReducer
  )
  const logoutResult = useSelector(
    (state: IReducerState) => state.loginReducer.statusResult
  )

  const [sessionDetails, setSessionDetails] = useState<any>()
  const [edgeViewSessionStatus, setEdgeViewSessionStatus] = useState<string>('')
  const [sessionPending, setSessionPending] = useState<boolean>(false)
  const [statusUpdate, setStatusUpdate] = useState<boolean>(false)
  const [order, setOrder] = useState<string>('DSC')
  const [edgeNodeTableData, setEdgeNodeTableData] = useState<any>()
  const [edgeNodePending, setEdgeNodePending] = useState<boolean>(false)

  useEffect(() => {
    setSessionPending(edgeNodeData?.sessionPending)

    if (edgeNodeData?.deviceList?.list) {
      const sortedOnline = [...edgeNodeData?.deviceList?.list].filter(
        d => `${d?.runState}` === 'RUN_STATE_ONLINE'
      )
      const sortedSuspect = [...edgeNodeData?.deviceList?.list].filter(
        d => `${d.runState}` === 'RUN_STATE_SUSPECT'
      )
      const sortedProvisioned = [...edgeNodeData?.deviceList?.list].filter(
        d => `${d.runState}` === 'RUN_STATE_PROVISIONED'
      )
      const sortedOtherState = [...edgeNodeData?.deviceList?.list].filter(
        d =>
          `${d?.runState}` !== 'RUN_STATE_ONLINE' &&
          `${d?.runState}` !== 'RUN_STATE_SUSPECT' &&
          `${d?.runState}` !== 'RUN_STATE_PROVISIONED'
      )
      setEdgeNodeTableData([
        ...sortedOnline,
        ...sortedSuspect,
        ...sortedProvisioned,
        ...sortedOtherState,
      ])
    }
  }, [edgeNodeData])

  useEffect(() => {
    setEdgeNodePending(edgeNodeData?.edgeNodePending)
  }, [edgeNodeData?.edgeNodePending])

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
      key: 'shortVersion',
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
        `next.pageSize=10&next.pageNum=1&deviceName=${data.name}&projectName=${edgeNodeData?.edgeNodeInfo?.title}`
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
        fetchEdgeNode(`projectName=${edgeNodeData?.edgeNodeInfo?.title}`)
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

  return (
    <div className="edge-nodes-container">
      <Header {...props} />
      <Navigation {...props}>
        <div className="d-flex justify-content-between align-items-center searchContainer">
          <div className="endpoint">
            {edgeNodeData?.edgeNodeInfo?.title} -
            <span className="edge-node"> {props.t('dashboard.edgeNodes')}</span>
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
        <DropDown {...props} description={props.t('edgeNode.description')} />
        <div className="navigation-panel d-flex py-4">
          <div className="d-flex row w-100 nav-wrapper">
            {edgeNodePending ? (
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
                  isPagination={true}
                  navHeaderName={props.t('edge-nodes.name')}
                  sortHandle={() => sortTable()}
                />
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
      {(edgeNodeData?.statusResult || logoutResult) && <Toast {...props} />}
    </div>
  )
}

export default EdgeNodeComponent
