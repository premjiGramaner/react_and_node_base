import { ICoreReducerState, ILoginReducerState } from './index'
import { IDashboardCardInterface } from '@Utils/interface/ComponentInterface'
import { IEdgeNodePageState } from '@Utils/interface/PagesInterface/EdgeNodePageInterface'
import { IUserEventLogInterface } from '@Utils/interface/PagesInterface/UserEventLogInterface'
export interface IReducerState {
  coreReducer: ICoreReducerState
  loginReducer: ILoginReducerState
  dashboardReducer: IDashboardCardInterface
  edgeNodeReducer: IEdgeNodePageState
  edgeNodeAppInstancesReducer: IEdgeAppInstanceState
}

export interface IEdgeAppInstanceState {
  appInstanceData: IEdgeNodePageState
}

export interface IDispatchState {
  payload: any
}

export interface APICommonResponseMock {
  payload: any
}
