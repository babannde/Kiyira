import axios from "axios";
import { server } from "../../server";

// create trend
export const createTrend = (newForm) => async (dispatch) => {
    try {
        dispatch({
            type: "trendCreateRequest",
        });

        const config = {headers: {"Content-Type":"multipart/form-data"}};

        const {data} = await axios.post(
            `${server}/trend/create-trend`,
            newForm,
            config
        );
        dispatch({
            type: "trendCreateSuccess",
            payload: data.trends,
        });
    } catch (error) {
        dispatch({
            type: "trendCreateFail",
            payload: error.response.data.message,
        });
    }
};

// get All trends of a shop
export const getAllTrendsShop = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "getAllTrendsShopRequest",
      });
  
      const { data } = await axios.get(
        `${server}/trend/get-all-shop-trends/${id}`
      );
      dispatch({
        type: "getAllTrendsShopSuccess",
        payload: data.trends,
      });
    } catch (error) {
      dispatch({
        type: "getAllTrendsShopFailed",
        payload: error.response.data.message,
      });
    }
  };

  // delete trend of a shop
export const deleteTrend = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteTrendRequest",
    })

    const {data} = await axios.delete(`${server}/trend/delete-shop-trend/${id}`,{
      withCredentials: true,
    });

    dispatch({
      type: "deleteTrendSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteTrendFailed",
      payload: error.response.data.message,
    });
  }
}

// get all trends
export const getAllTrends = () => async (dispatch) => {
  try{
    dispatch({
      type: "getAllTrendsRequest",
    });

    const {data} = await axios.get(`${server}/trend/get-all-trends`);
    dispatch({
      type: "getAllTrendsSuccess",
      payload: data.trends,
    });
  } catch (error) {
    dispatch({
      type: "getAllTrendsFailed",
      payload: error.response.data.message,
    });
  }
}
