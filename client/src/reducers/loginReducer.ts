import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { reviseData } from '@Utils/validation'
import client from '@Utils/axiosConfig'

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
      client
        .post(API.users.create, loginPayload)
        .then(reviseData)
        .then((response: any) => {
          const { data, error } = response
          if (!error) {
            resolve({
              data: response.data || [],
            })
          }
        })
        .catch((response: Error) => {
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
  statusCode: null,
  userId: '',
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
        state.token = action.payload.data.token.base64
        state.userName = action.payload.data.detailedUser.firstName
        state.pending = false
        state.statusCode = action.payload.statusCode
        state.userId = action.payload.data.userId
      }
    )
  },
})

export default loginReducer.reducer
