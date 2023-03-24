import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { fetchEdgeNode } from '@Reducers/index'

import { IDefaultPageProps, IReducerState } from '@Utils/interface'
import { URLS } from '@Utils/constants'
import { IS_USER_AUTHENTICATED, getToken } from '@Utils/storage'

import Header from '@Components/Header/Header'
import DropDown from '@Components/DropDown/DropDown'
import SearchBox from '@Components/SearchBox/SearchBox'
import Navigation from '@Components/Navigation/Navigation'
import NavPanel from '@Components/NavPanel/NavPanel'
import Table from '@Components/Table/Table'
import Modal from '@Components/Modal/Modal'

import { CloseIcon } from '@Assets/images'

const EdgeNodeComponent: React.FC<IDefaultPageProps> = props => {
  const { userName } = useSelector((state: IReducerState) => state.loginReducer)

  const edgeNodeData = useSelector(
    (state: IReducerState) => state.edgeNodeReducer
  )

  const [sessionDetails, setSessionDetails] = useState<any>()

  useEffect(() => {
    props.dispatch(fetchEdgeNode())
  }, [])

  const onLogout = () => {
    IS_USER_AUTHENTICATED('false')
    props.navigate(URLS.LOGIN)
  }

  const tableHeader = [
    {
      key: 'status',
      name: 'Status',
      status: true,
    },
    {
      key: 'eveImageVersion',
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

  return (
    <div className="edge-nodes-container">
      <Header {...props} userName={userName} handleLogout={onLogout} />
      <Navigation {...props} />
      <div className="d-flex justify-content-between align-items-center searchContainer">
        <div className="endpoint">
          {edgeNodeData?.edgeNodeInfo?.projectName} -
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
      <div className="navigation-panel py-4">
        <NavPanel
          {...props}
          navigationList={edgeNodeData.deviceList}
          navigationData={edgeNodeData?.edgeNodeDataList}
          navigatePage={true}
        >
          <Table
            column={tableHeader}
            rowContent={edgeNodeData?.edgeNodeDataList}
            pageSize={10}
          />
        </NavPanel>
        <Modal
          {...props}
          headerName={'Coimbatore_device_1'}
          status={sessionDetails?.status}
          statusColor={sessionDetails?.sessionActive}
        />
      </div>
    </div>
  )
}

export default EdgeNodeComponent
