import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { reviseData } from '@Utils/validation'
import { API, IDispatchState, IEdgeNodePageState } from '@Interface/index'
import {
  edgeAppInstanceData,
  edgeNodeDeviceList,
  tableData,
  edgeNodeAppInfo,
} from '@Store/mockStore/storeData/edgeAppInstancesMock'

export const fetchEdgeNodeApp: any = createAsyncThunk(
  'edgeNodeAppInstancesReducer/edgeNodeAppData',
  async () => {
    return new Promise((resolve: any) => {
      resolve({
        edgeAppInstanceData,
        edgeNodeDeviceList,
        tableData,
        edgeNodeAppInfo,
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
        state.edgeNodeInfo = action.payload.edgeNodeAppInfo
        state.edgeNodeDataList = action.payload.tableData
        state.deviceList = action.payload.edgeNodeDeviceList
        state.networkList = action.payload.edgeAppInstanceData
      }
    )
  },
})

export default edgeNodeAppInstanceReducer.reducer
