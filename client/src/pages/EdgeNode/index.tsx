import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { fetchEdgeNode, downloadScript, sessionStatus } from '@Reducers/index'
import { fetchEdgeNodeInfo } from '@Reducers/edgeNodeAppInstanceReducer'

import { IDefaultPageProps, IReducerState } from '@Utils/interface'
import { URLS } from '@Utils/constants'

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

  const [sessionDetails, setSessionDetails] = useState<any>()

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
      key: 'sessionActive',
      name: 'Edge View Sessions',
      cell: data => {
        setSessionDetails(data)
      },
    },
  ]

  const handleDownloadScript = () => {
    props.dispatch(downloadScript(sessionDetails?.id))
  }

  const handleSession = () => {
    props.dispatch(sessionStatus(`${sessionDetails?.id}/disable`))
  }

  const handleNavClick = data => {
    props.dispatch(
      fetchEdgeNodeInfo({
        title: data.name,
        edgeNodesCount: data.appInstCount,
      })
    )
    props.navigate(URLS.EDGEAPPINSTANCES)
  }

  const handleRefreshClick = () => {
    props.dispatch(
      fetchEdgeNode(
        `next.pageSize=20&next.pageNum=1&projectName=${edgeNodeData?.edgeNodeInfo?.title}`
      )
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
              onClick={() => props.navigate(URLS.DASHBOARD)}
            />
          </div>
          <SearchBox {...props} icon="fa fa-search" />
        </div>
        <DropDown {...props} />
        <div className="navigation-panel d-flex py-4">
          <div className="d-flex row w-100 nav-wrapper">
            {edgeNodeData.deviceList?.list?.length > 0 && (
              <>
                <div className="col-2 nav-panel">
                  <div>
                    <div className="nav-header">
                      {props.t('edge-nodes.name')}
                      <img src={SortIcon} className="sort-icon" />
                    </div>

                    {edgeNodeData.deviceList?.list?.map((data, index) => {
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
                    rowContent={edgeNodeData.deviceList?.list}
                    pageSize={10}
                  />
                </div>
              </>
            )}
          </div>

          <Modal
            {...props}
            headerName={sessionDetails?.name}
            status={sessionDetails?.status}
            statusColor={sessionDetails?.sessionActive}
            handleDownload={handleDownloadScript}
            deActivateSession={handleSession}
            handleRefresh={handleRefreshClick}
          />
        </div>
      </Navigation>
    </div>
  )
}

export default EdgeNodeComponent
