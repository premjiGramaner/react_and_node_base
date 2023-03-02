import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { reviseData } from '@Utils/validation'
import client from '@Utils/axiosConfig'

import {
  API,
  IDispatchState,
  IEdgeNodePageState,
  IEdgeNodeInfo,
} from '@Interface/index'

export const fetchEdgeNode: any = createAsyncThunk(
  'edgeNodeReducer/edgeNodeData',
  async (params: string) => {
    return new Promise((resolve: any) => {
      client
        .get(`${API.edgeNode.edgeNodes}${params}`)
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

export const fetchProjectInfo: any = createAsyncThunk(
  'edgeNodeReducer/edgeProjectName',
  async (projectInfo: IEdgeNodeInfo) => {
    return new Promise((resolve: any) => {
      resolve({
        data: projectInfo,
      })
    })
  }
)

export const downloadScript: any = createAsyncThunk(
  'edgeNodeReducer/downloadScript',
  async (id: string) => {
    return new Promise((resolve: any) => {
      client
        .get(`${API.edgeNode.downloadScript}${id}`)
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
  edgeNodeInfo: { title: '', edgeNodesCount: null },
  edgeNodeDataList: [],
  deviceList: [],
}

const edgeNodeReducer = createSlice({
  name: 'edgeNodeReducer',
  initialState: edgeNodeReducerInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchEdgeNode.fulfilled,
      (state: IEdgeNodePageState, action: IDispatchState) => {
        state.deviceList = action.payload.data.data.data
      }
    ),
      builder.addCase(
        fetchProjectInfo.fulfilled,
        (state: IEdgeNodePageState, action: IDispatchState) => {
          console.log('action', action.payload)
          state.edgeNodeInfo.title = action.payload?.data?.title
        }
      )
  },
})

export default edgeNodeReducer.reducer
