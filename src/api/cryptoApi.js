import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoHeaders = {
	"x-rapidapi-host": "coinranking1.p.rapidapi.com",
	"x-rapidapi-key": "b614a68707msha2b052a4a41205dp182147jsn486bd19dcb12",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";
const createRequest = (url) => ({ url: url, headers: cryptoHeaders });

export const cryptoApi = createApi({
	reducerPath: "cryptoApi",
	baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
	endpoints: (builder) => ({
		getCryptos: builder.query({
			query: (count) => createRequest(`/coins?limit=${count}`),
		}),
		getCryptoDetails: builder.query({
			query: (coinId) => createRequest(`/coin/${coinId}`),
		}),
		getCryptoCoinHistory: builder.query({
			query: ({ coinId, timePeriod }) =>
				createRequest(
					`/coin/${coinId}/history?timePeriod=${timePeriod}`
				),
		}),
		getCrytoExchanges: builder.query({
			query: () => createRequest("/exchanges"),
		}),
	}),
});

export const {
	useGetCryptosQuery,
	useGetCryptoDetailsQuery,
	useGetCryptoCoinHistoryQuery,
	useGetCrytoExchangesQuery,
} = cryptoApi;
