import { configureStore } from "@reduxjs/toolkit";
import deliverySlice from "./redux/deliverySlice";

import querySlice from "./redux/querySlice";
import resQuerySlice from "./redux/resQuerySlice";
import activeTabSlice from "./redux/activeTabSlice";
import activeNavTabSlice from "./redux/activeNavTabSlice";
import activeAddressTab from "./redux/activeAddressTab";
import activeMyAccountTabSlice from "./redux/activeMyAccountTabSlice";

const store = configureStore({
  reducer: {
    delivery: deliverySlice,
    query: querySlice,
    resQuery: resQuerySlice,
    activeTab: activeTabSlice,
    activeNavTab: activeNavTabSlice,
    activeAddressTab: activeAddressTab,
    activeMyAccountTab: activeMyAccountTabSlice,
  },
});

export default store;
