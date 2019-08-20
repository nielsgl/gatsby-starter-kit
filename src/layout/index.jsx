import React, { PureComponent } from "react";
import { Helmet } from "react-helmet";
import { Link } from "gatsby";
import config from "../../data/SiteConfig";
import "./index.css";

export default class MainLayout extends PureComponent {
	render() {
		const { children } = this.props;
		return (
			<div>
				<Helmet>
					<html lang="en" />
					<meta name="description" content={config.siteDescription} />
				</Helmet>
				<Link to="/">Home</Link>&nbsp;
				<Link to="/about">About</Link>
				{children}
			</div>
		);
	}
}
