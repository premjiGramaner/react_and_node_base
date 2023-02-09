import React from 'react'
import Tooltip from '@Components/Tooltip/Tooltip'
import {
  IDashboardCardInterface,
  ISearchData,
} from '@Utils/interface/ComponentInterface/DashboardCardInterface'
import {
  EdgeNodeDisable,
  EdgeNodeEnable,
  EdgeAppInstanceDisable,
  EdgeAppInstanceEnable,
} from '@Assets/images'

const DashboardCard: React.FC<IDashboardCardInterface> = props => {
  return (
    <div className="card-container py-4">
      {props.dashboardData.length > 0 &&
        props.dashboardData?.map((data: ISearchData) => {
          const status =
            data.enabled === true ? 'status-enable' : 'status-disable'
          return (
            <div className="dashboardCard rounded">
              <div className={`${status}`}>
                <div
                  className={`d-flex align-items-center px-4 pt-4 justify-content-between`}
                >
                  <div className="d-flex align-items-center">
                    <i
                      className={`fa fa-circle status-icon ${data.edgeNodeStatus}`}
                    ></i>
                    <div className="project-txt px-2">{data.projectName}</div>
                  </div>

                  <Tooltip infoData={data.info} />
                </div>
                <div className="project-helpertxt px-4">{data.projectType}</div>
                <div className={`enabled px-4`}>
                  {data.enabled === true ? 'Enabled' : 'Disabled'}
                </div>
                <div className="d-flex align-items-center">
                  <div className={` edge-app-color col-6 `}>
                    <div className={`edge-app-color edge-nodes-app px-4 pt-2`}>
                      Edge Nodes
                    </div>
                    <div className="d-flex px-4 edge-app-color align-items-center">
                      {data.enabled === true ? (
                        <img src={EdgeNodeEnable} className="edge-node-icon" />
                      ) : (
                        <img src={EdgeNodeDisable} className="edge-node-icon" />
                      )}
                      <div className={`node-count node-app fw-bold px-2`}>
                        {data.edgeNodes}
                      </div>
                    </div>
                  </div>
                  <div className={`edge-node-color col-6`}>
                    <div className={`edge-node-color edge-nodes-app px-4 pt-2`}>
                      Edge App Instances
                    </div>
                    <div className="d-flex px-4 edge-node-color align-items-center">
                      {data.enabled === true ? (
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
                      <div className={`node-count node-app fw-bold px-2`}>
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
