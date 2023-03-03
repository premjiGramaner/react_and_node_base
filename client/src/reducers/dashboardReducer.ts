import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { reviseData } from '@Utils/validation'
import client from '@Utils/axiosConfig'

import { API, IDispatchState, IDashboardCardInterface } from '@Interface/index'

export const fetchDashboard: any = createAsyncThunk(
  'dashboardReducer/dashboardData',
  async () => {
    return new Promise((resolve: any) => {
      client
        .get(API.dashboard.projectCounts)
        .then(reviseData)
        .then((response: any) => {
          const data = response
          resolve({
            data: data || [],
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

export const fetchEdgeDetails: any = createAsyncThunk(
  'dashboardReducer/edgeDetails',
  async () => {
    return new Promise((resolve: any) => {
      client
        .get(API.dashboard.status)
        .then(reviseData)
        .then((response: any) => {
          const data = response
          resolve({
            data: data || [],
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

export const dashboardReducerInitialState: IDashboardCardInterface = {
  dashboardData: [],
  EdgeDetails: [],
}

const dashboardReducer = createSlice({
  name: 'dashboardReducer',
  initialState: dashboardReducerInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchDashboard.fulfilled,
      (state: IDashboardCardInterface, action: IDispatchState) => {
        state.dashboardData = action.payload.data.data
      }
    ),
      builder.addCase(
        fetchEdgeDetails.fulfilled,
        (state: IDashboardCardInterface, action: IDispatchState) => {
          state.EdgeDetails = action.payload.data.data.data
        }
      )
  },
})

export default dashboardReducer.reducer
