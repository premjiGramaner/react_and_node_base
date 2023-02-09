import { ICoreReducerState, ILoginReducerState } from './index'

export interface IReducerState {
  coreReducer: ICoreReducerState
  loginReducer: ILoginReducerState
}

export interface IDispatchState {
  payload: any
}

export interface APICommonResponseMock {
  payload: any
}
