import axios from "axios";
import { server } from "../../server";

// create quote
export const createQuote = (newForm) => async (dispatch) => {
    try {
        dispatch({
            type: "quoteCreateRequest",
        });

        const config = {headers: {"Content-Type":"multipart/form-data"}};

        const {data} = await axios.post(
            `${server}/quote/create-quote`,
            newForm,
            config
        );
        dispatch({
            type: "quoteCreateSuccess",
            payload: data.quotes,
        });
    } catch (error) {
        dispatch({
            type: "quoteCreateFail",
            payload: error.response.data.message,
        });
    }
};

