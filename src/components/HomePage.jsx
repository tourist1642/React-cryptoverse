import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Col, Row, Statistic, Typography } from "antd";
import { useGetCryptosQuery } from "../api/cryptoApi";
import { CryptoCurrencies, News } from "../components";

const { Title } = Typography;

const HomePage = () => {
	const { data, isFetching } = useGetCryptosQuery(10);
	const globalCryptoStats = data?.data?.stats;
	if (isFetching) return "Loading...";

	return (
		<>
			<Title level={2} className="heading">
				Get Crypto Statistics
			</Title>
			<Row>
				<Col span={12}>
					<Statistic
						title="Total Cryptocurrencies"
						value={globalCryptoStats.total}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title="Total Exchanges"
						value={millify(globalCryptoStats.totalExchanges)}
					/>
				</Col>

				<Col span={12}>
					<Statistic
						title="Total Market Cap"
						value={millify(globalCryptoStats.totalMarketCap)}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title="Total 24h Volumn"
						value={millify(globalCryptoStats.total24hVolume)}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title="Total Markets"
						value={millify(globalCryptoStats.totalMarkets)}
					/>
				</Col>
			</Row>
			<div className="home-heading-container">
				<Title level={2} className="home-title">
					Top 10 Crypto Currencies in the World
				</Title>
				<Title level={3} className="show-more">
					<Link to="/cryptocurrencies">Show More</Link>
				</Title>
			</div>
			<CryptoCurrencies simplified={true} />

			<div className="home-heading-container">
				<Title level={2} className="home-title">
					Latest News About Crypto World
				</Title>
				<Title level={3} className="show-more">
					<Link to="/news">Show More</Link>
				</Title>
			</div>
			<News simplified={true} />
		</>
	);
};

export default HomePage;
