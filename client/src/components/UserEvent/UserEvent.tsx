import React from 'react'
import { IDefaultPageProps } from '@Interface/PagesInterface'
import NavPanel from '@Components/NavPanel/NavPanel'
import Table from '@Components/Table/Table'
import { userEventLog, date } from '@Store/mockStore/storeData/userEventMock'

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
      <NavPanel
        {...props}
        navigationList={date}
        navigationData={userEventLog}
        navigatePage={true}
      >
        <Table column={tableHeader} rowContent={userEventLog} pageSize={10} />
      </NavPanel>
    </>
  )
}

export default UserEvent
