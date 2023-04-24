import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import fileDownload from 'js-file-download'

import { reviseData } from '@Utils/validation'
import { fetchClient } from '@Utils/axiosConfig'
import { getClientAccessToken, getToken } from '@Utils/storage'

import {
  API,
  IDispatchState,
  IEdgeNodePageState,
  IEdgeNodeInfo,
} from '@Interface/index'

export const fetchEdgeNode: any = createAsyncThunk(
  'edgeNodeReducer/edgeNodeData',
  async (title: string) => {
    return new Promise((resolve: any, reject: any) => {
      fetchClient(getToken(), getClientAccessToken())
        .get(`${API.edgeNode.edgeNodes}${title}`)
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

export const downloadScript: any = createAsyncThunk(
  'edgeNodeReducer/downloadScript',
  async (id: string) => {
    return new Promise((resolve: any, reject: any) => {
      fetchClient(getToken(), getClientAccessToken())
        .get(`${API.edgeNode.downloadScript}${id}`)
        .then(reviseData)
        .then((response: any) => {
          const data = response
          fileDownload(
            data.data.data.client_script,
            data.data.data.script_filename
          ),
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

export const sessionStatus: any = createAsyncThunk(
  'edgeNodeReducer/sessionStatus',
  async (status: string) => {
    return new Promise((resolve: any, reject: any) => {
      fetchClient(getToken(), getClientAccessToken())
        .put(`${API.edgeNode.sessionStatus}${status}`)
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

export const fetchEdgeViewStatus: any = createAsyncThunk(
  'edgeNodeReducer/edgeViewStatus',
  async (id: string) => {
    return new Promise((resolve: any, reject: any) => {
      fetchClient(getToken(), getClientAccessToken())
        .get(`${API.edgeNode.edgeViewStatus.replace(':id', id)}`)
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

export const edgeNodeReducerInitialState: IEdgeNodePageState = {
  edgeNodeInfo: { title: '', edgeNodesCount: null },
  edgeSessionStatus: '',
  sessionPending: false,
  edgeNodePending: false,
  statusPending: false,
  statusResult: false,
}

const edgeNodeReducer = createSlice({
  name: 'edgeNodeReducer',
  initialState: edgeNodeReducerInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchEdgeNode.pending, (state: IEdgeNodePageState) => {
      state.edgeNodePending = true
      state.statusResult = false
    }),
      builder.addCase(
        fetchEdgeNode.fulfilled,
        (state: IEdgeNodePageState, action: IDispatchState) => {
          state.deviceList = action.payload.data.data.data
          state.edgeNodePending = false
          state.statusResult = false
        }
      ),
      builder.addCase(fetchEdgeNode.rejected, (state: IEdgeNodePageState) => {
        state.statusResult = true
      }),
      builder.addCase(
        fetchProjectInfo.fulfilled,
        (state: IEdgeNodePageState, action: IDispatchState) => {
          state.edgeNodeInfo = action.payload.data
          state.statusResult = false
        }
      )
    builder.addCase(
      fetchEdgeViewStatus.pending,
      (state: IEdgeNodePageState) => {
        state.statusPending = true
        state.statusResult = false
      }
    )
    builder.addCase(
      fetchEdgeViewStatus.fulfilled,
      (state: IEdgeNodePageState, action: IDispatchState) => {
        state.edgeSessionStatus = action.payload.data.data.data.state
        state.statusPending = false
        state.statusResult = false
      }
    )
    builder.addCase(
      fetchEdgeViewStatus.rejected,
      (state: IEdgeNodePageState) => {
        state.statusResult = true
      }
    )
    builder.addCase(sessionStatus.pending, (state: IEdgeNodePageState) => {
      state.sessionPending = true
      state.statusResult = false
    })
    builder.addCase(sessionStatus.fulfilled, (state: IEdgeNodePageState) => {
      state.sessionPending = false
      state.statusResult = false
    })
    builder.addCase(sessionStatus.rejected, (state: IEdgeNodePageState) => {
      state.statusResult = true
    })
  },
})

export default edgeNodeReducer.reducer
