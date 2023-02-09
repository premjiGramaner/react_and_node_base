import React, { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { IDefaultPageProps, IReducerState } from '@Utils/interface'
import { URLS } from '@Utils/constants'
import { IS_USER_AUTHENTICATED } from '@Utils/storage'
import { fetchUsers, updateUser, deleteUser } from '@Reducers/index'
import { Table, Pagination } from '@Components/index'
import { data } from '@Store/data'
let PageSize = 10

const DashboardComponent: React.FC<IDefaultPageProps> = props => {
  const [usersList, setusersList] = useState<
    {
      name: string
      id: number
    }[]
  >([])
  const [name, setName] = useState<string>('')

  const { userList, usersLoading } = useSelector(
    (state: IReducerState) => state.coreReducer
  )

  useEffect(() => {
    if (!IS_USER_AUTHENTICATED()) {
      props.navigate(URLS.LOGIN)
    }
    props.dispatch(fetchUsers())
  }, [])

  useEffect(() => {
    console.log('props', props)
  }, [])

  useEffect(() => {
    if (!usersLoading && userList.length) {
      setusersList(userList)
    }
  }, [usersLoading])

  const onLogout = () => {
    IS_USER_AUTHENTICATED('false')
    props.navigate(URLS.LOGIN)
  }

  const onSave = async (item: any) => {
    // await updateUser(item);
    // props.dispatch(fetchUsers())
    props.changeColor('purple')
  }

  const onDelete = async (id: any) => {
    await deleteUser(id)
    props.dispatch(fetchUsers())
  }

  const tableHeader = [
    {
      key: 'first_name',
      name: 'first_name',
    },
    {
      key: 'last_name',
      name: 'last_name',
    },
    {
      key: 'city',
      name: 'city',
    },
  ]

  return (
    <div className="dashboard-page-main-container">
      <div className="sample-header">
        <h3>Dashboard Component</h3>
        <button className="btn btn-primary" onClick={onLogout}>
          Logout
        </button>
      </div>
      <Table column={tableHeader} rowContent={data} pageSize={10} />
    </div>
  )
}

export default DashboardComponent
