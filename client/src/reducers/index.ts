import { combineReducers } from 'redux'
import { URLS } from '@Utils/constants'

/* Reducers */
import coreReducer from './coreReducer'
import loginReducer from './loginReducer'
import dashboardReducer from './dashboardReducer'
import edgeNodeReducer from './EdgeNodeReducer'
import edgeNodeAppInstanceReducer from './edgeNodeAppInstanceReducer'
/* Actions */
export * from './coreReducer'
export * from './dashboardReducer'
export * from './EdgeNodeReducer'

const allReducers = combineReducers({
  coreReducer,
  loginReducer,
  dashboardReducer,
  edgeNodeReducer,
  edgeNodeAppInstanceReducer,
})

const rootReducer = (state: any, action: any) => {
  if (action.type === URLS.LOGOUT) {
    state = undefined
  }

  return allReducers(state, action)
}
export type rootReducer = ReturnType<typeof rootReducer>
export default rootReducer
