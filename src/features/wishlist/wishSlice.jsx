import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wishService from "./wishService";

const initialState = {
  wishlist: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getWishlist = createAsyncThunk(
  "wish/getWishlist",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await wishService.getWishes(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wish/addWishItem",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return wishService.addWishItem(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wish/removeWishItem",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await wishService.removeWishItem(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const clearWishlist = createAsyncThunk(
  "wish/clearWishlist",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await wishService.clearWishlist(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const wishSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      /************************GET WISHLIST ITEMS**********************/

      // PENDING
      .addCase(getWishlist.pending, (state) => {
        state.isLoading = true;
      })

      // FULFILLED
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
      })

      // REJECTED
      .addCase(getWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /************************ADD WISHLIST ITEM**********************/

      // PENDING
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
      })

      // FULFILLED
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.wishlist.push(action.payload);
      })

      // REJECTED
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /************************REMOVE WISHLIST ITEM**********************/

      // PENDING
      .addCase(removeFromWishlist.pending, (state) => {
        state.isLoading = true;
      })

      // FULFILLED
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
      })

      // REJECTED
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /************************CLEAR WISHLIST**********************/

      // PENDING
      .addCase(clearWishlist.pending, (state) => {
        state.isLoading = true;
      })

      // FULFILLED
      .addCase(clearWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
      })

      // REJECTED
      .addCase(clearWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = wishSlice.actions;
export default wishSlice.reducer;
