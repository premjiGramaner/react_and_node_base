import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '@Reducers/index'


const persistConfig = {
  key: 'zed-root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

 
export default () => {
  const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
  })

  let persistor = persistStore(store)
  return { store, persistor };
}
