import React from "react";
import { Routes, Link, Route } from "react-router-dom";
import { Layout, Space, Typography } from "antd";

import {
	Navbar,
	HomePage,
	CryptoCurrencies,
	CryptoDetails,
	Exchanges,
	News,
} from "./components";
import "./App.css";

const App = () => {
	return (
		<div className="app">
			<div className="navbar">
				<Navbar />
			</div>
			<div className="main">
				<Layout>
					<div className="app-routes">
						<Routes>
							<Route path="/" element={<HomePage />} />							
							<Route
								path="/cryptocurrencies"
								element={<CryptoCurrencies />}
							/>
							<Route path="/news" element={<News />} />
							<Route
								path="/cryptocurrencies/:coinId"
								element={<CryptoDetails />}
							/>
						</Routes>
					</div>
				</Layout>
				<div className="footer">
					<Typography.Title
						level={5}
						style={{ color: "white", textAlign: "center" }}>
						Copyright © 2021
						<a href="https://github.com/tourist1642">Kesavan Vinod Kumar</a> <br />

						All Rights Reserved.
					</Typography.Title>
					<Space>
						<Link to="/">Home</Link>
						<Link to="/news">News</Link>
					</Space>
				</div>
			</div>
		</div>
	);
};

export default App;
