import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllUsers = createAsyncThunk(
  "users/getUsers",
  async (_, thunkAPI) => {
    try {
      return await userService.getUsers();
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

export const getAUser = createAsyncThunk(
  "users/getUser",
  async (id, thunkAPI) => {
    try {
      return await userService.getUser(id);
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

export const updateAUser = createAsyncThunk(
  "users/updateUser",
  async (user, thunkAPI) => {
    try {
      return await userService.updateUser(user);
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

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkAPI) => {
    try {
      return await userService.deleteUser(id);
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

export const deleteAllUser = createAsyncThunk(
  "users/deleteAllUser",
  async (_, thunkAPI) => {
    try {
      return await userService.deleteAllUsers();
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

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      /**********************GET USERS*********************/

      // PENDING
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })

      // FULFILLED
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })

      // REJECTED
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /**********************GET A USER*********************/

      // PENDING
      .addCase(getAUser.pending, (state) => {
        state.isLoading = true;
      })

      // FULFILLED
      .addCase(getAUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })

      // REJECTED
      .addCase(getAUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /**********************UPDATE A USER*********************/

      // PENDING
      .addCase(updateAUser.pending, (state) => {
        state.isLoading = true;
      })

      // FULFILLED
      .addCase(updateAUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })

      // REJECTED
      .addCase(updateAUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /**********************DELETE A USER*********************/

      // PENDING
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })

      // FULFILLED
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })

      // REJECTED
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /**********************DELETE ALL USERS*********************/

      // PENDING
      .addCase(deleteAllUser.pending, (state) => {
        state.isLoading = true;
      })

      // FULFILLED
      .addCase(deleteAllUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })

      // REJECTED
      .addCase(deleteAllUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
