import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { reviseData } from '@Utils/validation'
import client from '@Utils/axiosConfig'

import { API, IDispatchState, IEdgeNodePageState } from '@Interface/index'
import {
  edgeNodeDeviceList,
  edgeNodeInfo,
  tableData,
} from '@Store/mockStore/storeData/edgeNodesStoreMock'

export const fetchEdgeNode: any = createAsyncThunk(
  'edgeNodeReducer/edgeNodeData',
  async () => {
    return new Promise((resolve: any) => {
      client
        .get(API.edgeNode.edgeNodes)
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
}

const edgeNodeReducer = createSlice({
  name: 'edgeNodeReducer',
  initialState: edgeNodeReducerInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchEdgeNode.fulfilled,
      (state: IEdgeNodePageState, action: IDispatchState) => {
        state.deviceList = action.payload.data.data.data.list
      }
    )
  },
})

export default edgeNodeReducer.reducer
