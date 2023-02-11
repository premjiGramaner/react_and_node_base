import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { reviseData } from '@Utils/validation'
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
      resolve({
        edgeNodeDeviceList,
        edgeNodeInfo,
        tableData,
      }).catch((response: Error) => {
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
        state.edgeNodeInfo = action.payload.edgeNodeInfo
        state.edgeNodeDataList = action.payload.tableData
        state.deviceList = action.payload.edgeNodeDeviceList
      }
    )
  },
})

export default edgeNodeReducer.reducer
