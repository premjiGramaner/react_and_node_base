import React, { useState } from 'react'
import Tooltip from '@Components/Tooltip/Tooltip'
import {
  IDashboardCardInterface,
  ISearchData,
} from '@Utils/interface/ComponentInterface/DashboardCardInterface'
import { IDefaultPageProps } from '@Interface/PagesInterface'
import { URLS } from '@Utils/constants'

import {
  EdgeNodeDisable,
  EdgeNodeEnable,
  EdgeAppInstanceDisable,
  EdgeAppInstanceEnable,
} from '@Assets/images'

const DashboardCard: React.FC<
  IDashboardCardInterface & IDefaultPageProps
> = props => {
  const handleEdgeNodeClick = data => {
    props.projectInfo(data)
    props.navigate(URLS.EDGENODE)
  }

  return (
    <div className="card-container py-4">
      {props.dashboardData?.length > 0 &&
        props.dashboardData?.map((data: ISearchData, index: number) => {
          const status =
            data.enabled === 'TAG_STATUS_ACTIVE'
              ? 'status-enable'
              : 'status-disable'
          return (
            <div className="dashboardCard rounded" key={index}>
              <div className={`${status}`}>
                <div className="d-flex align-items-center px-4 pt-4 justify-content-between">
                  <div className="d-flex align-items-center">
                    <i
                      className={`fa fa-circle status-icon ${data.edgeNodeStatus}`}
                    ></i>
                    <div className="project-txt px-2">{data.title}</div>
                  </div>

                  {data.info.length !== 0 && <Tooltip infoData={data.info} />}
                </div>
                <div className="enabled px-4">
                  {data.enabled === 'TAG_STATUS_ACTIVE'
                    ? props.t('dashboard.enabled')
                    : props.t('dashboard.disabled')}
                </div>
                <div className="d-flex align-items-center">
                  <div className="edge-app-color col-6">
                    <div className="edge-app-color edge-nodes-app px-4 pt-2">
                      {props.t('dashboard.edgeNodes')}
                    </div>
                    <div
                      className="d-flex px-4 edge-app-color align-items-center"
                      onClick={() => handleEdgeNodeClick(data)}
                    >
                      {data.enabled === 'TAG_STATUS_ACTIVE' ? (
                        <img src={EdgeNodeEnable} className="edge-node-icon" />
                      ) : (
                        <img src={EdgeNodeDisable} className="edge-node-icon" />
                      )}
                      <div className="node-count node-app fw-bold px-2">
                        {data.edgeNodes}
                      </div>
                    </div>
                  </div>
                  <div className="edge-node-color col-6">
                    <div className="edge-node-color edge-nodes-app px-4 pt-2">
                      {props.t('dashboard.edgeInstances')}
                    </div>
                    <div className="d-flex px-4 edge-node-color align-items-center">
                      {data.enabled === 'TAG_STATUS_ACTIVE' ? (
                        <img
                          src={EdgeAppInstanceEnable}
                          className="edge-app-icon"
                        />
                      ) : (
                        <img
                          src={EdgeAppInstanceDisable}
                          className="edge-app-icon"
                        />
                      )}
                      <div className="node-count node-app fw-bold px-2">
                        {data.edgeAppInstance}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}
export default DashboardCard
