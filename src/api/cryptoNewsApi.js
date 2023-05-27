import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
	"x-bingapis-sdk": "true",
	"x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
	"x-rapidapi-key": "b614a68707msha2b052a4a41205dp182147jsn486bd19dcb12",
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com";
const createRequest = (url) => ({ url: url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
	reducerPath: "cryptoNewsApi",
	baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
	endpoints: (builder) => ({
		getCryptoNews: builder.query({
			query: ({ newsCategory, count }) =>
				createRequest(
					`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
				),
		}),
	}),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
