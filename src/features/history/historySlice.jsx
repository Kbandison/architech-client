import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import historyService from "./historyService";

const initialState = {
  history: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getUserHistory = createAsyncThunk(
  "history/getUserHistory",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await historyService.getUserHistory(token);
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

export const getAllHistory = createAsyncThunk(
  "history/getAllHistory",
  async (_, thunkAPI) => {
    try {
      return await historyService.getAllHistory();
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

export const addHistory = createAsyncThunk(
  "history/addHistory",
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token;
      return await historyService.addHistory(id);
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

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      /********************************GET USER HISTORY****************************/

      // PENDING
      .addCase(getUserHistory.pending, (state) => {
        state.isLoading = true;
      })

      // FULFILLED
      .addCase(getUserHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.history = action.payload;
      })

      // REJECTED
      .addCase(getUserHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /********************************GET ALL HISTORY****************************/

      // PENDING
      .addCase(getAllHistory.pending, (state) => {
        state.isLoading = true;
      })

      // FULFILLED

      .addCase(getAllHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.history = action.payload;
      })

      // REJECTED
      .addCase(getAllHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /********************************ADD HISTORY****************************/

      // PENDING
      .addCase(
        addHistory.pending,
        (state) => {
          state.isLoading = true;
        }

        // FULFILLED
      )
      .addCase(addHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.history = action.payload.history;
      })

      // REJECTED
      .addCase(addHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = historySlice.actions;
export default historySlice.reducer;
