import { ICoreReducerState } from './index'
import { IDashboardPageState } from '@Utils/interface/PagesInterface/DashboardPageInterface'

export interface IReducerState {
  coreReducer: ICoreReducerState
  dashboardReducer: IDashboardPageState
}

export interface IDispatchState {
  payload: any
}

export interface APICommonResponseMock {
  payload: any
}
