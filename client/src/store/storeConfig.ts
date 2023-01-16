import thunk from 'redux-thunk'
import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "@Reducers/index";

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

export default store;
