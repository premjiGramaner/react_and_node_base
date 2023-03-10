import React from 'react'
import { IDefaultPageProps } from '@Utils/interface'

import Table from '@Components/Table/Table'
import { userEventLog } from '@Store/mockStore/storeData/userEventMock'
import { SortIcon } from '@Assets/images'

const UserEvent: React.FC<IDefaultPageProps> = props => {
  const userEventLogData = sessionStorage.getItem('userEventLogs')

  const tableHeader = [
    {
      name: 'Severity',
      key: 'severity',
    },
    {
      name: 'Edge Node',
      key: 'edgeNode',
    },
    {
      name: 'Edge App Instance',
      key: 'edgeApp',
    },
    {
      name: 'Project',
      key: 'project',
    },
    {
      name: 'Description',
      key: 'description',
    },
  ]
  return (
    <div className="user-event-log">
      <div className="event-title">{props.t('userEvent.activityLog')}</div>
      <div className="navigation-panel d-flex">
        <div className="d-flex row w-100 nav-wrapper">
          {JSON.parse(userEventLogData)?.length > 0 && (
            <>
              <div className="col-2 nav-panel">
                <div>
                  <div className="nav-header">
                    {props.t('userEvent.date')}
                    <img src={SortIcon} className="sort-icon" />
                  </div>

                  {JSON.parse(userEventLogData)?.map((data, index) => {
                    return (
                      <div key={index} className="nav-list">
                        {data.dateTime}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="col-10 nav-content">
                <Table
                  {...props}
                  column={tableHeader}
                  rowContent={JSON.parse(userEventLogData) || []}
                  pageSize={10}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserEvent
