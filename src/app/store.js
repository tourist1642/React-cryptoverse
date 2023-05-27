import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../api/cryptoApi";
import { cryptoNewsApi } from "../api/cryptoNewsApi";

const store = configureStore({
	reducer: {
		[cryptoApi.reducerPath]: cryptoApi.reducer,
		[cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
	},
});

export default store;
