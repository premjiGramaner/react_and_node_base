import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { reviseData } from '@Utils/validation'
import { API, IDispatchState, IDashboardCardInterface } from '@Interface/index'
import { dashboardPageData } from '@Store/mockStore/storeData/dashboardPageData'

export const fetchDashboard: any = createAsyncThunk(
  'dashboardReducer/dashboardData',
  async () => {
    return new Promise((resolve: any) => {
      resolve({
        dashboardPageData,
      }).catch((response: Error) => {
        const { data } = reviseData(response)
        console.log('API Failed!', data)
        resolve({ data: [] })
      })
    })
  }
)
export const dashboardReducerInitialState: IDashboardCardInterface = {
  dashboardData: [],
}

const dashboardReducer = createSlice({
  name: 'dashboardReducer',
  initialState: dashboardReducerInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchDashboard.fulfilled,
      (state: IDashboardCardInterface, action: IDispatchState) => {
        state.dashboardData = action.payload.dashboardPageData
      }
    )
  },
})

export default dashboardReducer.reducer
