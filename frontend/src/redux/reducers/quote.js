import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
}

export const quoteReducer = createReducer(initialState, {
    quoteCreateRequest: (state) => {
        state.isLoading = true;
    },
    quoteCreateSuccess: (state, action) => {
        state.isLoading = false;
        state.quote = action.payload;
        state.success = true;
    },
    quoteCreateFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
    },

  // get all products of shop
//   getAllProductsShopRequest: (state) => {
//     state.isLoading = true;
//   },
//   getAllProductsShopSuccess: (state, action) => {
//     state.isLoading = false;
//     state.products = action.payload;
//   },
//   getAllProductsShopFailed: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//   },

  // delete product of a shop
//   deleteProductRequest: (state) => {
//    state.isLoading = true; 
//   },
//   deleteProductSuccess: (state,action) => {
//     state.isLoading = false;
//     state.message = action.payload;
//   },
//   deleteProductFailed: (state,action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//   },

   // get all products
//    getAllProductsRequest: (state) => {
//     state.isLoading = true;
//   },
//   getAllProductsSuccess: (state, action) => {
//     state.isLoading = false;
//     state.allProducts = action.payload;
//   },
//   getAllProductsFailed: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//   },
  
//   clearErrors: (state) => {
//     state.error = null;
//   },
});