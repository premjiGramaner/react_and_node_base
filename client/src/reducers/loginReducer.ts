import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { URLS } from '@Utils/constants';

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

  async (loginPayload: ILoginState, { rejectWithValue }) => {
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
          resolve(
            rejectWithValue({
              error: reviseData(response),
              loginReducerInitialState,
            })
          )
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
  message: '',
  userId: '',
  detailedUserId: '',
  isUserTermAgreed: false,
  logoutStatusCode: null,
  statusResult: false,
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
        state.statusResult = false
      }
    )
    builder.addCase(
      userLogin.fulfilled,
      (state: ILoginReducerState, action: IDispatchState) => {
        state.token = action.payload.data?.data?.loginToken
        state.isUserTermAgreed = action.payload.data?.data?.isUserTermAgreed
        state.pending = false
        state.statusCode = action.payload.data.statusCode
        state.message = action?.payload?.message
        state.userId = action.payload.data?.data?.userId
        state.detailedUserId = action.payload.data?.data?.data?.detailedUser.id
        state.logoutStatusCode =
          action.payload.loginReducerInitialState.logoutStatusCode
      }
    )
    builder.addCase(
      userLogin.rejected,
      (state: ILoginReducerState, action: IDispatchState) => {
        state.statusCode = 400
        state.pending = false
        state.message = action?.payload?.error?.message
      }
    )
    builder.addCase(
      userLogout.fulfilled,
      (state: ILoginReducerState, action: IDispatchState) => {
        state.logoutStatusCode = action.payload.data.data.statusCode
        state.pending = action.payload.loginReducerInitialState.pending
        state.statusCode = action.payload.loginReducerInitialState.statusCode
        state.token = action.payload.loginReducerInitialState.token
        state.userId = action.payload.loginReducerInitialState.userId
        state.userName = action.payload.loginReducerInitialState.userName
        IS_USER_AUTHENTICATED(false)
        state.statusResult = false
        window.location.href = URLS.LOGIN;
      }
    )
    builder.addCase(userLogout.rejected, (state: ILoginReducerState) => {
      state.statusResult = true
    })
  },
})

export default loginReducer.reducer
