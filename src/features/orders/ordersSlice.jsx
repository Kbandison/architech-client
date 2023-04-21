import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ordersService from "./ordersService";

const initialState = {
  orders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ordersService.getOrders(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (_, thunkAPI) => {
    try {
      return await ordersService.getAll();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (order, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ordersService.createOrder(order, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUserOrder = createAsyncThunk(
  "orders/getOrder",
  async (id, thunkAPI) => {
    try {
      return await ordersService.getOrder(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ordersService.deleteOrder(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const clearOrders = createAsyncThunk(
  "orders/clearOrders",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ordersService.clearOrders(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      /*******************************GET ORDERS*****************************/

      // PENDING
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })

      // FULFILLED
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload.orders;
      })

      // REJECTED
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /*******************************GET ALL ORDERS*****************************/

      // PENDING
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })

      // FULFILLED
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload.orders;
      })

      // REJECTED
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /*******************************CREATE ORDER*****************************/

      // PENDING
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })

      // FULFILLED
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = [...state.orders, action.payload];
      })

      // REJECTED
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /*******************************GET ORDER*****************************/

      // PENDING
      .addCase(getUserOrder.pending, (state) => {
        state.isLoading = true;
      })

      // FULFILLED
      .addCase(getUserOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = [...state.orders, action.payload];
      })

      // REJECTED
      .addCase(getUserOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /*******************************DELETE ORDER*****************************/

      // PENDING
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
      })

      // FULFILLED
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
      })

      // REJECTED
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /*******************************CLEAR ORDERS*****************************/

      // PENDING
      .addCase(clearOrders.pending, (state) => {
        state.isLoading = true;
      })

      // FULFILLED
      .addCase(clearOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = [];
      })

      // REJECTED
      .addCase(clearOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = ordersSlice.actions;
export default ordersSlice.reducer;
