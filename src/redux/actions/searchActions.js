import axios from "axios";
import { setError, setLoading, setSearchProducts } from "../slices/search";

export const getSearchProducts = (key) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`/api/products/search/${key}`);
    dispatch(setSearchProducts(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected Error occured"
      )
    );
  }
};
