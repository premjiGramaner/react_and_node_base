import { ICoreReducerState, ILoginReducerState } from './index'
import { IDashboardCardInterface } from '@Utils/interface/ComponentInterface'
import { IEdgeNodePageState } from '@Utils/interface/PagesInterface/EdgeNodePageInterface'
export interface IReducerState {
  coreReducer: ICoreReducerState
  loginReducer: ILoginReducerState
  dashboardReducer: IDashboardCardInterface
  edgeNodeReducer: IEdgeNodePageState
  edgeNodeAppInstanceReducer: IEdgeNodePageState
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
