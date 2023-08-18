import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
}

export const trendReducer = createReducer(initialState, {
    trendCreateRequest: (state) => {
        state.isLoading = true;
    },
    trendCreateSuccess: (state, action) => {
        state.isLoading = false;
        state.trend = action.payload;
        state.success = true;
    },
    trendCreateFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
    },

  // get all trends of shop
  getAllTrendsShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllTrendsShopSuccess: (state, action) => {
    state.isLoading = false;
    state.trends = action.payload;
  },
  getAllTrendsShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // delete trend of a shop
  deleteTrendRequest: (state) => {
   state.isLoading = true; 
  },
  deleteTrendSuccess: (state,action) => {
    state.isLoading = false;  
    state.message = action.payload;
  },
  deleteTrendFailed: (state,action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

    // get all trends
    getAllTrendsRequest: (state) => {
      state.isLoading = true;
    },
    getAllTrendsSuccess: (state, action) => {
      state.isLoading = false;
      state.allTrends = action.payload;
    },
    getAllTrendsFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

  clearErrors: (state) => {
    state.error = null;
  },
});