import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import client from '@Utils/axiosConfig'

import { reviseData } from '@Utils/validation'
import { API, ICoreReducerState, IDispatchState } from '@Interface/index'

export const fetchUsers: any = createAsyncThunk(
  'coreReducer/fetchUsers',
  async () => {
    return new Promise((resolve: any) => {
      client
        .get(API.users.get)
        .then(reviseData)
        .then((response: any) => {
          const { data, error } = response
          if (!error) {
            resolve({
              data: data || [],
            })
          }
        })
        .catch((response: Error) => {
          const { data } = reviseData(response)
          console.log('API Failed!', data)
          resolve({ data: [] })
        })
    })
  }
)

export const coreReducerInitialState: ICoreReducerState = {
  userList: [],
  usersLoading: false,
}

const coreReducer = createSlice({
  name: 'coreReducer',
  initialState: coreReducerInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, (state: ICoreReducerState) => {
      state.usersLoading = true
    })
    builder.addCase(
      fetchUsers.fulfilled,
      (state: ICoreReducerState, action: IDispatchState) => {
        state.userList = action.payload.data
        state.usersLoading = false
      }
    )
  },
})

export default coreReducer.reducer
