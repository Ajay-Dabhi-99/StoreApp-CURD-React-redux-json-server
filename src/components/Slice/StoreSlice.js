import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  AddStore,
  DeleteStore,
  Register,
  SingleStore,
  fetchStore,
  logIn,
  updateStoreInfo,
} from "../../redux/services/storeServices";

const initialState = {};

// login user
export const logInUser = createAsyncThunk("auth/login", async () => {
  return await logIn();
});

// login user
export const RegisterUser = createAsyncThunk("auth/Register", async (payload) => {
  return await Register(payload);
});

// Store fetch Detail
export const fetchStoreDetails = createAsyncThunk(
  "store/storeDetails",
  async (id) => {
    return await fetchStore(id);
  }
);

// Single Store fetch Detail
export const singleStoreDetails = createAsyncThunk(
  "store/singleStoreDetail",
  async (id) => {
    return await SingleStore(id);
  }
);

// Single Store Update Detail
export const updateStoreDetails = createAsyncThunk(
  "store/updateStoreDetail",
  async ({ id, payload }) => {
    return await updateStoreInfo({ id, payload });
  }
);

// Single Store Add Detail
export const addStore = createAsyncThunk("store/addStore", async (payload) => {
  return await AddStore(payload);
});

// Delete Store
export const deleteStore = createAsyncThunk("store/deleteStore", async (id) => {
  return await DeleteStore(id);
});

const StoreSlice = createSlice({
  name: "storeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStoreDetails.fulfilled, (state, action) => {
      state.store = action?.payload?.data;
    });
  },
});
export default StoreSlice.reducer;

export const selectTodo = (state) => state.store;

export const useTodo = () => {
  const store = useSelector(selectTodo);
  return useMemo(() => store, [store]);
};
