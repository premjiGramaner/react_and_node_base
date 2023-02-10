import { ICoreReducerState, ILoginReducerState } from './index'
import { IDashboardCardInterface } from '@Utils/interface/ComponentInterface'

export interface IReducerState {
  coreReducer: ICoreReducerState
  loginReducer: ILoginReducerState
  dashboardReducer: IDashboardCardInterface
}

export interface IDispatchState {
  payload: any
}

export interface APICommonResponseMock {
  payload: any
}
