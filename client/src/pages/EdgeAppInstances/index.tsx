import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { fetchEdgeNodeApp } from '@Reducers/edgeNodeAppInstanceReducer'

import { IDefaultPageProps, IReducerState } from '@Utils/interface'
import { URLS } from '@Utils/constants'
import { IS_USER_AUTHENTICATED, getToken } from '@Utils/storage'

import Header from '@Components/Header/Header'
import DropDown from '@Components/DropDown/DropDown'
import SearchBox from '@Components/SearchBox/SearchBox'
import Navigation from '@Components/Navigation/Navigation'
import NavPanel from '@Components/NavPanel/NavPanel'
import Table from '@Components/Table/Table'

import { CloseIcon } from '@Assets/images'

const EdgeAppInstancesComponent: React.FC<IDefaultPageProps> = props => {
  const { userName } = useSelector((state: IReducerState) => state.loginReducer)

  const edgeAppData = useSelector((state: IReducerState) => state)

  useEffect(() => {
    props.dispatch(fetchEdgeNodeApp())
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
      key: 'type',
      name: 'Type',
    },
    {
      key: 'edgeApp',
      name: 'Edge App',
    },
  ]

  const networkTableHeader = [
    {
      key: 'ip_address',
      name: 'IP Address',
      sort: true,
    },
    {
      key: 'ports',
      name: 'Open Ports',
    },
    {
      key: 'description',
      name: 'Description',
    },
  ]

  return (
    <div className="edge-nodes-container">
      <Header {...props} userName={userName} handleLogout={onLogout} />
      <Navigation {...props} />
      <div className="d-flex justify-content-between align-items-center searchContainer">
        <div className="endpoint">
          {edgeAppData?.edgeNodeAppInstanceReducer?.edgeNodeInfo?.projectName} -
          <span className="edge-node">{props.t('dashboard.edgeNodes')}</span>
          <span className="device-count">
            (
            {
              edgeAppData?.edgeNodeAppInstanceReducer?.edgeNodeInfo
                ?.edgeNodesCount
            }
            )
          </span>
          <img
            src={CloseIcon}
            className="close-icon"
            onClick={() => props.navigate(URLS.EDGENODE)}
          />
        </div>
        <SearchBox {...props} icon="fa fa-search" />
      </div>
      <DropDown {...props} />
      <div className="navigation-panel py-4">
        <NavPanel
          {...props}
          navigationList={edgeAppData?.edgeNodeAppInstanceReducer?.deviceList}
          navigationData={
            edgeAppData?.edgeNodeAppInstanceReducer?.edgeNodeDataList
          }
        >
          <div className="d-flex">
            <Table
              className="network-table"
              column={tableHeader}
              rowContent={
                edgeAppData?.edgeNodeAppInstanceReducer?.edgeNodeDataList
              }
              pageSize={10}
            />
            <Table
              column={networkTableHeader}
              rowContent={edgeAppData?.edgeNodeAppInstanceReducer?.networkList}
              pageSize={10}
            />
          </div>
        </NavPanel>
      </div>
    </div>
  )
}

export default EdgeAppInstancesComponent
