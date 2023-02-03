import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { reviseData } from '@Utils/validation'
import {
  API,
  ILoginReducerState,
  IDispatchState,
  ILoginState,
} from '@Interface/index'
import { loginStoreMock } from '@Store/mockStore/storeData'

export const userLogin: any = createAsyncThunk(
  'loginReducer/login',
  async (loginPayload: ILoginState) => {
    return new Promise((resolve: any) => {
      resolve({
        loginStoreMock,
      }).catch((response: Error) => {
        const { data } = reviseData(response)
        console.log('API Failed!', data)
        resolve({ data: [] })
      })
    })
  }
)

export const loginReducerInitialState: ILoginReducerState = {
  pending: false,
  userName: '',
  token: '',
}

const loginReducer = createSlice({
  name: 'loginReducer',
  initialState: loginReducerInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      userLogin.pending,
      (state: ILoginReducerState, _action: IDispatchState) => {
        state.pending = true
      }
    )
    builder.addCase(
      userLogin.fulfilled,
      (state: ILoginReducerState, action: IDispatchState) => {
        state.token = action.payload.loginStoreMock.loginInfo.token.base64
        state.userName =
          action.payload.loginStoreMock.loginInfo.detailedUser.firstName
        state.pending = false
      }
    )
  },
})

export default loginReducer.reducer
