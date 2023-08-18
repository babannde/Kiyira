import {configureStore, createReducer} from "@reduxjs/toolkit";
import {userReducer} from "./reducers/user";
import {sellerReducer} from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { serviceReducer } from "./reducers/service";
import { trendReducer } from "./reducers/trend";
import { cartReducer } from "./reducers/cart";
import { wishlistReducer } from "./reducers/wishlist";
import { orderReducer } from "./reducers/order";

const Store = configureStore({
    reducer: {
        user: userReducer,
        seller: sellerReducer,
        products: productReducer,
        services: serviceReducer,
        trends: trendReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        order: orderReducer,
    },
});

export default Store;