import React, { useState } from 'react'
import { IDefaultPageProps } from '@Utils/interface'
import Table from '@Components/Table/Table'

const UserEvent: React.FC<IDefaultPageProps> = props => {
  const sessionData = sessionStorage.getItem('userEventLogs')

  const userEventLogData = JSON.parse(sessionData)?.flat().filter(Boolean)
  const [order, setOrder] = useState<string>('ASC')
  const [userEventData, setUserEventData] = useState(userEventLogData)

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
      key: 'appInstance',
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

  const sortTable = () => {
    if (order === 'ASC') {
      const sortedArray = userEventLogData.sort(
        (a, b) => Date.parse(a.name) - Date.parse(b.name)
      )
      setUserEventData(sortedArray)
      setOrder('DSC')
    }
    if (order === 'DSC') {
      const sortedArray = userEventLogData.sort(
        (a, b) => Date.parse(b.name) - Date.parse(a.name)
      )
      setUserEventData(sortedArray)
      setOrder('ASC')
    }
  }
  return (
    <div className="user-event-log">
      <div className="event-title">{props.t('userEvent.activityLog')}</div>
      <div className="navigation-panel d-flex pb-5">
        <div className="d-flex row w-100 nav-wrapper">
          {userEventLogData?.length > 0 && (
            <>
              <Table
                {...props}
                className="user-event-table"
                column={tableHeader}
                rowContent={userEventData || []}
                pageSize={10}
                isDisplayNavPanel={true}
                navHeaderName={props.t('userEvent.date')}
                isPagination={true}
                sortHandle={() => sortTable()}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserEvent
