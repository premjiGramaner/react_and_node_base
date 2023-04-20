import React from 'react'
import moment from 'moment'

import Tooltip from '@Components/Tooltip/Tooltip'
import {
  IDashboardCardInterface,
  ISearchData,
} from '@Utils/interface/ComponentInterface/DashboardCardInterface'
import { IDefaultPageProps } from '@Interface/PagesInterface'
import { URLS } from '@Utils/constants'
import { fetchProjectInfo, fetchEdgeNode } from '@Reducers/index'
import { fetchUserEvents } from '@Reducers/userLogEventReducer'
import { EdgeNodeDisable, EdgeNodeEnable } from '@Assets/images'
import { EdgeAppInstanceEnable, EdgeAppInstanceDisable } from '@Assets/svg'
const DashboardCard: React.FC<
  IDashboardCardInterface & IDefaultPageProps
> = props => {
  const handleEdgeNodeClick = data => {
    props.dispatch(fetchEdgeNode(`projectName=${data.title}`))
    props.dispatch(
      fetchProjectInfo({
        title: data.title,
        edgeNodesCount: data.edgeNodes,
      })
    )
    props.dispatch(
      fetchUserEvents({
        name: moment().format('LLL'),
        severity: 'INFO',
        project: data.title,
        description: `User ${sessionStorage.getItem(
          'userName'
        )} - selected project '${data.title}'`,
      })
    )
    props.navigate(URLS.EDGENODE)
  }

  return (
    <div className="card-container py-4">
      {props.dashboardData?.length > 0 &&
        props.dashboardData?.map((data: ISearchData, index: number) => {
          const status =
            data?.edgeNodes !== 0 ? 'status-enable' : 'status-disable'
          return (
            <div className="dashboardCard rounded" key={index}>
              <div className={`${status}`}>
                <div className="d-flex align-items-center px-4 pt-4 justify-content-between">
                  <div className="d-flex align-items-center">
                    <i
                      className={`fa fa-circle status-icon ${data.projectStatus}`}
                    ></i>
                    <div className="project-txt px-2">{data.title}</div>
                  </div>

                  {data.info.length !== 0 && <Tooltip infoData={data.info} />}
                </div>
                <div
                  className={`edgeView-status px-4 ${
                    data.edgeViewStatus === true ? 'enabled' : 'disabled'
                  }`}
                >
                  {data.edgeViewStatus === true
                    ? props.t('dashboard.enabled')
                    : props.t('dashboard.disabled')}
                </div>
                <div className="d-flex ">
                  <div
                    className={`${
                      data?.edgeNodes !== 0 ? 'pe-auto' : 'pe-none'
                    } edge-app-color col-6`}
                  >
                    <div className="edge-app-color edge-nodes-app px-4 pt-2">
                      {props.t('dashboard.edgeNodes')}
                    </div>
                    <div
                      className="d-flex px-4 edge-app-color align-items-center"
                      onClick={() => handleEdgeNodeClick(data)}
                      onKeyDown={() => handleEdgeNodeClick(data)}
                      aria-hidden="true"
                    >
                      {data?.edgeNodes !== 0 ? (
                        <img
                          src={EdgeNodeEnable}
                          className="edge-node-icon"
                          alt=""
                        />
                      ) : (
                        <img
                          src={EdgeNodeDisable}
                          className="edge-node-icon"
                          alt=""
                        />
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
                      {data?.edgeNodes !== 0 ? (
                        <img
                          src={EdgeAppInstanceEnable}
                          className="edge-app-icon"
                          alt=""
                        />
                      ) : (
                        <img
                          src={EdgeAppInstanceDisable}
                          className="edge-app-icon"
                          alt=""
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
