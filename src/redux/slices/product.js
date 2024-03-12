import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  products: [],
  product: null,
  pagination: {},
  favoritesToggled: false,
  favorites: JSON.parse(localStorage.getItem("favorites")) ?? [],
  productUpdate: false,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setProducts: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.products = payload;
    },
    setProduct: (state, { payload }) => {
      state.product = payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    setPagination: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.pagination = payload;
    },
    setFavorites: (state, { payload }) => {
      state.favorites = payload;
    },
    setFavoritesToggle: (state, { payload }) => {
      state.favoritesToggled = payload;
    },
    resetError: (state) => {
      state.error = null;
      state.productUpdate = false;
    },
    setProductUpdateFlag: (state) => {
      state.productUpdate = true;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setError,
  setProducts,
  setPagination,
  setFavoritesToggle,
  setFavorites,
  setProduct,
  setProductUpdateFlag,
  resetError,
} = productsSlice.actions;

export default productsSlice.reducer;

export const productSelector = (state) => state.products;
