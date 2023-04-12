import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ordersService from "./ordersService";

const initialState = {
  orders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const ordersSlice = createSlice({});

export const { reset } = ordersSlice.actions;
export default ordersSlice.reducer;
