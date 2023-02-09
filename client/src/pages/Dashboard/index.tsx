import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IDefaultPageProps, IReducerState } from '@Utils/interface'
import { URLS } from '@Utils/constants'
import { IS_USER_AUTHENTICATED } from '@Utils/storage'
import { fetchUsers, updateUser, deleteUser } from '@Reducers/index'
import Header from '@Components/Header/Header'
import DashboardCard from '@Components/DashboardCard/DashboardCard'
import DropDown from '@Components/DropDown/DropDown'
import SearchBox from '@Components/SearchBox/SearchBox'
import Navigation from '@Components/Navigation/Navigation'

const dummyData = [
  {
    projectName: 'Coimbatore',
    projectStatus: 'Enabled',
    projectType: 'Regular',
    edgeNodes: 33,
    edgeAppInstance: 44,
    info: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ',
  },
  {
    projectName: 'Chennai',
    projectStatus: 'Disabled',
    projectType: 'Azure',
    edgeNodes: 33,
    edgeAppInstance: 44,
    info: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ',
  },
  {
    projectName: 'Coimbatore',
    projectStatus: 'Enabled',
    projectType: 'Regular',
    edgeNodes: 33,
    edgeAppInstance: 44,
    info: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ',
  },
  {
    projectName: 'Chennai',
    projectStatus: 'Disabled',
    projectType: 'Azure',
    edgeNodes: 33,
    edgeAppInstance: 44,
    info: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ',
  },
  {
    projectName: 'Coimbatore',
    projectStatus: 'Enabled',
    projectType: 'Regular',
    edgeNodes: 33,
    edgeAppInstance: 44,
    info: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  },
  {
    projectName: 'Chennai',
    projectStatus: 'Disabled',
    projectType: 'Azure',
    edgeNodes: 33,
    edgeAppInstance: 44,
    info: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ',
  },
]
const DashboardComponent: React.FC<IDefaultPageProps> = props => {
  useEffect(() => {
    if (!IS_USER_AUTHENTICATED()) {
      props.navigate(URLS.LOGIN)
    }
    props.dispatch(fetchUsers())
  }, [])
  const onLogout = () => {
    console.log('logout clicked')
    IS_USER_AUTHENTICATED('false')
    props.navigate(URLS.LOGIN)
  }
  return (
    <div className="dashboard-page-main-container">
      <Header userName={'Peter'} handleLogout={onLogout} />
      <Navigation />
      <div className="d-flex justify-content-between align-items-center searchContainer">
        <div className="endpoint">{props.t('dashboard.endpoint')}</div>
        <SearchBox icon="fa fa-search" />
      </div>
      <DropDown />
      <div className="DashboardCardContainer">
        <DashboardCard projectDetails={dummyData} />
      </div>
    </div>
  )
}

export default DashboardComponent
