import { combineReducers } from 'redux'
import { URLS } from '@Utils/constants'

/* Reducers */
import coreReducer from './coreReducer'
import loginReducer from './loginReducer'
import dashboardReducer from './dashboardReducer'

/* Actions */
export * from './coreReducer'

const allReducers = combineReducers({
  coreReducer,
  loginReducer,
  dashboardReducer,
})

const rootReducer = (state: any, action: any) => {
  if (action.type === URLS.LOGOUT) {
    state = undefined
  }

  return allReducers(state, action)
}
export type rootReducer = ReturnType<typeof rootReducer>
export default rootReducer
