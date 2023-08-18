import axios from "axios";
import { server } from "../../server";

// create service
export const createService = (newForm) => async (dispatch) => {
    try {
        dispatch({
            type: "serviceCreateRequest",
        });

        const config = {headers: {"Content-Type":"multipart/form-data"}};

        const {data} = await axios.post(
            `${server}/service/create-service`,
            newForm,
            config
        );
        dispatch({
            type: "serviceCreateSuccess",
            payload: data.services,
        });
    } catch (error) {
        dispatch({
            type: "serviceCreateFail",
            payload: error.response.data.message,
        });
    }
};

// get All services of a shop
export const getAllServicesShop = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "getAllServicesShopRequest",
      });
  
      const { data } = await axios.get(
        `${server}/service/get-all-shop-services/${id}`
      );
      dispatch({
        type: "getAllServicesShopSuccess",
        payload: data.services,
      });
    } catch (error) {
      dispatch({
        type: "getAllServicesShopFailed",
        payload: error.response.data.message,
      });
    }
  };

    // delete service of a shop
export const deleteService = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteServiceRequest",
    })

    const {data} = await axios.delete(`${server}/service/delete-shop-service/${id}`,{
      withCredentials: true,
    });

    dispatch({
      type: "deleteServiceSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteServiceFailed",
      payload: error.response.data.message,
    });
  }
};

// get all services
export const getAllServices = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllServicesRequest",
    });

    const { data } = await axios.get(`${server}/service/get-all-services`);
    dispatch({
      type: "getAllServicesSuccess",
      payload: data.services,
    });
  } catch (error) {
    dispatch({
      type: "getAllServicesFailed",
      payload: error.response.data.message,
    });
  }
};