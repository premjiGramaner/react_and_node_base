import { ICoreReducerState, ILoginReducerState } from './index'
import { IDashboardPageState } from '../index'

export interface IReducerState {
  coreReducer: ICoreReducerState
  loginReducer: ILoginReducerState
  dashboardReducer: IDashboardPageState
}

export interface IDispatchState {
  payload: any
}

export interface APICommonResponseMock {
  payload: any
}
