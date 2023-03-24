import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "@Utils/axiosConfig";

import { reviseData } from "@Utils/validation";
import { API, ICoreReducerState, IDispatchState, APICommonResponseMock } from "@Interface/index";

export const fetchUsers: any = createAsyncThunk("coreReducer/fetchUsers", async () => {
    return new Promise((resolve: any) => {
        client.get(API.users.get)
            .then(reviseData)
            .then((response: any) => {
                const { data, error } = response;
                if (!error) {
                    resolve({
                        data: data || []
                    });
                }
            })
            .catch((response: Error) => {
                const { data } = reviseData(response);
                console.log("API Failed!", data);
                resolve({ data: [] })
            });
    });
});

export const updateUser = async (payload: any = {}) => {
    let urlInstance: any = null;
    if (payload.id) {
        urlInstance = client.put(API.users.update, payload);
    } else {
        urlInstance = client.post(API.users.create, payload)
    }

    const res: APICommonResponseMock = await urlInstance
        .then(reviseData)
        .then((response: any) => response)
        .catch((response: Error) => response);
    return res;
}

export const deleteUser = async (payload: any = {}) => {
    const res: APICommonResponseMock = await client.delete(API.users.delete + payload)
        .then(reviseData)
        .then((response: any) => response)
        .catch((response: Error) => response);
    return res;
}


export const coreReducerInitialState: ICoreReducerState = {
    userList: [],
    usersLoading: false,
};

const coreReducer = createSlice({
    name: "coreReducer",
    initialState: coreReducerInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state: ICoreReducerState, _action: IDispatchState) => {
            state.usersLoading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state: ICoreReducerState, action: IDispatchState) => {
            state.userList = action.payload.data;
            state.usersLoading = false;
        });
    }
})

export default coreReducer.reducer;
