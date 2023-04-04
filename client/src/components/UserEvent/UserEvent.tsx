import React, { useEffect, useState } from 'react'
import { IDefaultPageProps, IUserEventInterface } from '@Utils/interface'
import Table from '@Components/Table/Table'

const UserEvent: React.FC<IDefaultPageProps & IUserEventInterface> = props => {
  const [order, setOrder] = useState<string>('DSC')
  const [userEventData, setUserEventData] = useState([])

  useEffect(() => {
    const userEventLogData = JSON.parse(props.sessionData)
      ?.flat()
      .filter(Boolean)
    setUserEventData([...userEventLogData])
  }, [props.sessionData])
  const tableHeader = [
    {
      name: 'Description',
      key: 'description',
    },
  ]

  const sortTable = () => {
    if (order === 'ASC') {
      const sortedArray = userEventData.sort(
        (a, b) => Date.parse(a.name) - Date.parse(b.name)
      )
      setUserEventData([...sortedArray])
      setOrder('DSC')
    }
    if (order === 'DSC') {
      const sortedArray = userEventData.sort(
        (a, b) => Date.parse(b.name) - Date.parse(a.name)
      )
      setUserEventData([...sortedArray])
      setOrder('ASC')
    }
  }
  return (
    <div className="user-event-log">
      <div className="event-title">{props.t('userEvent.activityLog')}</div>
      <div className="navigation-panel d-flex pb-5">
        <div className="d-flex row w-100 nav-wrapper">
          {userEventData?.length > 0 && (
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
