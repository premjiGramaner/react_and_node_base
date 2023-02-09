import React from 'react'
import Tooltip from '@Components/Tooltip/Tooltip'
import {
  IDashboardCardInterface,
  ISearchData,
} from '@Utils/interface/ComponentInterface/DashboardCardInterface'

const DashboardCard: React.FC<IDashboardCardInterface> = props => {
  return (
    <div className="card-container py-4">
      {props.projectDetails &&
        props.projectDetails?.map((data: ISearchData) => {
          const status =
            data.projectStatus === 'Enabled'
              ? 'status-enable'
              : 'status-disable'
          return (
            <div className="dashboardCard rounded">
              <div className={`${status}`}>
                <div
                  className={`d-flex align-items-center px-4 pt-4 justify-content-between`}
                >
                  <div className="d-flex align-items-center">
                    <i className="fa fa-circle status-icon"></i>
                    <div className="project-txt px-2">{data.projectName}</div>
                  </div>

                  <Tooltip infoData={data.info} />
                </div>
                <div className="project-helpertxt px-4">{data.projectType}</div>
                <div className={`enabled px-4`}>{data.projectStatus}</div>
                <div className="d-flex align-items-center">
                  <div className={` edge-app-color col-6 `}>
                    <div className={`edge-app-color edge-nodes-app px-4 pt-2`}>
                      Edge Nodes
                    </div>
                    <div className="d-flex px-4 edge-app-color align-items-center">
                      <i className={`status-icon fa fa-desktop py-3`}></i>
                      <div className={`node-count node-app fw-bold px-4`}>
                        {data.edgeNodes}
                      </div>
                    </div>
                  </div>
                  <div className={`edge-node-color col-6`}>
                    <div className={`edge-node-color edge-nodes-app px-4 pt-2`}>
                      Edge App Instances
                    </div>
                    <div className="d-flex px-4 edge-node-color align-items-center">
                      <i className={`fa fa-hand-o-up status-icon py-3`}></i>
                      <div className={`node-count node-app fw-bold px-4`}>
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
