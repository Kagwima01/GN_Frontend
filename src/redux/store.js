import { combineReducers, configureStore } from "@reduxjs/toolkit";

import product from "./slices/product";
import user from "./slices/user";
import filters from "./slices/filters";
import search from "./slices/search";
import admin from "./slices/admin";
import save from "./slices/save";
import sales from "./slices/sale";
import carousel from "./slices/carousel";

const reducer = combineReducers({
  product,
  user,
  admin,
  save,
  search,
  filters,
  sales,
  carousel,
});

export default configureStore({ reducer });
