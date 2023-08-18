import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductPage,
  ArtisanPage,
  BestSellingPage,
  TrendsPage,
  FAQPage,
  ProductDetailsPage,
  ArtisanDetailsPage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
  OrderDetailsPage,
  TrackOrderPage,
  UserInbox,
} from "./routes/Routes.js";
import {
  ShopDashboardPage,
  ShopCreateProduct,
  ShopCreateService,
  ShopAllProducts,
  ShopAllServices,
  ShopCreateTrends,
  ShopAllTrends,
  ShopAllCoupons,
  ShopPreviewPage,
  ShopAllOrders,
  ShopOrderDetails,
  ShopAllRefunds,
  ShopSettingsPage,
  ShopWithDrawMoneyPage,
  ShopInboxPage,
} from "./routes/ShopRoutes";
import {
  AdminDashboardPage,
  AdminDashboardUsers,
  AdminDashboardSellers,
  AdminDashboardOrders,
  AdminDashboardQuotes,
  AdminDashboardProducts,
  AdminDashboardServices,
  AdminDashboardTrends,
  AdminDashboardWithdraw
} from "./routes/AdminRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadUser, loadSeller } from "./redux/actions/user";
import Store from "./redux/store";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import { ShopHomePage } from "./ShopRoutes.js";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import { getAllProducts } from "./redux/actions/product";
import { getAllServices } from "./redux/actions/service";
import { getAllTrends } from "./redux/actions/trend";
import axios from "axios";
import { server } from "./server";
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey(){
    const {data} = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllServices());
    Store.dispatch(getAllTrends());
    getStripeApiKey();
  }, []);

  console.log(stripeApiKey);

  return (
    <BrowserRouter>
      {
        stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Routes>
            <Route path="/payment" element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
            } />
            </Routes>
          </Elements>
        )
      }
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route
          path="/seller/activation/:activation_token"
          element={<SellerActivationPage />}
        />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/artisans" element={<ArtisanPage />} />
        <Route path="/artisan/:id" element={<ArtisanDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/trends" element={<TrendsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        
        <Route path="/order/success" element={<OrderSuccessPage />} />
        {/* <Route path="/quote/success" element={<QuoteSuccessPage />} /> */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <UserInbox />
            </ProtectedRoute>
          }
        />


        <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/user/quote/:id"
          element={
            <ProtectedRoute>
              <QuoteDetailsPage />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/user/track/order/:id"
          element={
            <ProtectedRoute>
              <TrackOrderPage />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/user/track/quote/:id"
          element={
            <ProtectedRoute>
              <TrackQuotePage />
            </ProtectedRoute>
          }
        /> */}

        <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
        {/* Shop Routes */}
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <SellerProtectedRoute>
              <ShopSettingsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-product"
          element={
            <SellerProtectedRoute>
              <ShopCreateProduct />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-service"
          element={
            <SellerProtectedRoute>
              <ShopCreateService />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard-orders"
          element={
            <SellerProtectedRoute>
              <ShopAllOrders />
            </SellerProtectedRoute>
          }
        />

        {/* <Route
          path="/dashboard-quotes"
          element={
            <SellerProtectedRoute>
              <ShopAllQuotes />
            </SellerProtectedRoute>
          }
        /> */}

        <Route
          path="/dashboard-refunds"
          element={
            <SellerProtectedRoute>
              <ShopAllRefunds />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/order/:id"
          element={
            <SellerProtectedRoute>
              <ShopOrderDetails />
            </SellerProtectedRoute>
          }
        />

        {/* <Route
          path="/quote/:id"
          element={
            <SellerProtectedRoute>
              <ShopQuoteDetails />
            </SellerProtectedRoute>
          }
        /> */}

        <Route
          path="/dashboard-products"
          element={
            <SellerProtectedRoute>
              <ShopAllProducts />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard-services"
          element={
            <SellerProtectedRoute>
              <ShopAllServices />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard-create-trend"
          element={
            <SellerProtectedRoute>
              <ShopCreateTrends />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard-coupons"
          element={
            <SellerProtectedRoute>
              <ShopAllCoupons />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard-trends"
          element={
            <SellerProtectedRoute>
              <ShopAllTrends />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard-withdraw-money"
          element={
            <SellerProtectedRoute>
              <ShopWithDrawMoneyPage />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard-messages"
          element={
            <SellerProtectedRoute>
              <ShopInboxPage />
            </SellerProtectedRoute>
          }
        />

         {/* Admin Routes */}
         <Route
          path="/admin-dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-users"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardUsers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-sellers"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardSellers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-orders"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardOrders />
            </ProtectedAdminRoute>
          }
        />
        
        <Route
          path="/admin-quotes"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardQuotes />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-products"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardProducts />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-services"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardServices />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-trends"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardTrends />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-withdraw-request"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardWithdraw />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
