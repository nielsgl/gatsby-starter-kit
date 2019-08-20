import React, { PureComponent } from "react";
import { Helmet } from "react-helmet";
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
				{children}
			</div>
		);
	}
}
