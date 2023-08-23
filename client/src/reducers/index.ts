import { combineReducers } from 'redux'
import { URLS } from '@Utils/constants'

/* Reducers */
import coreReducer from './coreReducer'
import loginReducer from './loginReducer'
import dashboardReducer from './dashboardReducer'
import edgeNodeReducer from './EdgeNodeReducer'
import edgeNodeAppInstanceReducer from './edgeNodeAppInstanceReducer'
import userLogEventReducer from './userLogEventReducer'

/* Actions */
export * from './coreReducer'
export * from './dashboardReducer'
export * from './EdgeNodeReducer'
export * from './userLogEventReducer'

const allReducers = combineReducers({
  coreReducer,
  loginReducer,
  dashboardReducer,
  edgeNodeReducer,
  edgeNodeAppInstanceReducer,
  userLogEventReducer,
})

const rootReducer = (state: any, action: any) => {
  if (action.type === URLS.LOGOUT) {
    localStorage.removeItem('persist:zed-root')
    sessionStorage.clear()
    localStorage.clear();
    state.dashboardReducer = { ...state.dashboardReducer, agreedTermsAndService: false }
  }

  return allReducers(state, action)
}
export type rootReducer = ReturnType<typeof rootReducer>
export default rootReducer
