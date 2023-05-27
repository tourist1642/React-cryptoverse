import React, { useState } from "react";
import millify from "millify";
import parse from "html-react-parser";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";

// Ant icons import
import {
	MoneyCollectOutlined,
	DollarCircleOutlined,
	FundOutlined,
	ExclamationCircleOutlined,
	StopOutlined,
	TrophyOutlined,
	CheckOutlined,
	NumberOutlined,
	ThunderboltOutlined,
	DoubleRightOutlined,
} from "@ant-design/icons";

//Ant design import
import { Row, Col, Select, Typography } from "antd";

// api call import
import {
	useGetCryptoDetailsQuery,
	useGetCryptoCoinHistoryQuery,
} from "../api/cryptoApi";

import LineChart from "./LineChart";


const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
	const { coinId } = useParams();
	const [timePeriod, setTimePeriod] = useState("7d");
	const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
	const { data: coinHistoryData } = useGetCryptoCoinHistoryQuery({
		coinId,
		timePeriod,
	});

	const cryptoDetailsData = data?.data?.coin;
	console.log(cryptoDetailsData)
	console.log('coinHistory: ', coinHistoryData)

	if (isFetching) return "Loading...";

	const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];

	const coinValueStatics = [
		{
			title: "Price to USD",
			value: `$ ${millify(cryptoDetailsData?.price)}`,
			icon: <DollarCircleOutlined />,
		},
		{
			title: "Rank",
			value: `${cryptoDetailsData?.rank}`,
			icon: <NumberOutlined />,
		},
		{
			title: "24h Volumn",
			icon: <ThunderboltOutlined />,
		},
		{
			title: "Market Cap",
			value: `$ ${millify(cryptoDetailsData?.marketCap)}`,
			icon: <DollarCircleOutlined />,
		},
		{
			title: "All Time High",
			value: `$ ${millify(cryptoDetailsData?.allTimeHigh?.price)}`,
			icon: <TrophyOutlined />,
		},
	];

	const coinsOtherValueStatistics = [
		{
			title: "Number of Markets",
			value: `${cryptoDetailsData?.numberOfMarkets}`,
			icon: <FundOutlined />,
		},
		{
			title: "Number of Exchanges",
			value: `${cryptoDetailsData?.numberOfExchanges}`,
			icon: <MoneyCollectOutlined />,
		},
		{
			title: "Approved Supply",
			value: `${
				cryptoDetailsData?.supply?.confirmed ? (
					<CheckOutlined />
				) : (
					<StopOutlined />
				)
			}`,
			icon: <ExclamationCircleOutlined />,
		},
		{
			title: "Total Supply",
			value: `${millify(cryptoDetailsData?.supply?.total)}`,
			icon: <ExclamationCircleOutlined />,
		},
		{
			title: "Circulating Supply",
			value: `${millify(cryptoDetailsData?.supply?.circulating)}`,
			icon: <ExclamationCircleOutlined />,
		},
	];

	return (
		<Col className="coin-detail-container">
			<Col className="coin-heading-container">
				<Title level={2}>
					{cryptoDetailsData.name} ({cryptoDetailsData.symbol}) Price
				</Title>
				<p>
					{cryptoDetailsData.name} live price in US Dollar (USD). View
					value statistics, market cap and supply.
				</p>
				
			</Col>
			<Select
				defaultValue={timePeriod}
				className="select-timeperiod"
				placeholder="Select time period"
				onChange={(value) => setTimePeriod(value)}>
				{time.map((date) => (
					<Option key={uuidv4()} value={date}>
						{date}
					</Option>
				))}
			</Select>
			{/* LineChart component */}
			<LineChart
				coinHistoryData={coinHistoryData}
				coinName={cryptoDetailsData.name}
				coinPrice={millify(cryptoDetailsData.price)}
			/>

			

			<Col className="stats-container">
				<Col className="coin-value-statistics">
					<Col className="coin-value-statistics-heading">
						<Title>{cryptoDetailsData.name} Value Statistics</Title>
						<p>
							An overview of showing the stats of{" "}
							<DoubleRightOutlined />
							{cryptoDetailsData.name}
						</p>
					</Col>
					{coinValueStatics.map(({ title, icon, value }) => (
						<Col className="coin-stats" key={uuidv4()}>
							<Col className="coin-stats-name">
								<Text>{icon}</Text>
								<Text>{title}</Text>
							</Col>
							<Text className="stats">{value}</Text>
						</Col>
					))}
				</Col>
				<Col className="other-stats-info">
					<Col className="coin-value-statistics-heading">
						<Title>Other Statistics</Title>
						<p>
							An overview of showing the stats of all crypto
							currencies.
						</p>
					</Col>
					{coinsOtherValueStatistics.map(({ title, icon, value }) => (
						<Col className="coin-stats" key={uuidv4()}>
							<Col className="coin-stats-name">
								<Text>{icon}</Text>
								<Text>{title}</Text>
							</Col>
							<Text className="stats">{value}</Text>
						</Col>
					))}
				</Col>
			</Col>
			<Col className="coin-desc-link">
				<Row className="coin-desc">
					<Title level={3} className="coin-details-heading">
						What is {cryptoDetailsData.name}
					</Title>
					{parse(cryptoDetailsData.description)}
				</Row>
				<Col className="coin-links">
					<Title level={3} className="coin-details-heading">
						{cryptoDetailsData.name} Links
					</Title>
					{cryptoDetailsData?.links.map(
						({ name: websiteName, type, url }) => (
							<Row className="coin-link" key={uuidv4()}>
								<Title level={5} className="link-name">
									{type}
								</Title>
								<a href={url} target="_blank" rel="noreferrer">
									{websiteName}
								</a>
							</Row>
						)
					)}
				</Col>
			</Col>
		</Col>
	);
};

export default CryptoDetails;
