import { combineReducers } from 'redux'
import { URLS } from '@Utils/constants'

/* Reducers */
import coreReducer from './coreReducer'
import dashboardReducer from './dashboardReducer'

/* Actions */
export * from './coreReducer'
export * from './dashboardReducer'

const allReducers = combineReducers({ coreReducer, dashboardReducer })

const rootReducer = (state: any, action: any) => {
  if (action.type === URLS.LOGOUT) {
    state = undefined
  }

  return allReducers(state, action)
}
export type rootReducer = ReturnType<typeof rootReducer>
export default rootReducer
