import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { reviseData } from '@Utils/validation'
import client from '@Utils/axiosConfig'

import { API, IDispatchState, IEdgeNodePageState } from '@Interface/index'

export const fetchEdgeNodeApp: any = createAsyncThunk(
  'edgeNodeAppInstancesReducer/edgeNodeAppData',
  async () => {
    return new Promise((resolve: any) => {
      client
        .get(API.appInstance.edgeApps)
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

export const fetchNetworkData: any = createAsyncThunk(
  'edgeNodeAppInstancesReducer/networkData',
  async (id: string) => {
    return new Promise((resolve: any) => {
      client
        .get(`${API.appInstance.network}${id}`)
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

export const edgeNodeReducerInitialState: IEdgeNodePageState = {
  edgeNodeInfo: {},
  edgeNodeDataList: [],
  deviceList: [],
  networkList: [],
}

const edgeNodeAppInstanceReducer = createSlice({
  name: 'edgeNodeAppInstanceReducer',
  initialState: edgeNodeReducerInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchEdgeNodeApp.fulfilled,
      (state: IEdgeNodePageState, action: IDispatchState) => {
        // state.edgeNodeInfo = action.payload.data
        state.edgeNodeDataList = action.payload.data.data.data
        // state.deviceList = action.payload.edgeNodeDeviceList
        // state.networkList = action.payload.edgeAppInstanceData
      }
    ),
      builder.addCase(
        fetchNetworkData.fulfilled,
        (state: IEdgeNodePageState, action: IDispatchState) => {
          console.log('action', action)
        }
      )
  },
})

export default edgeNodeAppInstanceReducer.reducer
