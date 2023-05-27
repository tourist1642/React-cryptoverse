import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import millify from "millify";
import { Row, Col, Card, Input } from "antd";
import { useGetCryptosQuery } from "../api/cryptoApi";

const CryptoCurrencies = ({ simplified }) => {
	const count = simplified ? 10 : 100;
	const { data: cryptoCurrencyData, isFetching } = useGetCryptosQuery(count);
	console.log(cryptoCurrencyData);
	const [cryptos, setCryptos] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const filteredData = cryptoCurrencyData?.data?.coins.filter((coin) =>
			coin.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setCryptos(filteredData);
	}, [cryptoCurrencyData, searchTerm]);
	if (isFetching) return "Loading...";

	return (
		<>
			{!simplified && (
				<div className="search-crypto">
					<Input
						placeholder="search cryptocurrency"
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			)}

			<Row gutter={[32, 32]} className="crypto-card-container">
				{cryptos?.map((eachCurrency) => (
					<Col
						key={eachCurrency.uuid}
						xs={24}
						sm={12}
						lg={6}
						className="crypto-card">
						<Link to={`/cryptocurrencies/${eachCurrency.uuid}`}>
							<Card
								title={`${eachCurrency.rank}. ${eachCurrency.name}`}
								extra={
									<img
										className="crypto-image"
										src={`${eachCurrency.iconUrl}`}
									/>
								}
								hoverable>
								<p>Price : {millify(eachCurrency.price)}</p>
								<p>
									Market Cap :{" "}
									{millify(eachCurrency.marketCap)}
								</p>
								<p>
									Daily Change :{" "}
									{millify(eachCurrency.change)}%
								</p>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
		</>
	);
};

export default CryptoCurrencies;
