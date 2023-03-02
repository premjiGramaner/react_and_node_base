import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import {
  fetchEdgeNode,
  downloadScript,
  fetchProjectInfo,
} from '@Reducers/index'

import { IDefaultPageProps, IReducerState } from '@Utils/interface'
import { URLS } from '@Utils/constants'

import Header from '@Components/Header/Header'
import DropDown from '@Components/DropDown/DropDown'
import SearchBox from '@Components/SearchBox/SearchBox'
import Navigation from '@Components/Navigation/Navigation'
import NavPanel from '@Components/NavPanel/NavPanel'
import Table from '@Components/Table/Table'
import Modal from '@Components/Modal/Modal'

import { CloseIcon, SortIcon } from '@Assets/images'

const EdgeNodeComponent: React.FC<IDefaultPageProps> = props => {
  const edgeNodeData = useSelector(
    (state: IReducerState) => state.edgeNodeReducer
  )

  const [sessionDetails, setSessionDetails] = useState<any>()

  useEffect(() => {
    props.dispatch(
      fetchEdgeNode(
        `next.pageSize=20&next.pageNum=1&projectName=${edgeNodeData?.edgeNodeInfo?.title}`
      )
    )
  }, [edgeNodeData?.edgeNodeInfo?.title])

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

  console.log('edgeNodeData?.edgeNodeInfo?', edgeNodeData?.edgeNodeInfo)
  return (
    <div className="edge-nodes-container">
      <Header {...props} />
      <Navigation {...props}>
        <div className="d-flex justify-content-between align-items-center searchContainer">
          <div className="endpoint">
            {edgeNodeData?.edgeNodeInfo?.title} -
            <span className="edge-node">{props.t('dashboard.edgeNodes')}</span>
            <span className="device-count">
              ({edgeNodeData.deviceList?.list?.length})
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
          <NavPanel
            {...props}
            navigationList={edgeNodeData.deviceList?.list}
            navigationData={edgeNodeData.deviceList?.list}
            navigatePage={true}
            handleListCount={props.dispatch(fetchProjectInfo())}
          >
            <Table
              column={tableHeader}
              rowContent={edgeNodeData.deviceList?.list}
              pageSize={10}
            />
          </NavPanel>
          {/* <div className="d-flex row">
            <div className="col-2">
              <div>
                <div className="nav-header">
                  {props.t('edge-nodes.name')}
                  <img src={SortIcon} className="sort-icon" />
                </div>

                {edgeNodeData.deviceList?.list?.map(deviceName => {
                  return (
                    <ul>
                      <li>{deviceName.name}</li>
                    </ul>
                  )
                })}
              </div>
            </div>
            <div className="col-10">
              <Table
                column={tableHeader}
                rowContent={edgeNodeData.deviceList?.list}
                pageSize={10}
              />
            </div>
          </div> */}
          <Modal
            {...props}
            headerName={'Coimbatore_device_1'}
            status={sessionDetails?.status}
            statusColor={sessionDetails?.sessionActive}
            handleDownload={handleDownloadScript}
          />
        </div>
      </Navigation>
    </div>
  )
}

export default EdgeNodeComponent
