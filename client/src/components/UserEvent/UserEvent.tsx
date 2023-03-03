import React from 'react'
import { IDefaultPageProps } from '@Interface/PagesInterface'
import NavPanel from '@Components/NavPanel/NavPanel'
import Table from '@Components/Table/Table'
import { userEventLog, date } from '@Store/mockStore/storeData/userEventMock'
import { SortIcon } from '@Assets/images'

const UserEvent: React.FC<IDefaultPageProps> = props => {
  const tableHeader = [
    {
      name: 'Severity',
      key: 'severity',
    },
    {
      name: 'Edge Note',
      key: 'edgeNote',
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
    <>
      <div className="event-title">{props.t('userEvent.activityLog')}</div>
      <div className="navigation-panel d-flex">
        <div className="d-flex row w-100 nav-wrapper">
          {userEventLog.length > 0 && (
            <>
              <div className="col-2 nav-panel">
                <div>
                  <div className="nav-header">
                    {props.t('userEvent.date')}
                    <img src={SortIcon} className="sort-icon" />
                  </div>

                  {userEventLog.map((data, index) => {
                    return (
                      <div key={index} className="nav-list">
                        {data.date}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="col-10 nav-content">
                <Table
                  column={tableHeader}
                  rowContent={userEventLog}
                  pageSize={10}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default UserEvent
