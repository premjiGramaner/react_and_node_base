import React from 'react'
import { NavigateOptions, To, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { IS_USER_AUTHENTICATED } from '@Utils/storage'

/* istanbul ignore next */
export function withRouter(Child: any) {
  return props => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
      <Child
        {...props}
        navigate={(url: To, options?: NavigateOptions) => navigate(url, options)}
        location={location}
        dispatch={dispatch}
        isUserAuthenticated={IS_USER_AUTHENTICATED()}
      />
    )
  }
}
