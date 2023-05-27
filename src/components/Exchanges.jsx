import React from "react";
import { useGetCrytoExchangesQuery } from "../api/cryptoApi";

const Exchanges = () => {
	const { data, isFetching } = useGetCrytoExchangesQuery();
	console.log(data);

	if (isFetching) return "Loading...";
	return (
		<div>
			To get the exchanges data need to have a premium plan from Rapid
			API's Coinranking API premium plan
		</div>
	);
};

export default Exchanges;
