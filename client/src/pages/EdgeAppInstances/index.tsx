import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import {
  fetchEdgeNodeApp,
  fetchNetworkData,
} from '@Reducers/edgeNodeAppInstanceReducer'

import { IDefaultPageProps, IReducerState } from '@Utils/interface'
import { URLS } from '@Utils/constants'

import Header from '@Components/Header/Header'
import DropDown from '@Components/DropDown/DropDown'
import SearchBox from '@Components/SearchBox/SearchBox'
import Navigation from '@Components/Navigation/Navigation'
import NavPanel from '@Components/NavPanel/NavPanel'
import Table from '@Components/Table/Table'

import { CloseIcon } from '@Assets/images'

const EdgeAppInstancesComponent: React.FC<IDefaultPageProps> = props => {
  const edgeAppData = useSelector((state: IReducerState) => state)

  console.log(
    'edgeAppData',
    edgeAppData?.edgeNodeAppInstanceReducer?.edgeNodeDataList?.list
  )
  useEffect(() => {
    props.dispatch(fetchEdgeNodeApp())
  }, [])

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
      key: 'ports',
      name: 'Host Port',
    },
    {
      key: 'ports',
      name: 'Application Port',
    },
  ]

  const fetchNetwork = data => {
    props.dispatch(fetchNetworkData(data))
  }
  return (
    <div className="edge-nodes-container">
      <Header {...props} />
      <Navigation {...props}>
        <div className="d-flex justify-content-between align-items-center searchContainer">
          <div className="endpoint">
            {/* {edgeAppData}
            <span className="edge-node">{props.t('dashboard.edgeNodes')}</span>
            <span className="device-count">({edgeAppData})</span> */}
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
            navigationList={
              edgeAppData?.edgeNodeAppInstanceReducer?.edgeNodeDataList?.list
            }
            navigationData={
              edgeAppData?.edgeNodeAppInstanceReducer?.edgeNodeDataList?.list
            }
            handleDeviceData={data => fetchNetwork(data)}
          >
            <div className="d-flex">
              <Table
                className="network-table"
                column={tableHeader}
                rowContent={
                  edgeAppData?.edgeNodeAppInstanceReducer?.edgeNodeDataList
                    ?.list
                }
                pageSize={10}
              />
              <Table
                column={networkTableHeader}
                rowContent={
                  edgeAppData?.edgeNodeAppInstanceReducer?.networkList
                }
                pageSize={10}
              />
            </div>
          </NavPanel>
        </div>
      </Navigation>
    </div>
  )
}

export default EdgeAppInstancesComponent
