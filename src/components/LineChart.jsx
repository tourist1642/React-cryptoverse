import React from "react";
import { Chart as ChartJS, LineElement,PointElement,CategoryScale,LinearScale } from "chart.js";

import { Line } from "react-chartjs-2";
import { Row, Col, Typography } from "antd";
import millify from "millify";
const { Title } = Typography;

ChartJS.register(LineElement,PointElement,CategoryScale,LinearScale)

const LineChart = ({ coinHistoryData, coinName, coinPrice }) => {
	console.log(coinHistoryData)
	const coinPriceHistory = coinHistoryData?.data?.history?.map(
		(priceHistory) => priceHistory?.price
	);
	
	const coinTimeStampHistory = coinHistoryData?.data?.history.map((timeHistory) =>
		new Date(timeHistory?.timestamp).toLocaleDateString()
	);

	// console.log('coinPriceHistory : ', coinPriceHistory);
	// console.log(coinTimeStampHistory);



	const data = {
// x-axis label values
labels: coinTimeStampHistory,
datasets: [
  {
	label: "# of Calories Lost",
	// y-axis data plotting values
	data: coinPriceHistory,
	fill: false,
	borderWidth:4,
	backgroundColor: "rgb(255, 99, 132)",
	borderColor:'green',
	responsive:true
  },
],
};



	return (
		<>
			<Row className="chart-header">
				<Title className="chart-title"> {coinName} Price Chart</Title>
				<Col className="price-container">
					<Title level={5} className="price-change">
						Price Change : {coinHistoryData?.data?.change}
					</Title>
					<Title level={5} className="current-price">
						Current {coinName} Price: $ {coinPrice}
					</Title>
				</Col>
			</Row>
			<Line data={data} />
		</>
	);
};

export default LineChart;
