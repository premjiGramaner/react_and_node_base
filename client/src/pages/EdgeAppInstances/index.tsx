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
import Table from '@Components/Table/Table'

import { CloseIcon, SortIcon } from '@Assets/images'

const EdgeAppInstancesComponent: React.FC<IDefaultPageProps> = props => {
  const edgeAppData = useSelector((state: IReducerState) => state)
  const edgeNodeData = useSelector(
    (state: IReducerState) => state.edgeNodeReducer
  )
  const [instanceName, setInstanceName] = useState<string>('')
  const [active, setActive] = useState<number>(null)

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
      name: 'Protocal',
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

  const handleNavClick = (data, index) => {
    setActive(index)
    props.dispatch(fetchNetworkData(data.id))
    setInstanceName(data.name)
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
            <span className="edge-node">
              {edgeAppData?.edgeNodeAppInstanceReducer?.edgeNodeInfo?.title}
            </span>
            <span className="device-count">
              (
              {
                edgeAppData?.edgeNodeAppInstanceReducer?.edgeNodeInfo
                  ?.edgeNodesCount
              }
              ) - {instanceName}
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

        <div className="navigation-panel d-flex py-4">
          <div className="d-flex row w-100 nav-wrapper">
            {edgeAppData?.edgeNodeAppInstanceReducer?.edgeNodeDataList?.list
              ?.length > 0 && (
              <>
                <div className="col-2 nav-panel">
                  <div>
                    <div className="nav-header">
                      {props.t('edge-nodes.name')}
                      <img src={SortIcon} className="sort-icon" />
                    </div>

                    {edgeAppData?.edgeNodeAppInstanceReducer?.edgeNodeDataList?.list?.map(
                      (data, index) => {
                        return (
                          <div
                            key={index}
                            className={`nav-list ${
                              active === index && 'active'
                            }`}
                            onClick={() => {
                              handleNavClick(data, index)
                            }}
                          >
                            {data.name}
                          </div>
                        )
                      }
                    )}
                  </div>
                </div>
                <div className="col-10 d-flex nav-content">
                  <Table
                    column={tableHeader}
                    rowContent={
                      edgeAppData?.edgeNodeAppInstanceReducer?.edgeNodeDataList
                        ?.list
                    }
                    pageSize={10}
                  />

                  <Table
                    {...props}
                    column={networkTableHeader}
                    rowContent={
                      [] || edgeAppData?.edgeNodeAppInstanceReducer?.networkList
                    }
                    pageSize={10}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </Navigation>
    </div>
  )
}

export default EdgeAppInstancesComponent
