import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { reviseData } from '@Utils/validation'
import client, { fetchClient } from '@Utils/axiosConfig'
import {
  API,
  ILoginReducerState,
  IDispatchState,
  ILoginState,
} from '@Interface/index'
import {
  getClientAccessToken,
  getToken,
  IS_USER_AUTHENTICATED,
} from '@Utils/storage'

export const userLogin: any = createAsyncThunk(
  'loginReducer/login',
  async (loginPayload: ILoginState) => {
    return new Promise((resolve: any, reject: any) => {
      client
        .post(
          loginPayload.token ? API.users.tokenLogin : API.users.create,
          loginPayload
        )
        .then(reviseData)
        .then((response: any) => {
          const data = response

          if (!data.error) {
            getClientAccessToken(data?.data?.data?.token?.base64)
            getToken(data?.data?.loginToken)
            sessionStorage.setItem(
              'userName',
              data?.data?.data?.detailedUser?.firstName || ''
            )
            resolve({
              data: data || [],
              loginReducerInitialState,
            })
          }
        })
        .catch((response: Error) => {
          reject({ error: reviseData(response), loginReducerInitialState })
        })
    })
  }
)

export const userLogout: any = createAsyncThunk(
  'loginReducer/logout',
  async () => {
    return new Promise(async (resolve: any, reject: any) => {
      await fetchClient(getToken(), getClientAccessToken())
        .post(API.users.logout)
        .then(reviseData)
        .then((response: any) => {
          const data = response
          resolve({
            data: data || [],
            loginReducerInitialState,
          })
        })
        .catch((response: Error) => {
          const { data } = reviseData(response)
          console.log('API Failed!', data)
          reject({
            data: data,
          })
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
  logoutStatusCode: null,
  statusResult: false,
}

const loginReducer = createSlice({
  name: 'loginReducer',
  initialState: loginReducerInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(userLogin.pending, (state: ILoginReducerState) => {
      state.pending = true
      state.statusResult = false
    })
    builder.addCase(
      userLogin.fulfilled,
      (state: ILoginReducerState, action: IDispatchState) => {
        state.token = action.payload.data?.data?.loginToken
        state.pending = false
        state.statusCode = action.payload.data.statusCode
        state.userId = action.payload.data?.data?.userId
        state.logoutStatusCode =
          action.payload.loginReducerInitialState.logoutStatusCode
      }
    )
    builder.addCase(userLogin.rejected, (state: ILoginReducerState) => {
      state.statusCode = 400
      state.pending = false
    })
    builder.addCase(
      userLogout.fulfilled,
      (state: ILoginReducerState, action: IDispatchState) => {
        state.logoutStatusCode = action.payload.data.data.statusCode
        state.pending = action.payload.loginReducerInitialState.pending
        state.statusCode = action.payload.loginReducerInitialState.statusCode
        state.token = action.payload.loginReducerInitialState.token
        state.userId = action.payload.loginReducerInitialState.userId
        state.userName = action.payload.loginReducerInitialState.userName
        sessionStorage.clear()
        IS_USER_AUTHENTICATED(false)
        localStorage.clear()
        state.statusResult = false
      }
    )
    builder.addCase(userLogout.rejected, (state: ILoginReducerState) => {
      state.statusResult = true
    })
  },
})

export default loginReducer.reducer
