import React, { Fragment, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { withRouter } from './WithRouter'
import AuthWrapper from './AuthWrapper'
import { IS_USER_AUTHENTICATED } from '@Utils/storage'
import { IDefaultPageProps } from '@Utils/interface/PagesInterface'
import { getKey } from '@Utils/utils'
import { URLS } from '@Utils/constants'

import AuthMenuList from './authMenuList'
import UnAuthMenuList from './unAuthMenuList'

const RouterComponent: React.FC<IDefaultPageProps> = props => {
  let authRoutes = null


  if (!Boolean(IS_USER_AUTHENTICATED()) && props.location.pathname !== URLS.LOGIN) {
    window.location.href = URLS.LOGIN;
    return null;
  }

  /* This will triggered when user is not logged-in */
  if (!Boolean(IS_USER_AUTHENTICATED())) {
    authRoutes = (
      <AuthWrapper {...props}>
        <Routes>
          {UnAuthMenuList.map(route => {
            return (
              <Route
                path={route.path}
                key={getKey()}
                element={<route.component {...props} routeinfo={route} />}
              />
            )
          })}
        </Routes>
      </AuthWrapper>
    )
  }

  /* This will triggered when user is logged-in */
  if (Boolean(IS_USER_AUTHENTICATED())) {
    authRoutes = (
      <AuthWrapper {...props}>
        <Routes>
          {AuthMenuList.map(route => {
            return (
              <Route
                path={route.path}
                key={getKey()}
                element={<route.component {...props} routeinfo={route} />}
              />
            )
          })}
        </Routes>
      </AuthWrapper>
    )
  }

  return (
    <React.Fragment>
      <Suspense
        fallback={
          <Fragment>
            <p>Loading...</p>
          </Fragment>
        }
      >
        {authRoutes}
      </Suspense>
    </React.Fragment>
  )
}

export default withRouter(RouterComponent)
