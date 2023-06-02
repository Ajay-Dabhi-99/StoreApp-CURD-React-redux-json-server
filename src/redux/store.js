import { combineReducers, configureStore } from "@reduxjs/toolkit";
import StoreSlice from "../components/Slice/StoreSlice";

const combineReducer = combineReducers({
  storeSlices: StoreSlice,
});

const store = configureStore({
  reducer: combineReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(),
});

export default store;
