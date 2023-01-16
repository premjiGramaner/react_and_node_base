import { combineReducers } from 'redux'
import { URLS } from '@Utils/constants'

/* Reducers */
import coreReducer from "./coreReducer";

/* Actions */
export * from "./coreReducer";

const allReducers = combineReducers({ coreReducer })

const rootReducer = (state: any, action: any) => {
    if (action.type === URLS.LOGOUT) {
        state = undefined
    }

    return allReducers(state, action)
}
export type rootReducer = ReturnType<typeof rootReducer>
export default rootReducer
