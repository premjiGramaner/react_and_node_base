import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { reviseData } from '@Utils/validation'
import { fetchClient } from '@Utils/axiosConfig'

import { API, IDispatchState, IDashboardCardInterface } from '@Interface/index'
import { getClientAccessToken, getToken } from '@Utils/storage'

export const fetchDashboard: any = createAsyncThunk(
  'dashboardReducer/dashboardData',
  async () => {
    return new Promise((resolve: any, reject: any) => {
      fetchClient(getToken(), getClientAccessToken())
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
          reject({
            data: data,
          })
        })
    })
  }
)

export const termsAndServices: any = createAsyncThunk(
  'dashboardReducer/TermsAndServicesData',
  async (termsServicePayload: any, { rejectWithValue }) => {
    return new Promise((resolve: any, reject: any) => {
      fetchClient(getToken(), getClientAccessToken())
        .post(API.dashboard.termsService, termsServicePayload)
        .then(reviseData)
        .then((response: any) => {
          resolve({
            data: !!(response?.data?.data?.status[1] || 0),
          })
        })

        .catch((response: Error) => {
          resolve(
            rejectWithValue({
              error: reviseData(response),
            })
          )
        })
    })
  }
)

export const fetchEdgeDetails: any = createAsyncThunk(
  'dashboardReducer/edgeDetails',
  async () => {
    return new Promise(async (resolve: any, reject: any) => {
      await fetchClient(getToken(), getClientAccessToken())
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
          reject({
            data: data,
          })
        })
    })
  }
)

export const dashboardReducerInitialState: IDashboardCardInterface = {
  dashboardData: [],
  EdgeDetails: [],
  dashboardPending: false,
  statusResult: false,
  agreedTermsAndService: false,
}

const dashboardReducer = createSlice({
  name: 'dashboardReducer',
  initialState: dashboardReducerInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchDashboard.pending,
      (state: IDashboardCardInterface) => {
        state.dashboardPending = true
        state.statusResult = false
      }
    ),
      builder.addCase(
        fetchDashboard.fulfilled,
        (state: IDashboardCardInterface, action: IDispatchState) => {
          state.dashboardData = action.payload?.data?.data
          state.dashboardPending = false
          state.statusResult = false
        }
      ),
      builder.addCase(
        fetchDashboard.rejected,
        (state: IDashboardCardInterface) => {
          state.statusResult = true
          state.dashboardPending = false
        }
      ),
      builder.addCase(
        fetchEdgeDetails.fulfilled,
        (state: IDashboardCardInterface, action: IDispatchState) => {
          state.EdgeDetails = action.payload?.data?.data?.data
          state.statusResult = false
        }
      ),
      builder.addCase(
        termsAndServices.rejected,
        (state: IDashboardCardInterface, action: IDispatchState) => {
          state.agreedTermsAndService = false
        }
      ),
      builder.addCase(
        termsAndServices.fulfilled,
        (state: IDashboardCardInterface, action: IDispatchState) => {
          state.agreedTermsAndService = action.payload?.data
        }
      )
  },
})

export default dashboardReducer.reducer
