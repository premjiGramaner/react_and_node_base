import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { reviseData } from '@Utils/validation'
import client, { fetchClient } from '@Utils/axiosConfig'
import { getClientAccessToken, getToken } from '@Utils/storage'

import {
  API,
  IDispatchState,
  IEdgeNodePageState,
  IEdgeNodeInfo,
} from '@Interface/index'

export const fetchEdgeNodeApp: any = createAsyncThunk(
  'edgeNodeAppInstancesReducer/edgeNodeAppData',
  async () => {
    return new Promise((resolve: any) => {
      fetchClient(getToken(), getClientAccessToken())
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
      fetchClient(getToken(), getClientAccessToken())
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

export const fetchEdgeNodeInfo: any = createAsyncThunk(
  'edgeAppInstanceReducer/edgeNodeInfo',
  async (edgeInfo: IEdgeNodeInfo) => {
    return new Promise((resolve: any) => {
      resolve({
        data: edgeInfo,
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
        state.edgeNodeDataList = action.payload.data.data.data
      }
    ),
      builder.addCase(
        fetchNetworkData.fulfilled,
        (state: IEdgeNodePageState, action: IDispatchState) => {}
      ),
      builder.addCase(
        fetchEdgeNodeInfo.fulfilled,
        (state: IEdgeNodePageState, action: IDispatchState) => {
          state.edgeNodeInfo = action.payload.data
        }
      )
  },
})

export default edgeNodeAppInstanceReducer.reducer
