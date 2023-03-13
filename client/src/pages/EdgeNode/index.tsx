import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

import {
  fetchEdgeNode,
  downloadScript,
  sessionStatus,
  fetchEdgeViewStatus,
} from '@Reducers/index'
import { fetchEdgeNodeInfo } from '@Reducers/edgeNodeAppInstanceReducer'

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

import { CloseIcon, SortIcon } from '@Assets/images'

const EdgeNodeComponent: React.FC<IDefaultPageProps> = props => {
  const edgeNodeData = useSelector(
    (state: IReducerState) => state.edgeNodeReducer
  )

  const [edgeNodeList, setEdgeNodeList] = useState<IEdgeNodePageState>()

  const [sessionDetails, setSessionDetails] = useState<any>()
  const [edgeViewSessionStatus, setEdgeViewSessionStatus] = useState<string>('')
  const [sessionPending, setSessionPending] = useState<boolean>(false)

  useEffect(() => {
    setEdgeNodeList(edgeNodeData)
    setSessionPending(edgeNodeData?.sessionPending)
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
        setSessionDetails(data), props.dispatch(fetchEdgeViewStatus(data.id))
      },
    },
  ]

  const handleDownloadScript = () => {
    props.dispatch(downloadScript(sessionDetails?.id))
    props.dispatch(
      fetchUserEvents({
        edgeNode: sessionDetails.name,
        dateTime: moment().format('LLL'),
        severity: 'INFO',
        project: edgeNodeData?.edgeNodeInfo?.title,
        description: `EdgeNode ${sessionDetails.name}' script download successfully`,
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
        dateTime: moment().format('LLL'),
        severity: 'INFO',
        project: edgeNodeData?.edgeNodeInfo?.title,
        description: `EdgeNode ${sessionDetails.name}' is DeviceStopEdgeview`,
      })
    )
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
        dateTime: moment().format('LLL'),
        severity: 'INFO',
        project: edgeNodeData?.edgeNodeInfo?.title,
        description: `EdgeNode ${sessionDetails.name}' is DeviceStartEdgeview`,
      })
    )
  }

  const handleNavClick = data => {
    props.dispatch(
      fetchEdgeNodeInfo({
        title: data.name,
        edgeNodesCount: data.appInstCount,
      })
    )
    props.dispatch(
      fetchUserEvents({
        edgeNode: data.name,
        dateTime: moment().format('LLL'),
        severity: 'INFO',
        project: edgeNodeData?.edgeNodeInfo?.title,
        description: `EdgeNode ${data.name}' is selected`,
      })
    )
    props.navigate(URLS.EDGEAPPINSTANCES)
  }

  const handleRefreshClick = () => {
    props.dispatch(fetchEdgeViewStatus(sessionDetails?.id))
  }

  const popupClose = () => {
    props.dispatch(fetchEdgeNode(`${edgeNodeData?.edgeNodeInfo?.title}`))
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
              onClick={() => props.navigate(URLS.DASHBOARD)}
            />
          </div>
          <SearchBox {...props} icon="fa fa-search" />
        </div>
        <DropDown {...props} />
        <div className="navigation-panel d-flex py-4">
          <div className="d-flex row w-100 nav-wrapper">
            {edgeNodeList?.deviceList?.list?.length > 0 && (
              <>
                <div className="col-2 nav-panel">
                  <div>
                    <div className="nav-header">
                      {props.t('edge-nodes.name')}
                      <img src={SortIcon} className="sort-icon" />
                    </div>

                    {edgeNodeList?.deviceList?.list?.map((data, index) => {
                      return (
                        <div
                          key={index}
                          className="nav-list"
                          onClick={() => {
                            handleNavClick(data)
                          }}
                        >
                          {data.name}
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="col-10 nav-content">
                  <Table
                    {...props}
                    column={tableHeader}
                    rowContent={edgeNodeList?.deviceList?.list}
                  />
                </div>
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
