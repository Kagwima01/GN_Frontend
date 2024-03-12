import {
  setProducts,
  setLoading,
  setError,
  setPagination,
  setFavorites,
  setFavoritesToggle,
  setProduct,
  resetError,
} from "../slices/product";
import axios from "axios";
import { ipAddress } from "../../constants";

export const getProducts = (page) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const { data } = await axios.get(`${ipAddress}/api/products/${page}/${24}`);
    const { products, pagination } = data;
    dispatch(setProducts(products));
    dispatch(setPagination(pagination));
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

export const getOutOfStock = (stock) => async (dispatch, getState) => {
  dispatch(setLoading());
  const {
    user: { userInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await axios.get(
      `${ipAddress}/api/products/out/${stock}`,
      config
    );
    const products = data;
    dispatch(setProducts(products));
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

export const addToFavorites = (id) => async (dispatch, getState) => {
  const {
    product: { favorites },
  } = getState();

  const newFavorites = [...favorites, id];
  localStorage.setItem("favorites", JSON.stringify(newFavorites));
  dispatch(setFavorites(newFavorites));
};

export const removeFromFavorites = (id) => async (dispatch, getState) => {
  const {
    product: { favorites },
  } = getState();

  const newFavorites = favorites.filter((favoriteId) => favoriteId !== id);
  localStorage.setItem("favorites", JSON.stringify(newFavorites));
  dispatch(setFavorites(newFavorites));
};

export const toggleFavorites = (toggle) => async (dispatch, getState) => {
  const {
    product: { favorites, products },
  } = getState();

  if (toggle) {
    const filteredProducts = products.filter((product) =>
      favorites.includes(product._id)
    );
    dispatch(setFavoritesToggle(toggle));
    dispatch(setProducts(filteredProducts));
  } else {
    dispatch(setFavoritesToggle(false));
    dispatch(getProducts(1));
  }
};

export const getProduct = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`${ipAddress}/api/products/${id}`);
    dispatch(setProduct(data));
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

export const resetProductError = () => async (dispatch) => {
  dispatch(resetError());
};
