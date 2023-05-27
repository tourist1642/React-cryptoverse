import React, { useState } from "react";
import { Typography, Select, Card, Row, Col, Avatar } from "antd";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { useGetCryptoNewsQuery } from "../api/cryptoNewsApi";
import { useGetCryptosQuery } from "../api/cryptoApi";

const { Title, Text } = Typography;
const { Option } = Select;
const demoImage =
	"https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
	const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
	const count = simplified ? 6 : 15;
	const { data: cryptoNewsData } = useGetCryptoNewsQuery({
		newsCategory: newsCategory,
		count,
	});
	const { data: cryptoCurrencyData } = useGetCryptosQuery(100);
	console.log(cryptoNewsData);
	return (
		<Row gutter={[24, 24]}>
			{/* For getting news of the selected crypto currency */}
			{!simplified && (
				<Col span={24}>
					<Select
						showSearch
						className="select-news"
						placeholder="Select a Crypto"
						optionFilterProp="children"
						onChange={(value) => setNewsCategory(value)}
						filterOption={(inputValue, option) =>
							option.children
								.toLowerCase()
								.indexOf(inputValue.toLowerCase()) >= 0
						}>
						<Option value="Crytocurrency">Crytocurrency</Option>
						{cryptoCurrencyData?.data?.coins.map((coin) => (
							<Option value={coin.name}>{coin.name}</Option>
						))}
					</Select>
				</Col>
			)}
			{/* getting the news of crypto world */}
			{cryptoNewsData?.value.map((news) => (
				<Col key={uuidv4()} xs={24} sm={12} lg={8}>
					<Card hoverable className="news-card">
						<a href={news.url} target="_blank" rel="noreferrer">
							<div className="news-image-container">
								<Title className="news-title" level={4}>
									{news.name}
								</Title>
								<img
									style={{
										maxWidth: "200px",
										maxHeight: "100px",
									}}
									src={
										news?.image?.thumbnail?.contentUrl ||
										demoImage
									}
									alt="crypto news publisher"
								/>
							</div>
							<p>
								{news.description.length > 100
									? `${news.description.substring(0, 100)}...`
									: news.description}
							</p>
							<div className="provider-container">
								<div>
									<Avatar
										src={
											news.provider[0]?.image?.thumbnail
												?.contentUrl || demoImage
										}
										alt=""
									/>
									<Text className="provider-name">
										{news.provider[0]?.name}
									</Text>
								</div>
								<Text>
									{moment(news.datePublished)
										.startOf("ss")
										.fromNow()}
								</Text>
							</div>
						</a>
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default News;
