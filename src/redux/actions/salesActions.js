import axios from "axios";
import {
  setError,
  setLoading,
  salesItemAdd,
  salesItemRemoval,
  clearSales,
} from "../slices/sale";

export const addSalesItem = (id, qty) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    const itemToAdd = {
      id: data._id,
      name: data.name,
      image: data.images[0],
      price: data.sellingPrice,
      stock: data.stock,
      brand: data.brand,
      qty,
    };
    dispatch(salesItemAdd(itemToAdd));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An expected error has occured. Please try again later."
      )
    );
  }
};

export const removeSalesItem = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(salesItemRemoval(id));
};
export const resetSales = () => (dispatch) => {
  dispatch(clearSales);
};
