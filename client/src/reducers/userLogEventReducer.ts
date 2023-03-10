import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import client from '@Utils/axiosConfig'

import { reviseData } from '@Utils/validation'
import {
  IUserEventLogInterface,
  IUserEventLogData,
  IDispatchState,
} from '@Interface/index'

export const fetchUserEvents: any = createAsyncThunk(
  'userEevntReducer/userInfo',
  async (userLogs: IUserEventLogData) => {
    return new Promise((resolve: any) => {
      resolve({
        data: userLogs,
      })
    })
  }
)

export const userLogEventsInitialState: IUserEventLogInterface = {
  userEventLogData: [],
}

const userLogEventReducer = createSlice({
  name: 'userLogEventReducer',
  initialState: userLogEventsInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchUserEvents.fulfilled,
      (state: IUserEventLogInterface, action: IDispatchState) => {
        state.userEventLogData = action.payload.data
        sessionStorage.setItem(
          'userEventLogs',
          JSON.stringify([
            ...JSON.parse(sessionStorage.getItem('userEventLogs')),
            action.payload.data,
          ])
        )
      }
    )
  },
})

export default userLogEventReducer.reducer
