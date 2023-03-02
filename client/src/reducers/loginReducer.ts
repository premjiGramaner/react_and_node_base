import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { reviseData } from '@Utils/validation'
import client from '@Utils/axiosConfig'

import {
  API,
  ILoginReducerState,
  IDispatchState,
  ILoginState,
} from '@Interface/index'
import { getClientAccessToken, getToken } from '@Utils/storage'
import { action } from 'typesafe-actions'

export const userLogin: any = createAsyncThunk(
  'loginReducer/login',
  async (loginPayload: ILoginState) => {
    return new Promise((resolve: any) => {
      client
        .post(API.users.create, loginPayload)
        .then(reviseData)
        .then((response: any) => {
          const data = response
          if (!data.error) {
            resolve({
              data: data || [],
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

export const userLogout: any = createAsyncThunk(
  'loginReducer/logout',
  async () => {
    return new Promise((resolve: any) => {
      client
        .post(API.users.logout)
        .then(reviseData)
        .then((response: any) => {
          resolve({
            loginReducerInitialState,
          })
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
      (state: ILoginReducerState, action: IDispatchState) => {
        state.pending = true
      }
    )
    builder.addCase(
      userLogin.fulfilled,
      (state: ILoginReducerState, action: IDispatchState) => {
        getClientAccessToken(action.payload.data?.data?.data?.token.base64)
        getToken(action.payload.data?.data?.loginToken)
        sessionStorage.setItem(
          'userName',
          action.payload.data.data.data.detailedUser.firstName
        )
        state.token = action.payload.data?.data?.loginToken
        state.userName = action.payload.data.data.data.detailedUser.firstName
        state.pending = false
        state.statusCode = action.payload.data.statusCode
        state.userId = action.payload.data.data.data.userId
      }
    )
    builder.addCase(
      userLogout.fulfilled,
      (state: ILoginReducerState, action: IDispatchState) => {
        state.pending = action.payload.loginReducerInitialState.pending
        state.statusCode = action.payload.loginReducerInitialState.statusCode
        state.token = action.payload.loginReducerInitialState.token
        state.userId = action.payload.loginReducerInitialState.userId
        state.userName = action.payload.loginReducerInitialState.userName
      }
    )
  },
})

export default loginReducer.reducer
