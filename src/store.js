import { configureStore } from "@reduxjs/toolkit";
import deliverySlice from "./pages/DeliveryPage/deliverySlice";
import cartSlice from "./pages/DeliveryPage/cartSlice";
import querySlice from "./pages/DeliveryPage/querySlice";
import resQuerySlice from "./pages/RestaurantsPage/resQuerySlice";
import activeTabSlice from "./pages/RestaurantsPage/activeTabSlice";
import activeNavTabSlice from "./pages/HomePage/activeNavTabSlice";
import activeAddressTab from "./pages/Checkout/activeAddressTab";
import activeMyAccountTabSlice from "./pages/MyAccount/activeMyAccountTabSlice";

const store = configureStore({
  reducer: {
    delivery: deliverySlice,
    cart: cartSlice,
    query: querySlice,
    resQuery: resQuerySlice,
    activeTab: activeTabSlice,
    activeNavTab: activeNavTabSlice,
    activeAddressTab: activeAddressTab,
    activeMyAccountTab: activeMyAccountTabSlice,
  },
});

export default store;
