import { createSlice } from "@reduxjs/toolkit";

const calculateSubtotal = (salesState) => {
  let result = 0;
  salesState.map((item) => (result += item.qty * item.price));
  return result;
};

const updateLocalStorage = (sales) => {
  localStorage.setItem("salesItems", JSON.stringify(sales));
  localStorage.setItem("subtotal", JSON.stringify(calculateSubtotal(sales)));
};

export const initialState = {
  loading: false,
  error: null,
  salesItems: JSON.parse(localStorage.getItem("salesItems")) ?? [],
  subtotal: localStorage.getItem("salesItems")
    ? calculateSubtotal(JSON.parse(localStorage.getItem("salesItems")))
    : 0,
};

export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    salesItemAdd: (state, { payload }) => {
      const existingItem = state.salesItems.find(
        (item) => item.id === payload.id
      );
      if (existingItem) {
        state.salesItems = state.salesItems.map((item) =>
          item.id === existingItem.id ? payload : item
        );
      } else {
        state.salesItems = [...state.salesItems, payload];
      }
      state.loading = false;
      state.error = null;
      updateLocalStorage(state.salesItems);
      state.subtotal = Number(calculateSubtotal(state.salesItems));
    },
    salesItemRemoval: (state, { payload }) => {
      state.salesItems = [...state.salesItems].filter(
        (item) => item.id !== payload
      );
      updateLocalStorage(state.salesItems);
      state.subtotal = calculateSubtotal(state.salesItems);
      state.loading = false;
      state.error = null;
    },
    clearSales: (state) => {
      localStorage.removeItem("salesItems");
      state.salesItems = [];
      state.subtotal = 0;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setError,
  setLoading,
  salesItemAdd,
  salesItemRemoval,
  clearSales,
} = salesSlice.actions;
export default salesSlice.reducer;
export const salesSelector = (state) => state.sales;
