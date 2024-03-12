import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  favorites: JSON.parse(localStorage.getItem("favorites")) ?? [],
};

const updateLocalStorage = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const savedSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    saveItemAdd: (state, { payload }) => {
      const existingItem = state.favorites.find(
        (item) => item.id === payload.id
      );

      if (existingItem) {
        state.favorites = state.favorites.map((item) =>
          item.id === existingItem.id ? payload : item
        );
      } else {
        state.favorites = [...state.favorites, payload];
      }
      state.loading = false;
      state.error = null;
      updateLocalStorage(state.favorites);
    },
    saveItemRemoval: (state, { payload }) => {
      state.favorites = [...state.favorites].filter(
        (item) => item.id !== payload
      );
      updateLocalStorage(state.favorites);
      state.loading = false;
      state.error = null;
    },
    clearSave: (state) => {
      localStorage.removeItem("favorites");
      state.favorites = [];
      state.loading = false;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setError, clearSave, saveItemAdd, saveItemRemoval } =
  savedSlice.actions;
export default savedSlice.reducer;

export const savedSelector = (state) => state.save;
