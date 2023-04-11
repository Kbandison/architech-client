import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
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

export const getItem = createAsyncThunk(
  "products/getItem",
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
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

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
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

export const getCart = createAsyncThunk(
  "products/getCart",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await productService.getCart(token);
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

export const addCart = createAsyncThunk(
  "products/addCart",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await productService.addCart(id, token);
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

export const removeCart = createAsyncThunk(
  "products/removeCart",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await productService.removeCart(id, token);
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

export const getOrderHistory = createAsyncThunk(
  "products/getOrderHistory",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await productService.getHistory(token);
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

export const addToHistory = createAsyncThunk(
  "products/addToHistory",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await productService.addHistory(id, token);
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

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      /************************GET PRODUCTS BUILDERS*******************/

      // PENDING
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })

      // FULFILLED
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })

      // REJECTED
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /************************GET SINGLE PRODUCT BUILDERS*******************/

      // PENDING
      .addCase(getItem.pending, (state) => {
        state.isLoading = true;
      })

      // FULFILLED
      .addCase(getItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })

      // REJECTED
      .addCase(getItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /************************DELETE PRODUCT BUILDERS*******************/

      // PENDING
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })

      // FULFILLED
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })

      // REJECTED
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /************************GET CART BUILDERS*******************/

      // PENDING
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })

      // FULFILLED
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })

      // REJECTED
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /************************ADD TO CART BUILDERS*******************/

      // PENDING
      .addCase(addCart.pending, (state) => {
        state.isLoading = true;
      })

      // FULFILLED
      .addCase(addCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products.push(action.payload);
      })

      // REJECTED
      .addCase(addCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /************************REMOVE FROM CART BUILDERS*******************/

      // PENDING
      .addCase(removeCart.pending, (state) => {
        state.isLoading = true;
      })

      // FULFILLED
      .addCase(removeCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = state.products.filter(
          (product) => product._id !== action.payload.id
        );
      })

      // REJECTED
      .addCase(removeCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /************************GET ORDER HISTORY BUILDERS*******************/

      // PENDING
      .addCase(getOrderHistory.pending, (state) => {
        state.isLoading = true;
      })

      // FULFILLED
      .addCase(getOrderHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })

      // REJECTED
      .addCase(getOrderHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /************************ADD TO ORDER HISTORY BUILDERS*******************/

      // PENDING
      .addCase(addToHistory.pending, (state) => {
        state.isLoading = true;
      })

      // FULFILLED
      .addCase(addToHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products.push(action.payload);
      })

      // REJECTED
      .addCase(addToHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
